"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { GenePageResponse, GeneCompoundsResponse } from "@/types/api";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FoodCompoundsList } from "@/components/enrichment/food-compounds";
import { FlaskConical, Dna, UtensilsCrossed, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function GenePage() {
	const params = useParams();
	const geneName = (params.name as string).toUpperCase();

	const [geneData, setGeneData] = useState<GenePageResponse | null>(null);
	const [compounds, setCompounds] = useState<GeneCompoundsResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!geneName) return;
		setLoading(true);

		Promise.allSettled([
			api.genePage(geneName),
			api.geneCompounds(geneName),
		]).then(([geneResult, compoundsResult]) => {
			if (geneResult.status === "fulfilled") setGeneData(geneResult.value);
			if (compoundsResult.status === "fulfilled") setCompounds(compoundsResult.value);
			setLoading(false);
		});
	}, [geneName]);

	if (loading) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-8 space-y-4">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-24 w-full" />
					<Skeleton className="h-48 w-full" />
				</main>
			</>
		);
	}

	const topicEntries = geneData ? Object.entries(geneData.data) : [];
	const snpTopicEntries = geneData ? Object.entries(geneData.snp_topics) : [];

	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-8 max-w-5xl">
				{/* Header */}
				<div className="space-y-3 mb-6">
					<div className="flex items-center gap-3">
						<FlaskConical className="h-8 w-8 text-purple-600" />
						<h1 className="text-3xl font-bold">{geneName}</h1>
					</div>

					{geneData?.description && (
						<p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
							{geneData.description.slice(0, 400)}
							{geneData.description.length > 400 && "..."}
						</p>
					)}

					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<span>{snpTopicEntries.length} SNPs</span>
						<span>{topicEntries.length} disease topics</span>
						<a
							href={`https://www.genecards.org/cgi-bin/carddisp.pl?gene=${geneName}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline inline-flex items-center gap-1"
						>
							GeneCards <ExternalLink className="h-3 w-3" />
						</a>
					</div>
				</div>

				<Tabs defaultValue="snps" className="space-y-4">
					<TabsList>
						<TabsTrigger value="snps" className="gap-1">
							<Dna className="h-4 w-4" /> SNPs
						</TabsTrigger>
						<TabsTrigger value="articles" className="gap-1">
							<BookOpen className="h-4 w-4" /> Articles
						</TabsTrigger>
						<TabsTrigger value="foods" className="gap-1">
							<UtensilsCrossed className="h-4 w-4" /> Foods
						</TabsTrigger>
					</TabsList>

					{/* SNPs Tab */}
					<TabsContent value="snps">
						{snpTopicEntries.length > 0 ? (
							<div className="space-y-3">
								{snpTopicEntries.map(([snpId, arts]) => (
									<Card key={snpId}>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm font-mono">
												<Link href={`/snp/rs${snpId}`} className="text-blue-700 hover:underline">
													rs{snpId}
												</Link>
												<span className="text-muted-foreground font-normal ml-2">
													{arts.length} article{arts.length !== 1 ? "s" : ""}
												</span>
											</CardTitle>
										</CardHeader>
										<CardContent className="space-y-2">
											{arts.slice(0, 3).map((art) => (
												<div key={art.pmid} className="border-l-2 border-muted pl-4 py-1">
													<a
														href={`https://pubmed.ncbi.nlm.nih.gov/${art.pmid}`}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-blue-700 hover:underline"
													>
														{art.title}
													</a>
												</div>
											))}
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<Card>
								<CardContent className="py-8 text-center text-muted-foreground">
									No SNPs found for this gene.
								</CardContent>
							</Card>
						)}
					</TabsContent>

					{/* Articles Tab */}
					<TabsContent value="articles">
						{topicEntries.length > 0 ? (
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
														<p className="text-xs text-muted-foreground mt-1 line-clamp-2">{art.abstract}</p>
													)}
													<span className="text-xs text-muted-foreground">PMID: {art.pmid}</span>
												</div>
											))}
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<Card>
								<CardContent className="py-8 text-center text-muted-foreground">
									No articles found for this gene.
								</CardContent>
							</Card>
						)}
					</TabsContent>

					{/* Foods Tab */}
					<TabsContent value="foods">
						{compounds && compounds.foods.length > 0 ? (
							<Card>
								<CardContent className="pt-6">
									<FoodCompoundsList gene={geneName} foods={compounds.foods} />
								</CardContent>
							</Card>
						) : (
							<Card>
								<CardContent className="py-8 text-center text-muted-foreground">
									No food associations found for this gene.
								</CardContent>
							</Card>
						)}
					</TabsContent>
				</Tabs>
			</main>
			<Footer />
		</>
	);
}
