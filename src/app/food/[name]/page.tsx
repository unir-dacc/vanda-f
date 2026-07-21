"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import type { FoodAnalysisResponse } from "@/types/api";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { EmptyState } from "@/components/empty-state";
import { DataTable, type AssociationRow } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { UtensilsCrossed, BarChart3, List, ShieldCheck, ShieldAlert, SearchX, Info } from "lucide-react";

const DIRECTION_COLORS = { Protective: "#16a34a", Neutral: "#6b7280", Risk: "#dc2626" };

export default function FoodPage() {
	const params = useParams();
	const foodName = decodeURIComponent(params.name as string);
	const { t } = useI18n();

	const [data, setData] = useState<FoodAnalysisResponse | null>(null);
	const [description, setDescription] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!foodName) return;
		setLoading(true);
		setError(false);

		Promise.allSettled([
			api.foodAnalysis(foodName),
			api.foodInfo(foodName),
		]).then(([dataResult, infoResult]) => {
			if (dataResult.status === "fulfilled") setData(dataResult.value);
			else setError(true);
			if (infoResult.status === "fulfilled") setDescription(infoResult.value.description);
			setLoading(false);
		});
	}, [foodName]);

	if (loading) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-8 space-y-4">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-16 w-full" />
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
					</div>
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
						description={`No nutrigenetic data found for "${foodName}".`}
						suggestion={t("empty.check_back")}
						linkText="← Back to search"
						linkHref="/"
					/>
				</main>
				<Footer />
			</>
		);
	}

	// Build unified association rows
	const allRows: AssociationRow[] = [
		...(data.details.harmful ?? []).map(d => ({ ...d, direction: "harmful" })),
		...(data.details.beneficial ?? []).map(d => ({ ...d, direction: "beneficial" })),
		...(data.details.neutral ?? []).map(d => ({ ...d, direction: "neutral" })),
	];

	const pieData = Object.entries(data.counts).map(([dir, counts]) => ({
		name: dir === "beneficial" ? t("direction.beneficial") : dir === "harmful" ? t("direction.harmful") : t("direction.neutral"),
		value: counts.snps,
	}));

	const barData = data.snpByGene.slice(0, 12).map(g => ({ gene: g.gene_info, count: g.snp_count }));

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
								{data.totalDetails.total_snps} SNPs · {data.totalDetails.total_genes} {t("page.genes")} · {allRows.length} {t("page.associations")}
							</p>
						</div>
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

				{/* Summary cards */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold">{data.totalDetails.total_snps}</p>
							<p className="text-xs text-muted-foreground">Total SNPs</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold">{data.totalDetails.total_genes}</p>
							<p className="text-xs text-muted-foreground">Total {t("tab.genes")}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-green-600">{data.counts.beneficial?.snps ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldCheck className="h-3 w-3" /> {t("direction.beneficial")}
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-red-600">{data.counts.harmful?.snps ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldAlert className="h-3 w-3" /> {t("direction.harmful")}
							</p>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="associations" className="space-y-4">
					<TabsList>
						<TabsTrigger value="associations" className="gap-1">
							<List className="h-4 w-4" /> {t("tab.associations")}
						</TabsTrigger>
						<TabsTrigger value="overview" className="gap-1">
							<BarChart3 className="h-4 w-4" /> {t("tab.overview")}
						</TabsTrigger>
					</TabsList>

					<TabsContent value="associations">
						{allRows.length > 0 ? (
							<DataTable data={allRows} showFood />
						) : (
							<EmptyState
								icon={SearchX}
								title={t("empty.no_associations")}
								description="No gene-disease associations found for this food."
								suggestion={t("empty.check_back")}
							/>
						)}
					</TabsContent>

					<TabsContent value="overview">
						{pieData.some(d => d.value > 0) ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Card>
									<CardHeader className="pb-2"><CardTitle className="text-sm">{t("th.effect")} Distribution</CardTitle></CardHeader>
									<CardContent>
										<ResponsiveContainer width="100%" height={300}>
											<PieChart>
												<Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
													label={({ name, percent }) => percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ""}
													labelLine={false}>
													{pieData.map((entry) => (
														<Cell key={entry.name} fill={DIRECTION_COLORS[entry.name as keyof typeof DIRECTION_COLORS] ?? "#6b7280"} />
													))}
												</Pie>
												<Legend />
											</PieChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-2"><CardTitle className="text-sm">SNPs per {t("th.gene")}</CardTitle></CardHeader>
									<CardContent>
										<ResponsiveContainer width="100%" height={250}>
											<BarChart data={barData}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="gene" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
												<YAxis />
												<Tooltip />
												<Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
											</BarChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>
							</div>
						) : (
							<EmptyState icon={BarChart3} title={t("empty.no_data")} description="Not enough data for charts." />
						)}
					</TabsContent>
				</Tabs>
			</main>
			<Footer />
		</>
	);
}
