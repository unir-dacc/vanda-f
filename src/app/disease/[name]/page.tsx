"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { EmptyState } from "@/components/empty-state";
import { DataTable, type AssociationRow } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HeartPulse, Activity, FlaskConical, UtensilsCrossed, ShieldCheck, ShieldAlert, SearchX, Info } from "lucide-react";
import Link from "next/link";

interface DiseaseData {
	disease: string;
	total_predictions: number;
	counts: Record<string, number>;
	predictions: Array<{
		pred_id: number; snp: string; direction: string; confidence: number;
		source: string; odds_ratio: number | null; p_value: number | null;
		pmid: number | null; title: string | null; gene_info?: string;
	}>;
	genes: Array<{ gene: string; snp_count: number }>;
	foods: Array<{ food: string; gene: string; amount: number; unit: string }>;
}

export default function DiseasePage() {
	const params = useParams();
	const diseaseName = decodeURIComponent(params.name as string);
	const { t } = useI18n();

	const [data, setData] = useState<DiseaseData | null>(null);
	const [description, setDescription] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!diseaseName) return;
		setLoading(true);
		setError(false);

		Promise.allSettled([
			api.diseaseAnalysis(diseaseName),
			api.diseaseInfo(diseaseName),
		]).then(([dataResult, infoResult]) => {
			if (dataResult.status === "fulfilled") setData(dataResult.value);
			else setError(true);
			if (infoResult.status === "fulfilled") setDescription(infoResult.value.description);
			setLoading(false);
		});
	}, [diseaseName]);

	if (loading) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-8 space-y-4">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-16 w-full" />
					<Skeleton className="h-48 w-full" />
				</main>
			</>
		);
	}

	if (error || !data) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-16">
					<EmptyState
						icon={SearchX}
						title={t("empty.no_data")}
						description={`No nutrigenetic data found for "${diseaseName}".`}
						suggestion={t("empty.check_back")}
						linkText="← Back to search"
						linkHref="/"
					/>
				</main>
				<Footer />
			</>
		);
	}

	const rows: AssociationRow[] = data.predictions.map(p => ({
		disease: diseaseName,
		snp: p.snp,
		gene_info: p.gene_info ?? "",
		direction: p.direction,
		confidence: p.confidence,
		source: p.source,
		odds_ratio: p.odds_ratio,
		pmid: p.pmid,
		title: p.title,
		pred_id: p.pred_id,
	}));

	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-8 max-w-6xl">
				{/* Header */}
				<div className="space-y-3 mb-6">
					<div className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center">
							<HeartPulse className="h-6 w-6 text-red-500" />
						</div>
						<div>
							<h1 className="text-3xl font-bold capitalize">{diseaseName}</h1>
							<p className="text-sm text-muted-foreground">
								{data.total_predictions} {t("page.predictions")} · {data.genes.length} {t("page.genes")}
							</p>
						</div>
					</div>

					{description && (
						<Card className="bg-red-50/30 border-red-100">
							<CardContent className="p-4 flex gap-3">
								<Info className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
								<p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Summary */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold">{data.total_predictions}</p>
							<p className="text-xs text-muted-foreground">{t("page.associations")}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold">{data.genes.length}</p>
							<p className="text-xs text-muted-foreground">{t("tab.genes")}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-green-600">{data.counts.beneficial ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldCheck className="h-3 w-3" /> {t("direction.beneficial")}
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-red-600">{data.counts.harmful ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldAlert className="h-3 w-3" /> {t("direction.harmful")}
							</p>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="associations" className="space-y-4">
					<TabsList>
						<TabsTrigger value="associations" className="gap-1">
							<Activity className="h-4 w-4" /> {t("tab.associations")}
						</TabsTrigger>
						<TabsTrigger value="genes" className="gap-1">
							<FlaskConical className="h-4 w-4" /> {t("tab.genes")}
						</TabsTrigger>
						<TabsTrigger value="foods" className="gap-1">
							<UtensilsCrossed className="h-4 w-4" /> {t("tab.foods")}
						</TabsTrigger>
					</TabsList>

					<TabsContent value="associations">
						{rows.length > 0 ? (
							<DataTable data={rows} />
						) : (
							<EmptyState icon={SearchX} title={t("empty.no_associations")} description={t("empty.check_back")} />
						)}
					</TabsContent>

					<TabsContent value="genes">
						{data.genes.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
								{data.genes.map((g) => (
									<Link key={g.gene} href={`/gene/${g.gene}`}>
										<Card className="hover:shadow-md transition-shadow cursor-pointer">
											<CardContent className="p-4 flex items-center justify-between">
												<div className="flex items-center gap-2">
													<FlaskConical className="h-4 w-4 text-purple-600" />
													<span className="font-semibold">{g.gene}</span>
												</div>
												<Badge variant="outline" className="text-xs">{g.snp_count} SNPs</Badge>
											</CardContent>
										</Card>
									</Link>
								))}
							</div>
						) : (
							<EmptyState icon={FlaskConical} title={t("empty.no_data")} description="No genes associated." />
						)}
					</TabsContent>

					<TabsContent value="foods">
						{data.foods.length > 0 ? (
							<Card>
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>{t("th.food")}</TableHead>
												<TableHead>{t("th.gene")}</TableHead>
												<TableHead>{t("th.amount")}</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{data.foods.map((f, i) => (
												<TableRow key={i}>
													<TableCell>
														<Link href={`/food/${encodeURIComponent(f.food)}`} className="text-green-700 hover:underline font-medium">
															{f.food}
														</Link>
													</TableCell>
													<TableCell>
														<Link href={`/gene/${f.gene}`}>
															<Badge variant="outline" className="font-mono text-xs hover:bg-muted">{f.gene}</Badge>
														</Link>
													</TableCell>
													<TableCell className="text-sm text-muted-foreground">{f.amount} {f.unit}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						) : (
							<EmptyState icon={UtensilsCrossed} title={t("empty.no_foods")} description={t("empty.check_back")} />
						)}
					</TabsContent>
				</Tabs>
			</main>
			<Footer />
		</>
	);
}
