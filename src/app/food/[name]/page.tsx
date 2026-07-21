"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/api/axios";
import { api } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { EmptyState } from "@/components/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SourceBadge } from "@/components/evidence/source-badge";
import { DirectionBadge } from "@/components/evidence/direction-badge";
import { OddsRatioDisplay } from "@/components/evidence/odds-ratio-display";
import { UtensilsCrossed, FlaskConical, ExternalLink, Download, SearchX, Info, Dna } from "lucide-react";
import Link from "next/link";

interface GeneAssociation {
	snp: string; disease: string; direction: string; confidence: number;
	source: string; odds_ratio: number | null; pmid: number | null;
	title: string | null; pred_id: number;
}

interface GeneFood { food: string; amount: number; unit: string; rank: number; }

interface GeneBlock {
	gene: string;
	associations: GeneAssociation[];
	foods_with_gene: GeneFood[];
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-48" />)}</div>
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
				<Card className="bg-amber-50/50 border-amber-200 mb-8">
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

				{/* Gene cards grid */}
				{data.genes.length > 0 ? (
					<>
						<h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
							<FlaskConical className="h-5 w-5 text-purple-600" />
							{locale === "pt" ? "Genes e suas Associações na Literatura" : "Genes and their Literature Associations"}
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{data.genes.map((geneBlock) => (
								<Card key={geneBlock.gene} className="hover:shadow-md transition-shadow">
									<CardContent className="p-5 space-y-3">
										{/* Gene header */}
										<div className="flex items-center justify-between">
											<Link href={`/gene/${geneBlock.gene}`}>
												<Badge variant="outline" className="font-mono text-sm hover:bg-muted px-3 py-1.5">
													<FlaskConical className="h-3.5 w-3.5 mr-1.5" />{geneBlock.gene}
												</Badge>
											</Link>
											<span className="text-xs text-muted-foreground">
												{geneBlock.associations.length} {locale === "pt" ? "associações" : "associations"}
											</span>
										</div>

										{/* Associations */}
										<div className="space-y-2">
											{geneBlock.associations.map((assoc, i) => (
												<div key={i} className="rounded-lg bg-muted/30 p-3 space-y-1.5">
													{/* Article */}
													{assoc.pmid ? (
														<a href={`https://pubmed.ncbi.nlm.nih.gov/${assoc.pmid}`} target="_blank" rel="noopener noreferrer"
															className="text-xs text-blue-700 hover:underline flex items-start gap-1 leading-snug">
															<ExternalLink className="h-3 w-3 shrink-0 mt-0.5" />
															<span className="line-clamp-2">{assoc.title || `PMID: ${assoc.pmid}`}</span>
														</a>
													) : (
														<span className="text-xs text-muted-foreground italic">
															{locale === "pt" ? "Artigo não disponível" : "Article not available"}
														</span>
													)}

													{/* Finding */}
													<div className="flex flex-wrap items-center gap-1.5">
														<Link href={`/snp/${assoc.snp.toLowerCase()}`} className="font-mono text-xs text-blue-700 hover:underline">
															{assoc.snp.toLowerCase()}
														</Link>
														<span className="text-muted-foreground text-xs">→</span>
														<Link href={`/disease/${encodeURIComponent(assoc.disease)}`} className="text-sm font-medium hover:underline">
															{assoc.disease}
														</Link>
														<DirectionBadge direction={assoc.direction} />
													</div>

													{/* Source */}
													<div className="flex flex-wrap items-center gap-1.5">
														<SourceBadge source={assoc.source} />
														{assoc.odds_ratio && <OddsRatioDisplay value={assoc.odds_ratio} />}
													</div>
												</div>
											))}
										</div>

										{/* Other foods */}
										{geneBlock.foods_with_gene.length > 0 && (
											<div className="pt-2 border-t">
												<p className="text-[11px] text-muted-foreground mb-1.5">
													{locale === "pt"
														? "Este gene está presente em centenas de alimentos:"
														: "This gene is present in hundreds of foods:"}
												</p>
												<div className="flex flex-wrap gap-1">
													{geneBlock.foods_with_gene.slice(0, 5).map((f, i) => (
														<Link key={i} href={`/food/${encodeURIComponent(f.food)}`}>
															<Badge variant="outline" className="text-[10px] hover:bg-muted cursor-pointer py-0">
																{f.food}
															</Badge>
														</Link>
													))}
													{geneBlock.foods_with_gene.length > 5 && (
														<Badge variant="outline" className="text-[10px] text-muted-foreground py-0">
															+{geneBlock.foods_with_gene.length - 5}
														</Badge>
													)}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					</>
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
