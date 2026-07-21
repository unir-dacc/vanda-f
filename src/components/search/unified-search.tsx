"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dna, UtensilsCrossed, FlaskConical, Search, ArrowRight, HeartPulse } from "lucide-react";

function detectSearchType(query: string): "snp" | "gene" | "food" | "disease" {
	const q = query.trim();
	if (/^rs\d+$/i.test(q)) return "snp";
	if (/^[A-Z][A-Z0-9]{1,9}$/.test(q)) return "gene";
	return "food";
}

interface UnifiedSearchProps {
	size?: "default" | "large";
	className?: string;
	autoFocus?: boolean;
}

export function UnifiedSearch({ size = "default", className = "", autoFocus = false }: UnifiedSearchProps) {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const navigate = useCallback((type: string, value: string) => {
		if (!value.trim()) return;
		const encoded = encodeURIComponent(value.trim());
		if (type === "snp") router.push(`/snp/${encoded}`);
		else if (type === "gene") router.push(`/gene/${encoded}`);
		else if (type === "disease") router.push(`/disease/${encoded}`);
		else router.push(`/food/${encoded}`);
	}, [router]);

	const handleSelect = useCallback((value: string) => {
		const [type, ...rest] = value.split(":");
		navigate(type, rest.join(":"));
	}, [navigate]);

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key === "Enter" && query.trim()) {
			const type = detectSearchType(query.trim());
			navigate(type, query.trim());
		}
	}, [query, navigate]);

	const isLarge = size === "large";
	const q = query.trim();
	const detected = q ? detectSearchType(q) : null;

	return (
		<Command className={`border rounded-xl bg-white shadow-md ${isLarge ? "max-w-2xl" : "max-w-lg"} ${className}`}>
			<CommandInput
				placeholder="Search SNPs, genes, or foods..."
				value={query}
				onValueChange={setQuery}
				onKeyDown={handleKeyDown}
				autoFocus={autoFocus}
				className={isLarge ? "h-14 text-lg" : "h-10"}
			/>
			<CommandList>
				{q.length >= 2 && (
					<>
						<CommandEmpty>
							<div className="flex items-center gap-2 text-muted-foreground py-2">
								<Search className="h-4 w-4" />
								Press Enter to search for &quot;{q}&quot;
							</div>
						</CommandEmpty>

						{/^rs\d*/i.test(q) && (
							<CommandGroup heading="SNP">
								<CommandItem value={`snp:${q.toLowerCase()}`} onSelect={handleSelect}>
									<Dna className="mr-2 h-4 w-4 text-blue-600" />
									<span className="font-mono">{q.toLowerCase()}</span>
									<span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
										View SNP <ArrowRight className="h-3 w-3" />
									</span>
								</CommandItem>
							</CommandGroup>
						)}

						{detected === "gene" && (
							<CommandGroup heading="Gene">
								<CommandItem value={`gene:${q.toUpperCase()}`} onSelect={handleSelect}>
									<FlaskConical className="mr-2 h-4 w-4 text-purple-600" />
									<span className="font-semibold">{q.toUpperCase()}</span>
									<span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
										View gene <ArrowRight className="h-3 w-3" />
									</span>
								</CommandItem>
							</CommandGroup>
						)}

						<CommandGroup heading="Food / Nutrient">
							<CommandItem value={`food:${q}`} onSelect={handleSelect}>
								<UtensilsCrossed className="mr-2 h-4 w-4 text-green-600" />
								<span>{q}</span>
								<span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
									Analyze food <ArrowRight className="h-3 w-3" />
								</span>
							</CommandItem>
						</CommandGroup>

						{detected !== "snp" && (
							<CommandGroup heading="SNP (search as rsID)">
								<CommandItem value={`snp:${q}`} onSelect={handleSelect}>
									<Dna className="mr-2 h-4 w-4 text-blue-400" />
									<span className="text-muted-foreground">Search as SNP: {q}</span>
								</CommandItem>
							</CommandGroup>
						)}

						{detected !== "gene" && q.length <= 10 && (
							<CommandGroup heading="Gene (search as gene symbol)">
								<CommandItem value={`gene:${q.toUpperCase()}`} onSelect={handleSelect}>
									<FlaskConical className="mr-2 h-4 w-4 text-purple-400" />
									<span className="text-muted-foreground">Search as gene: {q.toUpperCase()}</span>
								</CommandItem>
							</CommandGroup>
						)}

						<CommandGroup heading="Disease">
							<CommandItem value={`disease:${q}`} onSelect={handleSelect}>
								<HeartPulse className="mr-2 h-4 w-4 text-red-400" />
								<span className="text-muted-foreground">Search as disease: {q}</span>
							</CommandItem>
						</CommandGroup>
					</>
				)}
			</CommandList>
		</Command>
	);
}
