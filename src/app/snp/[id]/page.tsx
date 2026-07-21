"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { SNPCompleteResponse, SNPPageResponse } from "@/types/api";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { EvidenceCard } from "@/components/evidence/evidence-card";
import { ClinVarBadge } from "@/components/enrichment/clinvar-badge";
import { PopulationFrequencyChart } from "@/components/enrichment/population-chart";
import { FoodCompoundsList } from "@/components/enrichment/food-compounds";
import { ExternalLink, Dna, FlaskConical, Activity, UtensilsCrossed, BookOpen } from "lucide-react";
import Link from "next/link";

export default function SNPPage() {
	const params = useParams();
	const rsid = params.id as string;

	const [enrichment, setEnrichment] = useState<SNPCompleteResponse | null>(null);
	const [articles, setArticles] = useState<SNPPageResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!rsid) return;
		setLoading(true);
		setError(null);

		Promise.allSettled([
			api.snpComplete(rsid),
			api.snpPage(rsid),
		]).then(([enrichResult, articlesResult]) => {
			if (enrichResult.status === "fulfilled") setEnrichment(enrichResult.value);
			if (articlesResult.status === "fulfilled") setArticles(articlesResult.value);
			if (enrichResult.status === "rejected" && articlesResult.status === "rejected") {
				setError("SNP not found or API unavailable");
			}
			setLoading(false);
		});
	}, [rsid]);

	if (loading) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-8 space-y-4">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-4 w-96" />
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
						<Skeleton className="h-48" />
						<Skeleton className="h-48" />
						<Skeleton className="h-48" />
					</div>
				</main>
			</>
		);
	}

	if (error && !enrichment && !articles) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-16 text-center">
					<Dna className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
					<h1 className="text-2xl font-bold mb-2">SNP Not Found</h1>
					<p className="text-muted-foreground mb-4">{rsid} was not found in our database.</p>
					<a
						href={`https://www.ncbi.nlm.nih.gov/snp/${rsid}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 hover:underline inline-flex items-center gap-1"
					>
						Try searching on dbSNP <ExternalLink className="h-4 w-4" />
					</a>
				</main>
			</>
		);
	}

	const predictions = enrichment?.predictions ?? [];
	const gene = enrichment?.gene ?? articles?.genes?.[0] ?? null;
	const topicEntries = articles ? Object.entries(articles.topics) : [];

	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-8 max-w-5xl">
				{/* Header */}
				<div className="space-y-3 mb-6">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="text-3xl font-bold font-mono">{rsid}</h1>
						{gene && (
							<Link href={`/gene/${gene}`}>
								<Badge variant="outline" className="text-sm gap-1 hover:bg-muted">
									<FlaskConical className="h-3 w-3" />
									{gene}
								</Badge>
							</Link>
						)}
						{enrichment?.clinvar && <ClinVarBadge data={enrichment.clinvar} />}
					</div>

					<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
						<span>{predictions.length} predictions</span>
						<span>{topicEntries.length} disease topics</span>
						<a
							href={`https://www.ncbi.nlm.nih.gov/snp/${rsid}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline inline-flex items-center gap-1"
						>
							dbSNP <ExternalLink className="h-3 w-3" />
						</a>
					</div>
				</div>

				{/* Tabs */}
				<Tabs defaultValue="predictions" className="space-y-4">
					<TabsList>
						<TabsTrigger value="predictions" className="gap-1">
							<Activity className="h-4 w-4" /> Predictions
						</TabsTrigger>
						<TabsTrigger value="population" className="gap-1">
							<Dna className="h-4 w-4" /> Population
						</TabsTrigger>
						<TabsTrigger value="foods" className="gap-1">
							<UtensilsCrossed className="h-4 w-4" /> Foods
						</TabsTrigger>
						{topicEntries.length > 0 && (
							<TabsTrigger value="articles" className="gap-1">
								<BookOpen className="h-4 w-4" /> Articles
							</TabsTrigger>
						)}
					</TabsList>

					{/* Predictions Tab */}
					<TabsContent value="predictions">
						{predictions.length > 0 ? (
							<div className="grid gap-3">
								{predictions.map((pred, i) => (
									<EvidenceCard key={i} prediction={pred} snp={rsid} />
								))}
							</div>
						) : (
							<Card>
								<CardContent className="py-8 text-center text-muted-foreground">
									No predictions found for this SNP.
								</CardContent>
							</Card>
						)}
					</TabsContent>

					{/* Population Tab */}
					<TabsContent value="population">
						{enrichment?.frequency ? (
							<PopulationFrequencyChart data={enrichment.frequency} />
						) : (
							<Card>
								<CardContent className="py-8 text-center text-muted-foreground">
									Population frequency data not available for this SNP.
								</CardContent>
							</Card>
						)}
					</TabsContent>

					{/* Foods Tab */}
					<TabsContent value="foods">
						{gene && enrichment?.foods && enrichment.foods.length > 0 ? (
							<Card>
								<CardContent className="pt-6">
									<FoodCompoundsList gene={gene} foods={enrichment.foods} />
								</CardContent>
							</Card>
						) : (
							<Card>
								<CardContent className="py-8 text-center text-muted-foreground">
									No food associations found.
								</CardContent>
							</Card>
						)}
					</TabsContent>

					{/* Articles Tab */}
					{topicEntries.length > 0 && (
						<TabsContent value="articles">
							<div className="space-y-4">
								{topicEntries.map(([topic, arts]) => (
									<Card key={topic}>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm font-medium">{topic}</CardTitle>
										</CardHeader>
										<CardContent className="space-y-3">
											{arts.map((art) => (
												<div key={art.pmid} className="border-l-2 border-muted pl-4 py-1">
													<a
														href={`https://pubmed.ncbi.nlm.nih.gov/${art.pmid}`}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm font-medium text-blue-700 hover:underline"
													>
														{art.title}
													</a>
													{art.abstract && (
														<p className="text-xs text-muted-foreground mt-1 line-clamp-2">
															{art.abstract}
														</p>
													)}
													<span className="text-xs text-muted-foreground">PMID: {art.pmid}</span>
												</div>
											))}
										</CardContent>
									</Card>
								))}
							</div>
						</TabsContent>
					)}
				</Tabs>
			</main>
			<Footer />
		</>
	);
}
