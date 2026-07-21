"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, ShieldAlert, UtensilsCrossed, AlertTriangle } from "lucide-react";
import { apiClient } from "@/api/axios";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

interface RecommendationsPanelProps {
	gene: string;
}

interface FoodItem {
	food: string;
	amount: number;
	unit: string;
	rank: number;
}

interface PredItem {
	snp: string;
	disease: string;
	direction: string;
	confidence: number;
}

export function RecommendationsPanel({ gene }: RecommendationsPanelProps) {
	const { locale } = useI18n();
	const [foods, setFoods] = useState<FoodItem[]>([]);
	const [associations, setAssociations] = useState<PredItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!gene) return;
		setLoading(true);

		Promise.allSettled([
			apiClient.get(`/enrich/compounds/${encodeURIComponent(gene)}`),
			apiClient.get(`/enrich/food-detail/${encodeURIComponent(gene)}`),
		]).then(([foodsResult, detailResult]) => {
			if (foodsResult.status === "fulfilled") {
				setFoods(foodsResult.value.data.foods ?? []);
			}
			if (detailResult.status === "fulfilled") {
				const genes = detailResult.value.data.genes ?? [];
				const allAssoc: PredItem[] = [];
				for (const g of genes) {
					for (const a of g.associations ?? []) {
						allAssoc.push(a);
					}
				}
				setAssociations(allAssoc);
			}
			setLoading(false);
		});
	}, [gene]);

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Skeleton className="h-48" />
				<Skeleton className="h-48" />
				<Skeleton className="h-48" />
			</div>
		);
	}

	const protective = associations.filter(a => a.direction === "beneficial");
	const risk = associations.filter(a => a.direction === "harmful");

	const recommendedFoods = foods.slice(0, 8);
	const protectiveDiseases = [...new Set(protective.map(a => a.disease))].slice(0, 6);
	const riskDiseases = [...new Set(risk.map(a => a.disease))].slice(0, 6);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{/* Recommended Foods */}
			<Card className="border-green-200 bg-green-50/30">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm flex items-center gap-2 text-green-800">
						<UtensilsCrossed className="h-4 w-4" />
						{locale === "pt" ? "Alimentos Relacionados" : "Related Foods"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{recommendedFoods.length > 0 ? (
						<ul className="space-y-1.5">
							{recommendedFoods.map((f, i) => (
								<li key={i}>
									<Link href={`/food/${encodeURIComponent(f.food)}`} className="text-sm text-green-800 hover:underline flex items-center gap-1">
										<span className="text-green-500">•</span>
										{f.food}
										<span className="text-xs text-green-600/60 ml-auto">{f.amount} {f.unit}</span>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="text-xs text-muted-foreground">{locale === "pt" ? "Sem dados" : "No data"}</p>
					)}
				</CardContent>
			</Card>

			{/* Protective effects */}
			<Card className="border-blue-200 bg-blue-50/30">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm flex items-center gap-2 text-blue-800">
						<ShieldCheck className="h-4 w-4" />
						{locale === "pt" ? "Efeitos Protetores" : "Protective Effects"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{protectiveDiseases.length > 0 ? (
						<ul className="space-y-1.5">
							{protectiveDiseases.map((d, i) => (
								<li key={i}>
									<Link href={`/disease/${encodeURIComponent(d)}`} className="text-sm text-blue-800 hover:underline flex items-center gap-1">
										<ShieldCheck className="h-3 w-3 text-green-500 shrink-0" />
										{locale === "pt" ? "Protege contra" : "Protects against"} {d}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="text-xs text-muted-foreground">{locale === "pt" ? "Nenhum efeito protetor identificado" : "No protective effects identified"}</p>
					)}
				</CardContent>
			</Card>

			{/* Risk factors */}
			<Card className="border-red-200 bg-red-50/30">
				<CardHeader className="pb-2">
					<CardTitle className="text-sm flex items-center gap-2 text-red-800">
						<AlertTriangle className="h-4 w-4" />
						{locale === "pt" ? "Fatores de Risco" : "Risk Factors"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{riskDiseases.length > 0 ? (
						<ul className="space-y-1.5">
							{riskDiseases.map((d, i) => (
								<li key={i}>
									<Link href={`/disease/${encodeURIComponent(d)}`} className="text-sm text-red-800 hover:underline flex items-center gap-1">
										<ShieldAlert className="h-3 w-3 text-red-500 shrink-0" />
										{locale === "pt" ? "Risco aumentado de" : "Increased risk of"} {d}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="text-xs text-muted-foreground">{locale === "pt" ? "Nenhum fator de risco identificado" : "No risk factors identified"}</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
