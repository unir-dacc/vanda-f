"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/api/axios";
import { api } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { EmptyState } from "@/components/empty-state";
import { DataTable, type AssociationRow } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed, Download, SearchX, Info, Dna, FlaskConical } from "lucide-react";

interface GeneAssociation {
	snp: string; disease: string; direction: string; confidence: number;
	source: string; odds_ratio: number | null; pmid: number | null;
	title: string | null; pred_id: number;
}

interface GeneBlock {
	gene: string;
	associations: GeneAssociation[];
	foods_with_gene: { food: string }[];
}

interface FoodData {
	food: string; total_genes_in_food: number; genes_with_associations: number;
	totals: { total_snps: number; total_genes: number };
	counts: Record<string, number>; genes: GeneBlock[];
}

export default function FoodPage() {
	const params = useParams();
	const foodName = decodeURIComponent(params.name as string);
	const { locale } = useI18n();

	const [data, setData] = useState<FoodData | null>(null);
	const [description, setDescription] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!foodName) return;
		setLoading(true); setError(false);
		Promise.allSettled([
			apiClient.get(`/food/${encodeURIComponent(foodName)}`),
			api.foodInfo(foodName),
		]).then(([dataResult, infoResult]) => {
			if (dataResult.status === "fulfilled") setData(dataResult.value.data);
			else setError(true);
			if (infoResult.status === "fulfilled") setDescription(infoResult.value.description);
			setLoading(false);
		});
	}, [foodName]);

	if (loading) {
		return (<><AppHeader /><main className="container mx-auto px-4 py-8 space-y-4">
			<Skeleton className="h-8 w-64" /><Skeleton className="h-16 w-full" />
			<Skeleton className="h-48 w-full" />
		</main></>);
	}

	if (error || !data) {
		return (<><AppHeader /><main className="container mx-auto px-4 py-16">
			<EmptyState icon={SearchX}
				title={locale === "pt" ? "Sem dados" : "No data available"}
				description={`${locale === "pt" ? "Nenhum dado encontrado para" : "No data found for"} "${foodName}".`}
				linkText="← Back" linkHref="/" />
		</main><Footer /></>);
	}

	const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

	// Flatten gene blocks into table rows
	const allRows: AssociationRow[] = data.genes.flatMap(g =>
		g.associations.map(a => ({
			disease: a.disease,
			direction: a.direction,
			gene_info: g.gene,
			snp: a.snp,
			confidence: a.confidence,
			source: a.source,
			odds_ratio: a.odds_ratio,
			pmid: a.pmid,
			title: a.title,
			pred_id: a.pred_id,
		}))
	);

	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-8 max-w-6xl">
				{/* Header */}
				<div className="space-y-3 mb-6">
					<div className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
							<UtensilsCrossed className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<h1 className="text-3xl font-bold capitalize">{foodName}</h1>
							<p className="text-sm text-muted-foreground">
								{data.genes_with_associations} {locale === "pt" ? "genes com associações" : "genes with associations"}
								{" · "}{allRows.length} {locale === "pt" ? "associações" : "associations"}
							</p>
						</div>
						<a href={`${API_URL}/download/food/${encodeURIComponent(foodName)}`}
							className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-lg hover:bg-muted transition-colors">
							<Download className="h-4 w-4" /> CSV
						</a>
					</div>

					{description && (
						<Card className="bg-green-50/50 border-green-100">
							<CardContent className="p-4 flex gap-3">
								<Info className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
								<p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Disclaimer */}
				<Card className="bg-amber-50/50 border-amber-200 mb-6">
					<CardContent className="p-4 flex gap-3">
						<div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
							<span className="text-amber-700 text-lg">⚠</span>
						</div>
						<div>
							<p className="text-sm font-medium text-amber-900 mb-1">
								{locale === "pt"
									? "As associações abaixo são entre GENES e doenças, não entre o alimento e doenças."
									: "The associations below are between GENES and diseases, not between this food and diseases."}
							</p>
							<p className="text-xs text-amber-800/70">
								{locale === "pt"
									? `${foodName} contém compostos metabolizados por ${data.total_genes_in_food} genes. Isso NÃO significa que consumir ${foodName} cause ou previna essas condições.`
									: `${foodName} contains compounds metabolized by ${data.total_genes_in_food} genes. This does NOT mean consuming ${foodName} causes or prevents these conditions.`}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Table */}
				{allRows.length > 0 ? (
					<DataTable data={allRows} />
				) : (
					<EmptyState icon={Dna}
						title={locale === "pt" ? "Sem associações" : "No associations"}
						description={locale === "pt"
							? "Nenhuma associação genética encontrada para este alimento."
							: "No genetic associations found for this food."} />
				)}
			</main>
			<Footer />
		</>
	);
}
