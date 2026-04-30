"use client";
import { getFastAPI } from "@/api/fastAPI";
import BarChartGenes from "@/components/barChart";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PizzaChart from "@/components/pieChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, AlertCircle, Dna, FlaskConical } from "lucide-react";
import { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

interface ResultRow {
  food: string;
  disease: string;
  direction: string;
  snp_id: string;
  gene_info: string;
}

interface DiseaseRow {
  disease: string;
  gene_info: string;
}

export default function DataAnalysis() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState("");

  const handleAnalise = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setNotFound(false);
    setSearched(value.trim());

    try {
      const api = getFastAPI();
      const response: any = await api.foodAnalizeSnpsFoodAnalizeFoodNameGet(
        value.trim(),
        { baseURL: process.env.NEXT_PUBLIC_API_URL }
      );
      if (!response.data || !response.data.counts?.beneficial) {
        setNotFound(true);
      } else {
        setResult(response.data);
      }
    } catch (e: any) {
      console.error(e);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAnalise();
  };

  const snpsArray = result
    ? [
        { name: "Beneficial", value: result.counts.beneficial.snps },
        { name: "Neutral", value: result.counts.neutral.snps },
        { name: "Harmful", value: result.counts.harmful.snps },
      ]
    : [];

  const genesArray = result
    ? [
        { name: "Beneficial", value: result.counts.beneficial.genes },
        { name: "Neutral", value: result.counts.neutral.genes },
        { name: "Harmful", value: result.counts.harmful.genes },
      ]
    : [];

  const snpByGene = result?.snpByGene ?? [];

  const tableClass =
    "border border-gray-100 rounded-xl overflow-hidden shadow-sm";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <div className="bg-gradient-to-br from-gray-50 to-green-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
              Data Analysis
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              Food & SNP Analysis
            </h1>
            <p className="text-gray-500 text-base mb-6">
              Enter a food name to explore its genetic variant interactions.
            </p>

            {/* Search bar */}
            <div className="flex max-w-lg gap-0">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Olive oil, Vitamin D, Caffeine..."
                className="flex-1 h-12 px-4 border border-gray-200 rounded-l-xl text-sm outline-none bg-white text-gray-800 placeholder-gray-400 focus:border-green-400 transition-colors"
              />
              <button
                onClick={handleAnalise}
                disabled={loading}
                className="h-12 px-5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white rounded-r-xl flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                <Search size={16} />
                Analyze
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
              <LiaSpinnerSolid className="animate-spin text-green-600 text-5xl" />
              <p className="text-gray-600 font-medium">
                Analyzing <span className="text-green-600">{searched}</span>...
              </p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-6 animate-fade-in">
              <AlertCircle size={18} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Not found state */}
          {notFound && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center animate-fade-in">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <AlertCircle className="text-yellow-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                No results found
              </h2>
              <p className="text-gray-500 max-w-sm">
                No SNP data found for &quot;{searched}&quot;. Try a different food name.
              </p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-8 animate-slide-up">
              {/* Summary stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {result.totalDetails.total_snps}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">
                    Total SNPs
                  </p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {result.totalDetails.total_genes}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">
                    Total Genes
                  </p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 shadow-sm text-center">
                  <p className="text-3xl font-extrabold text-green-600">
                    {result.counts.beneficial.snps}
                  </p>
                  <p className="text-xs text-green-600 mt-1 font-medium uppercase tracking-wide">
                    Beneficial
                  </p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm text-center">
                  <p className="text-3xl font-extrabold text-red-500">
                    {result.counts.harmful.snps}
                  </p>
                  <p className="text-xs text-red-500 mt-1 font-medium uppercase tracking-wide">
                    Harmful
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Dna size={20} className="text-green-600" />
                  Distribution Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">
                      SNPs Distribution
                    </h3>
                    <PizzaChart data={snpsArray} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">
                      Genes Distribution
                    </h3>
                    <PizzaChart data={genesArray} />
                  </div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <FlaskConical size={16} className="text-blue-600" />
                  SNPs per Gene
                </h3>
                <BarChartGenes data={snpByGene} />
              </div>

              {/* Harmful diseases table */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Harmful Diseases
                </h2>
                <p className="text-xs text-gray-400 mb-3">
                  First 10 distinct harmful disease results
                </p>
                <div className={tableClass}>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-700">
                          Disease
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">
                          Gene
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.disease.map((r: DiseaseRow, index: number) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="text-sm">{r.disease}</TableCell>
                          <TableCell className="text-sm font-mono text-blue-600">
                            {r.gene_info}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Harmful details */}
              <ResultTable
                title="Harmful Results"
                caption="First 10 harmful results"
                data={result.details.harmful}
                badgeClass="bg-red-100 text-red-700"
              />

              {/* Beneficial details */}
              <ResultTable
                title="Beneficial Results"
                caption="First 10 beneficial results"
                data={result.details.beneficial}
                badgeClass="bg-green-100 text-green-700"
              />

              {/* Neutral details */}
              <ResultTable
                title="Neutral Results"
                caption="First 10 neutral results"
                data={result.details.neutral}
                badgeClass="bg-gray-100 text-gray-600"
              />
            </div>
          )}

          {/* Empty state (before any search) */}
          {!loading && !result && !notFound && !error && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center text-gray-400">
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center">
                <Search size={36} className="text-green-300" />
              </div>
              <p className="text-lg font-medium">Enter a food name to begin</p>
              <p className="text-sm max-w-xs">
                Search for foods like &quot;Vitamin D&quot;, &quot;Olive oil&quot;, or &quot;Caffeine&quot; to
                explore their genetic interactions.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ResultTable({
  title,
  caption,
  data,
  badgeClass,
}: {
  title: string;
  caption: string;
  data: ResultRow[];
  badgeClass: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
          {data.length}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-3">{caption}</p>
      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Food</TableHead>
              <TableHead className="font-semibold text-gray-700">Disease</TableHead>
              <TableHead className="font-semibold text-gray-700">Direction</TableHead>
              <TableHead className="font-semibold text-gray-700">SNP ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Gene</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r: ResultRow, index: number) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="text-sm">{r.food}</TableCell>
                <TableCell className="text-sm">{r.disease}</TableCell>
                <TableCell className="text-sm">{r.direction}</TableCell>
                <TableCell className="text-sm font-mono text-green-700">
                  {r.snp_id}
                </TableCell>
                <TableCell className="text-sm font-mono text-blue-600">
                  {r.gene_info}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
