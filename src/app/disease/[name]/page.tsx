"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/api/axios";
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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { HeartPulse, Activity, FlaskConical, UtensilsCrossed, Dna, ShieldCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";

const DIRECTION_COLORS = { beneficial: "#16a34a", neutral: "#6b7280", harmful: "#dc2626" };

interface DiseaseData {
	disease: string;
	total_predictions: number;
	counts: Record<string, number>;
	predictions: Array<{
		pred_id: number;
		snp: string;
		direction: string;
		confidence: number;
		source: string;
		odds_ratio: number | null;
		p_value: number | null;
	}>;
	genes: Array<{ gene: string; snp_count: number }>;
	foods: Array<{ food: string; gene: string; amount: number; unit: string }>;
}

export default function DiseasePage() {
	const params = useParams();
	const diseaseName = decodeURIComponent(params.name as string);
	const [data, setData] = useState<DiseaseData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!diseaseName) return;
		setLoading(true);
		setError(null);
		apiClient.get(`/disease/${encodeURIComponent(diseaseName)}`)
			.then(res => setData(res.data))
			.catch(() => setError("No data found for this disease."))
			.finally(() => setLoading(false));
	}, [diseaseName]);

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
					<HeartPulse className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
					<h1 className="text-2xl font-bold mb-2">Disease Not Found</h1>
					<p className="text-muted-foreground">No nutrigenetic data found for &quot;{diseaseName}&quot;.</p>
				</main>
			</>
		);
	}

	const pieData = Object.entries(data.counts).map(([dir, count]) => ({
		name: dir.charAt(0).toUpperCase() + dir.slice(1),
		value: count,
	}));

	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="space-y-2 mb-6">
					<div className="flex items-center gap-3">
						<HeartPulse className="h-8 w-8 text-red-500" />
						<h1 className="text-3xl font-bold capitalize">{diseaseName}</h1>
					</div>
					<p className="text-muted-foreground">
						{data.total_predictions} predictions · {data.genes.length} genes
					</p>
				</div>

				{/* Summary cards */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold">{data.total_predictions}</p>
							<p className="text-xs text-muted-foreground">Total Predictions</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold">{data.genes.length}</p>
							<p className="text-xs text-muted-foreground">Genes Involved</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-green-600">{data.counts.beneficial ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldCheck className="h-3 w-3" /> Protective
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 text-center">
							<p className="text-2xl font-bold text-red-600">{data.counts.harmful ?? 0}</p>
							<p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
								<ShieldAlert className="h-3 w-3" /> Risk
							</p>
						</CardContent>
					</Card>
				</div>

				<Tabs defaultValue="predictions" className="space-y-4">
					<TabsList>
						<TabsTrigger value="predictions" className="gap-1">
							<Activity className="h-4 w-4" /> Predictions
						</TabsTrigger>
						<TabsTrigger value="genes" className="gap-1">
							<FlaskConical className="h-4 w-4" /> Genes
						</TabsTrigger>
						<TabsTrigger value="foods" className="gap-1">
							<UtensilsCrossed className="h-4 w-4" /> Related Foods
						</TabsTrigger>
						<TabsTrigger value="overview" className="gap-1">
							<Dna className="h-4 w-4" /> Overview
						</TabsTrigger>
					</TabsList>

					{/* Predictions */}
					<TabsContent value="predictions">
						<Card>
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>SNP</TableHead>
											<TableHead>Direction</TableHead>
											<TableHead>Source</TableHead>
											<TableHead>Confidence</TableHead>
											<TableHead>OR</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.predictions.map((p, i) => (
											<TableRow key={i}>
												<TableCell>
													<Link href={`/snp/${p.snp.toLowerCase()}`} className="font-mono text-sm text-blue-700 hover:underline">
														{p.snp.toLowerCase()}
													</Link>
												</TableCell>
												<TableCell><DirectionBadge direction={p.direction} /></TableCell>
												<TableCell><SourceBadge source={p.source} /></TableCell>
												<TableCell><ConfidenceIndicator value={p.confidence} /></TableCell>
												<TableCell><OddsRatioDisplay value={p.odds_ratio} /></TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Genes */}
					<TabsContent value="genes">
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
					</TabsContent>

					{/* Related Foods */}
					<TabsContent value="foods">
						{data.foods.length > 0 ? (
							<Card>
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Food</TableHead>
												<TableHead>Gene</TableHead>
												<TableHead>Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{data.foods.map((f, i) => (
												<TableRow key={i}>
													<TableCell className="font-medium">
														<Link href={`/food/${encodeURIComponent(f.food)}`} className="text-green-700 hover:underline">
															{f.food}
														</Link>
													</TableCell>
													<TableCell>
														<Badge variant="outline" className="font-mono text-xs">{f.gene}</Badge>
													</TableCell>
													<TableCell className="text-sm text-muted-foreground">
														{f.amount} {f.unit}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
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

					{/* Overview */}
					<TabsContent value="overview">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Direction Distribution</CardTitle>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={250}>
									<PieChart>
										<Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value"
											label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
											{pieData.map((entry) => (
												<Cell key={entry.name} fill={DIRECTION_COLORS[entry.name.toLowerCase() as keyof typeof DIRECTION_COLORS] ?? "#6b7280"} />
											))}
										</Pie>
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
			<Footer />
		</>
	);
}
