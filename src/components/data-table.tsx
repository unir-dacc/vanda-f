"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "@/components/evidence/source-badge";
import { DirectionBadge } from "@/components/evidence/direction-badge";
import { ExternalLink, ChevronUp, ChevronDown, Search, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export interface AssociationRow {
	disease: string;
	direction: string;
	gene_info?: string;
	snp_id?: string;
	snp?: string;
	confidence: number;
	source?: string | null;
	odds_ratio?: number | null;
	pmid?: number | string | null;
	title?: string | null;
	pred_id?: number;
	food?: string;
}

interface DataTableProps {
	data: AssociationRow[];
	showFood?: boolean;
	showGene?: boolean;
	showSnp?: boolean;
	pageSize?: number;
}

type SortField = "disease" | "confidence" | "direction" | "gene_info";
type SortDir = "asc" | "desc";

export function DataTable({ data, showFood = false, showGene = true, showSnp = true, pageSize = 15 }: DataTableProps) {
	const { t } = useI18n();
	const [search, setSearch] = useState("");
	const [directionFilter, setDirectionFilter] = useState<string>("all");
	const [sourceFilter, setSourceFilter] = useState<string>("all");
	const [sortField, setSortField] = useState<SortField>("confidence");
	const [sortDir, setSortDir] = useState<SortDir>("desc");
	const [page, setPage] = useState(0);

	const filtered = useMemo(() => {
		let result = [...data];

		if (search) {
			const q = search.toLowerCase();
			result = result.filter(r =>
				r.disease?.toLowerCase().includes(q) ||
				r.gene_info?.toLowerCase().includes(q) ||
				r.snp_id?.toLowerCase().includes(q) ||
				r.snp?.toLowerCase().includes(q) ||
				r.food?.toLowerCase().includes(q)
			);
		}

		if (directionFilter !== "all") {
			result = result.filter(r => r.direction === directionFilter);
		}

		if (sourceFilter !== "all") {
			if (sourceFilter === "gwas") result = result.filter(r => r.source === "gwas-catalog");
			else result = result.filter(r => r.source !== "gwas-catalog");
		}

		result.sort((a, b) => {
			let cmp = 0;
			if (sortField === "confidence") cmp = (a.confidence ?? 0) - (b.confidence ?? 0);
			else if (sortField === "disease") cmp = (a.disease ?? "").localeCompare(b.disease ?? "");
			else if (sortField === "direction") cmp = (a.direction ?? "").localeCompare(b.direction ?? "");
			else if (sortField === "gene_info") cmp = (a.gene_info ?? "").localeCompare(b.gene_info ?? "");
			return sortDir === "desc" ? -cmp : cmp;
		});

		return result;
	}, [data, search, directionFilter, sourceFilter, sortField, sortDir]);

	const totalPages = Math.ceil(filtered.length / pageSize);
	const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

	const toggleSort = (field: SortField) => {
		if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
		else { setSortField(field); setSortDir("desc"); }
		setPage(0);
	};

	const SortIcon = ({ field }: { field: SortField }) => {
		if (sortField !== field) return null;
		return sortDir === "desc" ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />;
	};

	return (
		<Card>
			<CardContent className="p-4 space-y-3">
				{/* Filters */}
				<div className="flex flex-wrap gap-2 items-center">
					<div className="relative flex-1 min-w-48">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<input
							type="text"
							value={search}
							onChange={e => { setSearch(e.target.value); setPage(0); }}
							placeholder={t("filter.search")}
							className="w-full pl-9 pr-3 py-1.5 text-sm border rounded-lg bg-background"
						/>
					</div>

					<select
						value={directionFilter}
						onChange={e => { setDirectionFilter(e.target.value); setPage(0); }}
						className="text-sm border rounded-lg px-2 py-1.5 bg-background"
					>
						<option value="all">{t("filter.effect")}: {t("filter.all")}</option>
						<option value="beneficial">{t("direction.beneficial")}</option>
						<option value="harmful">{t("direction.harmful")}</option>
						<option value="neutral">{t("direction.neutral")}</option>
					</select>

					<select
						value={sourceFilter}
						onChange={e => { setSourceFilter(e.target.value); setPage(0); }}
						className="text-sm border rounded-lg px-2 py-1.5 bg-background"
					>
						<option value="all">{t("filter.source")}: {t("filter.all")}</option>
						<option value="gwas">{t("source.gwas")}</option>
						<option value="ml">{t("source.ml")}</option>
					</select>

					<span className="text-xs text-muted-foreground">
						{filtered.length} results
					</span>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								{showFood && <TableHead>{t("th.food")}</TableHead>}
								<TableHead className="cursor-pointer select-none" onClick={() => toggleSort("disease")}>
									{t("th.disease")} <SortIcon field="disease" />
								</TableHead>
								<TableHead className="cursor-pointer select-none" onClick={() => toggleSort("direction")}>
									{t("th.effect")} <SortIcon field="direction" />
								</TableHead>
								{showGene && (
									<TableHead className="cursor-pointer select-none" onClick={() => toggleSort("gene_info")}>
										{t("th.gene")} <SortIcon field="gene_info" />
									</TableHead>
								)}
								{showSnp && <TableHead>{t("th.snp")}</TableHead>}
								<TableHead>{t("th.source")}</TableHead>
								<TableHead>{t("th.article")}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paged.length === 0 ? (
								<TableRow>
									<TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
										{t("empty.no_associations")}
									</TableCell>
								</TableRow>
							) : (
								paged.map((row, i) => (
									<TableRow key={i} className="hover:bg-muted/50">
										{showFood && <TableCell className="text-sm">{row.food}</TableCell>}
										<TableCell className="font-medium text-sm max-w-48">
											<Link href={`/disease/${encodeURIComponent(row.disease)}`} className="hover:underline text-foreground">
												{row.disease}
											</Link>
										</TableCell>
										<TableCell><DirectionBadge direction={row.direction} /></TableCell>
										{showGene && (
											<TableCell>
												{row.gene_info && (
													<Link href={`/gene/${row.gene_info}`}>
														<Badge variant="outline" className="font-mono text-xs hover:bg-muted">
															<FlaskConical className="h-3 w-3 mr-1" />{row.gene_info}
														</Badge>
													</Link>
												)}
											</TableCell>
										)}
										{showSnp && (
											<TableCell className="font-mono text-xs">
												{(row.snp_id || row.snp) && (
													<Link href={`/snp/${(row.snp || `rs${row.snp_id}`).toLowerCase()}`} className="text-blue-700 hover:underline">
														{(row.snp || `rs${row.snp_id}`).toLowerCase()}
													</Link>
												)}
											</TableCell>
										)}
										<TableCell><SourceBadge source={row.source ?? null} /></TableCell>
										<TableCell>
											{row.pmid ? (
												<a
													href={`https://pubmed.ncbi.nlm.nih.gov/${row.pmid}`}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
													title={row.title ?? `PMID: ${row.pmid}`}
												>
													<ExternalLink className="h-3 w-3" />
													PMID
												</a>
											) : (
												<span className="text-xs text-muted-foreground">—</span>
											)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between pt-2">
						<span className="text-xs text-muted-foreground">
							{page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
						</span>
						<div className="flex gap-1">
							<button
								onClick={() => setPage(p => Math.max(0, p - 1))}
								disabled={page === 0}
								className="p-1 rounded border disabled:opacity-30 hover:bg-muted"
							>
								<ChevronLeft className="h-4 w-4" />
							</button>
							<button
								onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
								disabled={page >= totalPages - 1}
								className="p-1 rounded border disabled:opacity-30 hover:bg-muted"
							>
								<ChevronRight className="h-4 w-4" />
							</button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
