"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FrequencyResponse } from "@/types/api";

const POPULATION_COLORS: Record<string, string> = {
	"African": "#e11d48",
	"East Asian": "#f59e0b",
	"Non-Finnish European": "#3b82f6",
	"South Asian": "#8b5cf6",
	"Latino/Admixed American": "#10b981",
	"Finnish": "#06b6d4",
	"Ashkenazi Jewish": "#ec4899",
	"Middle Eastern": "#f97316",
	"Amish": "#6b7280",
	"Remaining": "#a3a3a3",
};

interface PopulationChartProps {
	data: FrequencyResponse;
}

export function PopulationFrequencyChart({ data }: PopulationChartProps) {
	const chartData = Object.entries(data.populations)
		.map(([name, pop]) => ({
			name,
			frequency: pop.frequency,
			count: `${pop.allele_count.toLocaleString()} / ${pop.allele_number.toLocaleString()}`,
		}))
		.sort((a, b) => b.frequency - a.frequency);

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-sm font-medium">
					Population Frequencies
					{data.global_frequency !== null && (
						<span className="ml-2 text-muted-foreground font-normal">
							Global: {(data.global_frequency * 100).toFixed(1)}%
						</span>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 36)}>
					<BarChart data={chartData} layout="vertical" margin={{ left: 120, right: 40 }}>
						<CartesianGrid strokeDasharray="3 3" horizontal={false} />
						<XAxis type="number" domain={[0, "auto"]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
						<YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
						<Tooltip
							formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, "Frequency"]}
							labelStyle={{ fontWeight: 600 }}
						/>
						<Bar dataKey="frequency" radius={[0, 4, 4, 0]}>
							{chartData.map((entry) => (
								<Cell key={entry.name} fill={POPULATION_COLORS[entry.name] || "#6b7280"} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
