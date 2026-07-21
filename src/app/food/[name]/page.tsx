"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { FoodAnalysisResponse } from "@/types/api";
import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SourceBadge } from "@/components/evidence/source-badge";
import { ConfidenceIndicator } from "@/components/evidence/confidence-indicator";
import { DirectionBadge } from "@/components/evidence/direction-badge";
import { OddsRatioDisplay } from "@/components/evidence/odds-ratio-display";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { UtensilsCrossed, BarChart3, List, FlaskConical, ShieldCheck, ShieldAlert } from "lucide-react";

const DIRECTION_COLORS = { beneficial: "#16a34a", neutral: "#6b7280", harmful: "#dc2626" };

export default function FoodPage() {
	const params = useParams();
	const foodName = decodeURIComponent(params.name as string);
	const [data, setData] = useState<FoodAnalysisResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!foodName) return;
		setLoading(true);
		setError(null);
		api.foodAnalysis(foodName)
			.then(setData)
			.catch(() => setError("No data found for this food."))
			.finally(() => setLoading(false));
	}, [foodName]);

	if (loading) {
		return (
			<>
				<AppHeader />
				<main className="container mx-auto px-4 py-8 space-y-4">
					<Skeleton className="h-8 w-64" />
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
				<main className="container mx-auto px-4 py-16 text-center">
					<UtensilsCrossed className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
					<h1 className="text-2xl font-bold mb-2">No Data Found</h1>
					<p className="text-muted-foreground">No nutrigenetic data found for &quot;{foodName}&quot;.</p>
				</main>
			</>
		);
	}

	const pieData = Object.entries(data.counts).map(([dir, counts]) => ({
		name: dir.charAt(0).toUpperCase() + dir.slice(1),
		value: counts.snps,
	}));

	const barData = data.snpByGene.slice(0, 15).map(g => ({
		gene: g.gene_info,
		count: g.snp_count,
	}));

	const allDetails = [
		...data.details.harmful?.map(d => ({ ...d, direction: "harmful" })) ?? [],
		...data.details.beneficial?.map(d => ({ ...d, direction: "beneficial" })) ?? [],
		...data.details.neutral?.map(d => ({ ...d, direction: "neutral" })) ?? [],
	];

	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="space-y-2 mb-6">
					<div className="flex items-center gap-3">
						<UtensilsCrossed className="h-8 w-8 text-green-600" />
						<h1 className="text-3xl font-bold capitalize">{foodName}</h1>
					</div>
					<p className="text-muted-foreground">
						{data.totalDetails.total_snps} SNPs · {data.totalDetails.total_genes} Genes
					</p>
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
							<p className="text-xs text-muted-foreground">Total Genes</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-green-600">{data.counts.beneficial?.snps ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldCheck className="h-3 w-3" /> Beneficial
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-red-600">{data.counts.harmful?.snps ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldAlert className="h-3 w-3" /> Harmful
							</p>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview" className="gap-1">
							<BarChart3 className="h-4 w-4" /> Overview
						</TabsTrigger>
						<TabsTrigger value="details" className="gap-1">
							<List className="h-4 w-4" /> Details
						</TabsTrigger>
						<TabsTrigger value="diseases" className="gap-1">
							<ShieldAlert className="h-4 w-4" /> Diseases
						</TabsTrigger>
					</TabsList>

					{/* Overview */}
					<TabsContent value="overview">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card>
								<CardHeader className="pb-2"><CardTitle className="text-sm">Direction Distribution</CardTitle></CardHeader>
								<CardContent>
									<ResponsiveContainer width="100%" height={250}>
										<PieChart>
											<Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
												{pieData.map((entry) => (
													<Cell key={entry.name} fill={DIRECTION_COLORS[entry.name.toLowerCase() as keyof typeof DIRECTION_COLORS] ?? "#6b7280"} />
												))}
											</Pie>
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="pb-2"><CardTitle className="text-sm">SNPs per Gene</CardTitle></CardHeader>
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
					</TabsContent>

					{/* Details */}
					<TabsContent value="details">
						<Card>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Disease</TableHead>
											<TableHead>Direction</TableHead>
											<TableHead>Gene</TableHead>
											<TableHead>SNP</TableHead>
											<TableHead>Source</TableHead>
											<TableHead>Confidence</TableHead>
											<TableHead>OR</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{allDetails.slice(0, 50).map((d, i) => (
											<TableRow key={i}>
												<TableCell className="font-medium text-sm">{d.disease}</TableCell>
												<TableCell><DirectionBadge direction={d.direction} /></TableCell>
												<TableCell>
													<Badge variant="outline" className="font-mono text-xs">
														<FlaskConical className="h-3 w-3 mr-1" />{d.gene_info}
													</Badge>
												</TableCell>
												<TableCell className="font-mono text-xs">{d.snp_id}</TableCell>
												<TableCell><SourceBadge source={d.source} /></TableCell>
												<TableCell><ConfidenceIndicator value={d.confidence} /></TableCell>
												<TableCell><OddsRatioDisplay value={d.odds_ratio} /></TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Diseases */}
					<TabsContent value="diseases">
						<Card>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Disease</TableHead>
											<TableHead>Gene</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.disease.map((d, i) => (
											<TableRow key={i}>
												<TableCell className="font-medium">{d.disease}</TableCell>
												<TableCell>
													<Badge variant="outline" className="font-mono text-xs">{d.gene_info}</Badge>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
			<Footer />
		</>
	);
}
