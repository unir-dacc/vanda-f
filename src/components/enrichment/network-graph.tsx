"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { useRouter } from "next/navigation";

interface NetworkNode {
	id: string;
	label: string;
	type: "gene" | "disease" | "food" | "snp";
	val: number;
}

interface NetworkLink {
	source: string;
	target: string;
	direction?: string;
}

interface NetworkGraphProps {
	nodes: NetworkNode[];
	links: NetworkLink[];
	title?: string;
	height?: number;
}

const TYPE_COLORS: Record<string, string> = {
	gene: "#8b5cf6",
	disease: "#ef4444",
	food: "#16a34a",
	snp: "#3b82f6",
};

export function NetworkGraph({ nodes, links, title, height = 400 }: NetworkGraphProps) {
	const { locale } = useI18n();
	const router = useRouter();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animRef = useRef<number>(0);

	// Simple force simulation
	const simulation = useMemo(() => {
		const nodeMap = new Map<string, { x: number; y: number; vx: number; vy: number; node: NetworkNode }>();

		nodes.forEach((n, i) => {
			const angle = (i / nodes.length) * Math.PI * 2;
			const r = 120 + Math.random() * 40;
			nodeMap.set(n.id, {
				x: Math.cos(angle) * r,
				y: Math.sin(angle) * r,
				vx: 0,
				vy: 0,
				node: n,
			});
		});

		return { nodeMap, links };
	}, [nodes, links]);

	const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const cx = canvas.width / 2;
		const cy = canvas.height / 2;
		const mx = e.clientX - rect.left - cx;
		const my = e.clientY - rect.top - cy;

		for (const [, pos] of simulation.nodeMap) {
			const dx = pos.x - mx;
			const dy = pos.y - my;
			const r = pos.node.val * 3 + 8;
			if (dx * dx + dy * dy < r * r) {
				const n = pos.node;
				if (n.type === "gene") router.push(`/gene/${n.label}`);
				else if (n.type === "disease") router.push(`/disease/${encodeURIComponent(n.label)}`);
				else if (n.type === "food") router.push(`/food/${encodeURIComponent(n.label)}`);
				else if (n.type === "snp") router.push(`/snp/${n.label.toLowerCase()}`);
				break;
			}
		}
	}, [simulation, router]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d")!;

		const w = canvas.width;
		const h = canvas.height;
		const cx = w / 2;
		const cy = h / 2;

		let steps = 0;
		const maxSteps = 200;

		function step() {
			if (steps >= maxSteps) return;
			steps++;

			// Repulsion
			const entries = [...simulation.nodeMap.values()];
			for (let i = 0; i < entries.length; i++) {
				for (let j = i + 1; j < entries.length; j++) {
					const a = entries[i], b = entries[j];
					let dx = a.x - b.x, dy = a.y - b.y;
					const dist = Math.sqrt(dx * dx + dy * dy) || 1;
					const force = 800 / (dist * dist);
					dx = (dx / dist) * force;
					dy = (dy / dist) * force;
					a.vx += dx; a.vy += dy;
					b.vx -= dx; b.vy -= dy;
				}
			}

			// Attraction (links)
			for (const link of simulation.links) {
				const a = simulation.nodeMap.get(link.source as string);
				const b = simulation.nodeMap.get(link.target as string);
				if (!a || !b) continue;
				let dx = b.x - a.x, dy = b.y - a.y;
				const dist = Math.sqrt(dx * dx + dy * dy) || 1;
				const force = (dist - 80) * 0.01;
				dx = (dx / dist) * force;
				dy = (dy / dist) * force;
				a.vx += dx; a.vy += dy;
				b.vx -= dx; b.vy -= dy;
			}

			// Center gravity
			for (const p of entries) {
				p.vx -= p.x * 0.005;
				p.vy -= p.y * 0.005;
				p.x += p.vx * 0.3;
				p.y += p.vy * 0.3;
				p.vx *= 0.9;
				p.vy *= 0.9;
			}

			// Draw
			ctx.clearRect(0, 0, w, h);

			// Links
			ctx.strokeStyle = "#d1d5db";
			ctx.lineWidth = 1;
			for (const link of simulation.links) {
				const a = simulation.nodeMap.get(link.source as string);
				const b = simulation.nodeMap.get(link.target as string);
				if (!a || !b) continue;
				ctx.beginPath();
				ctx.moveTo(cx + a.x, cy + a.y);
				ctx.lineTo(cx + b.x, cy + b.y);
				ctx.stroke();
			}

			// Nodes
			for (const p of entries) {
				const r = p.node.val * 2.5 + 6;
				const color = TYPE_COLORS[p.node.type] ?? "#6b7280";

				ctx.beginPath();
				ctx.arc(cx + p.x, cy + p.y, r, 0, Math.PI * 2);
				ctx.fillStyle = color + "20";
				ctx.fill();
				ctx.strokeStyle = color;
				ctx.lineWidth = 2;
				ctx.stroke();

				ctx.fillStyle = "#1f2937";
				ctx.font = `${Math.max(9, Math.min(12, r))}px sans-serif`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";

				const label = p.node.label.length > 14 ? p.node.label.slice(0, 12) + "…" : p.node.label;
				ctx.fillText(label, cx + p.x, cy + p.y + r + 10);
			}

			animRef.current = requestAnimationFrame(step);
		}

		step();
		return () => cancelAnimationFrame(animRef.current);
	}, [simulation]);

	// Legend
	const legendItems = [
		{ type: "gene", label: locale === "pt" ? "Gene" : "Gene" },
		{ type: "disease", label: locale === "pt" ? "Doença" : "Disease" },
		{ type: "food", label: locale === "pt" ? "Alimento" : "Food" },
		{ type: "snp", label: "SNP" },
	];

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-sm">{title ?? (locale === "pt" ? "Rede de Associações" : "Association Network")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4 mb-2">
					{legendItems.map(l => (
						<div key={l.type} className="flex items-center gap-1 text-xs text-muted-foreground">
							<div className="h-3 w-3 rounded-full" style={{ backgroundColor: TYPE_COLORS[l.type] }} />
							{l.label}
						</div>
					))}
				</div>
				<canvas
					ref={canvasRef}
					width={800}
					height={height}
					onClick={handleClick}
					className="w-full border rounded-lg cursor-pointer"
					style={{ height }}
				/>
				<p className="text-[10px] text-muted-foreground mt-1 text-center">
					{locale === "pt" ? "Clique nos nós para navegar" : "Click nodes to navigate"}
				</p>
			</CardContent>
		</Card>
	);
}
