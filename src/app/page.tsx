"use client";

import Footer from "@/components/footer";
import AppHeader from "@/components/app-header";
import { UnifiedSearch } from "@/components/search/unified-search";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import {
	Dna, FlaskConical, UtensilsCrossed, HeartPulse, BookOpen, ExternalLink,
	Database, Brain, Search, Activity, Globe, FileText, BarChart3,
	ShieldCheck, ArrowRight, GitBranch, Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const topDiseases = [
	{ name: "Type 2 Diabetes", count: 3524 },
	{ name: "Obesity", count: 2650 },
	{ name: "Coronary Artery Disease", count: 1140 },
	{ name: "Breast Cancer", count: 926 },
	{ name: "Hypertension", count: 915 },
];

const topGenes = [
	{ name: "VDR", count: 44 },
	{ name: "FTO", count: 38 },
	{ name: "FADS2", count: 28 },
	{ name: "CYP24A1", count: 27 },
	{ name: "PPARG", count: 21 },
	{ name: "TCF7L2", count: 18 },
];

const topFoods = [
	{ name: "Milk (Cow)", count: 5549 },
	{ name: "Beer", count: 5128 },
	{ name: "Corn", count: 4664 },
	{ name: "Carrot", count: 4604 },
	{ name: "Apple", count: 4562 },
];

export default function Home() {
	const { t } = useI18n();

	return (
		<div className="min-h-screen flex flex-col">
			<AppHeader />

			{/* Hero */}
			<section className="relative flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
				<div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
					<Image src="/logo/vandaLogo.svg" alt="VANDA" width={56} height={56} className="mb-3" />
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{t("home.title")}</h1>
					<p className="text-base text-muted-foreground mb-1">{t("home.subtitle")}</p>
					<p className="text-sm text-muted-foreground mb-6 max-w-xl">{t("home.description")}</p>

					<div className="w-full max-w-2xl">
						<UnifiedSearch size="large" autoFocus />
					</div>

					<div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
						<span className="text-muted-foreground">{t("home.try")}</span>
						<Link href="/gene/MTHFR" className="text-purple-600 hover:underline font-semibold">MTHFR</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/food/Milk (Cow)" className="text-green-600 hover:underline">Milk</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/disease/Obesity" className="text-red-500 hover:underline">Obesity</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/disease/Type 2 Diabetes" className="text-red-500 hover:underline">Type 2 Diabetes</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/gene/FTO" className="text-purple-600 hover:underline font-semibold">FTO</Link>
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="border-b bg-white">
				<div className="container mx-auto px-4 py-6">
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
						<div><p className="text-xl font-bold text-green-700">261K+</p><p className="text-xs text-muted-foreground">SNPs</p></div>
						<div><p className="text-xl font-bold text-green-700">64.9K</p><p className="text-xs text-muted-foreground">{t("page.associations")}</p></div>
						<div><p className="text-xl font-bold text-green-700">6K+</p><p className="text-xs text-muted-foreground">{t("tab.articles")}</p></div>
						<div><p className="text-xl font-bold text-green-700">3.3M</p><p className="text-xs text-muted-foreground">Food-Gene</p></div>
						<div><p className="text-xl font-bold text-green-700">F1: 0.85</p><p className="text-xs text-muted-foreground">Model</p></div>
					</div>
				</div>
			</section>

			{/* What is Nutrigenetics */}
			<section className="container mx-auto px-4 py-12">
				<div className="max-w-3xl mx-auto">
					<div className="flex items-start gap-4">
						<div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-1">
							<Info className="h-5 w-5 text-green-600" />
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-2">{t("home.what_is")}</h2>
							<p className="text-sm text-muted-foreground leading-relaxed">{t("home.what_is_text")}</p>
						</div>
					</div>
				</div>
			</section>

			<Separator />

			{/* Top Diseases */}
			<section className="container mx-auto px-4 py-10">
				<h2 className="text-lg font-semibold mb-6 flex items-center justify-center gap-2">
					<HeartPulse className="h-5 w-5 text-red-500" />
					{t("home.top_diseases")}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
					{topDiseases.map(d => (
						<Link key={d.name} href={`/disease/${encodeURIComponent(d.name)}`}>
							<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-red-100 hover:border-red-300">
								<CardContent className="p-5 text-center">
									<HeartPulse className="h-6 w-6 text-red-400 mx-auto mb-2" />
									<p className="font-semibold text-sm mb-1">{d.name}</p>
									<p className="text-xs text-muted-foreground">{d.count.toLocaleString()} {t("page.associations")}</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>

			{/* Top Genes */}
			<section className="container mx-auto px-4 py-8">
				<h2 className="text-lg font-semibold mb-6 flex items-center justify-center gap-2">
					<FlaskConical className="h-5 w-5 text-purple-600" />
					{t("home.top_genes")}
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
					{topGenes.map(g => (
						<Link key={g.name} href={`/gene/${g.name}`}>
							<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-purple-100 hover:border-purple-300">
								<CardContent className="p-5 text-center">
									<FlaskConical className="h-6 w-6 text-purple-400 mx-auto mb-2" />
									<p className="font-mono font-bold text-base">{g.name}</p>
									<p className="text-xs text-muted-foreground">{g.count} SNPs</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>

			{/* Top Foods */}
			<section className="container mx-auto px-4 py-8 pb-12">
				<h2 className="text-lg font-semibold mb-6 flex items-center justify-center gap-2">
					<UtensilsCrossed className="h-5 w-5 text-green-600" />
					{t("home.top_foods")}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
					{topFoods.map(f => (
						<Link key={f.name} href={`/food/${encodeURIComponent(f.name)}`}>
							<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-green-100 hover:border-green-300">
								<CardContent className="p-5 text-center">
									<UtensilsCrossed className="h-6 w-6 text-green-400 mx-auto mb-2" />
									<p className="font-semibold text-sm mb-1">{f.name}</p>
									<p className="text-xs text-muted-foreground">{f.count.toLocaleString()} gene links</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</section>

			<Separator />

			{/* Data Sources */}
			<section className="bg-muted/30">
				<div className="container mx-auto px-4 py-10">
					<h2 className="text-center text-sm font-medium text-muted-foreground mb-6">DATA SOURCES</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						<a href="https://www.ncbi.nlm.nih.gov/snp/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Image src="/logo/NIH_Logo.png" alt="NCBI" width={32} height={32} />
							<span className="text-xs font-medium">NCBI dbSNP</span>
						</a>
						<a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<FileText className="h-8 w-8" />
							<span className="text-xs font-medium">PubMed</span>
						</a>
						<a href="https://www.ebi.ac.uk/gwas/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<BarChart3 className="h-8 w-8" />
							<span className="text-xs font-medium">GWAS Catalog</span>
						</a>
						<a href="https://gnomad.broadinstitute.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Globe className="h-8 w-8" />
							<span className="text-xs font-medium">gnomAD</span>
						</a>
						<a href="https://www.ncbi.nlm.nih.gov/clinvar/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Activity className="h-8 w-8" />
							<span className="text-xs font-medium">ClinVar</span>
						</a>
						<a href="https://foodb.ca/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<UtensilsCrossed className="h-8 w-8" />
							<span className="text-xs font-medium">FooDB</span>
						</a>
					</div>
				</div>
			</section>

			{/* About + Links */}
			<section className="container mx-auto px-4 py-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<div>
						<h3 className="font-semibold mb-3">About</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Developed at the Federal University of Rondônia (UNIR), DACC.
							VANDA automates the extraction of gene-nutrient-disease associations from
							biomedical literature using NLP and machine learning.
						</p>
						<div className="flex items-center gap-4 mt-4">
							<Image src="/logo/unir-logo.ico" alt="UNIR" width={28} height={28} />
							<Image src="/logo/dacc-logo.png" alt="DACC" width={28} height={28} />
						</div>
					</div>
					<div>
						<h3 className="font-semibold mb-3">Resources</h3>
						<ul className="space-y-2 text-sm">
							<li><a href="https://github.com/unir-dacc/vanda" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2"><GitBranch className="h-4 w-4" /> Backend (Pipeline + API)</a></li>
							<li><a href="https://github.com/unir-dacc/vanda-f" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2"><GitBranch className="h-4 w-4" /> Frontend (Next.js)</a></li>
							<li><Link href="/about" className="text-blue-600 hover:underline flex items-center gap-2"><BookOpen className="h-4 w-4" /> About the Project</Link></li>
						</ul>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
