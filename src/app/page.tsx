"use client";

import Footer from "@/components/footer";
import { UnifiedSearch } from "@/components/search/unified-search";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Dna, FlaskConical, UtensilsCrossed, HeartPulse, BookOpen, ExternalLink,
	Database, Brain, BarChart3, FileText, GitBranch, Search, Activity, Globe,
	ShieldCheck, ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero */}
			<section className="relative flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" />

				<div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
					<Image src="/logo/vandaLogo.svg" alt="VANDA" width={64} height={64} className="mb-4" />

					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">VANDA</h1>
					<p className="text-lg text-muted-foreground mb-2">
						Visualization and Analysis of Nutrigenetic Data Associations
					</p>
					<p className="text-sm text-muted-foreground mb-8 max-w-xl">
						Connecting genetic variants to nutrients and diseases through automated literature mining,
						machine learning, and curated genomic databases.
					</p>

					<div className="w-full max-w-2xl">
						<UnifiedSearch size="large" autoFocus />
					</div>

					<div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
						<span className="text-muted-foreground">Try:</span>
						<Link href="/snp/rs1801133" className="text-blue-600 hover:underline font-mono">rs1801133</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/gene/MTHFR" className="text-purple-600 hover:underline font-semibold">MTHFR</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/food/Vitamin D" className="text-green-600 hover:underline">Vitamin D</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/food/Coffee" className="text-green-600 hover:underline">Coffee</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/disease/Obesity" className="text-red-500 hover:underline">Obesity</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/disease/Type 2 Diabetes" className="text-red-500 hover:underline">Type 2 Diabetes</Link>
					</div>
				</div>
			</section>

			{/* Platform Stats */}
			<section className="border-b bg-white">
				<div className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
						<div>
							<p className="text-2xl font-bold text-green-700">261K+</p>
							<p className="text-xs text-muted-foreground">SNPs Cataloged</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-green-700">64.9K</p>
							<p className="text-xs text-muted-foreground">Predictions</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-green-700">6K+</p>
							<p className="text-xs text-muted-foreground">PubMed Articles</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-green-700">3.3M</p>
							<p className="text-xs text-muted-foreground">Food-Gene Links</p>
						</div>
						<div>
							<p className="text-2xl font-bold text-green-700">0.85</p>
							<p className="text-xs text-muted-foreground">Model F1-Score</p>
						</div>
					</div>
				</div>
			</section>

			{/* Search by Type */}
			<section className="container mx-auto px-4 py-16">
				<h2 className="text-center text-xl font-semibold mb-2">Explore by Category</h2>
				<p className="text-center text-sm text-muted-foreground mb-8">
					Search for genetic variants, genes, foods, or diseases to discover nutrigenetic associations.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<Link href="/snp/rs9939609">
						<Card className="hover:shadow-md transition-shadow h-full cursor-pointer group">
							<CardContent className="p-5">
								<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
									<Dna className="h-5 w-5 text-blue-600" />
								</div>
								<h3 className="font-semibold mb-1">SNP Analysis</h3>
								<p className="text-xs text-muted-foreground mb-3">
									Population frequencies, clinical significance, disease associations with evidence sources.
								</p>
								<span className="text-xs text-blue-600 flex items-center gap-1 group-hover:underline">
									Try rs9939609 <ArrowRight className="h-3 w-3" />
								</span>
							</CardContent>
						</Card>
					</Link>

					<Link href="/gene/CYP1A2">
						<Card className="hover:shadow-md transition-shadow h-full cursor-pointer group">
							<CardContent className="p-5">
								<div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
									<FlaskConical className="h-5 w-5 text-purple-600" />
								</div>
								<h3 className="font-semibold mb-1">Gene Explorer</h3>
								<p className="text-xs text-muted-foreground mb-3">
									Gene description, associated SNPs, disease topics, and food compounds.
								</p>
								<span className="text-xs text-purple-600 flex items-center gap-1 group-hover:underline">
									Try CYP1A2 <ArrowRight className="h-3 w-3" />
								</span>
							</CardContent>
						</Card>
					</Link>

					<Link href="/food/Olive oil">
						<Card className="hover:shadow-md transition-shadow h-full cursor-pointer group">
							<CardContent className="p-5">
								<div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">
									<UtensilsCrossed className="h-5 w-5 text-green-600" />
								</div>
								<h3 className="font-semibold mb-1">Food Analysis</h3>
								<p className="text-xs text-muted-foreground mb-3">
									How foods interact with genetic variants. Beneficial, harmful, and neutral effects.
								</p>
								<span className="text-xs text-green-600 flex items-center gap-1 group-hover:underline">
									Try Olive oil <ArrowRight className="h-3 w-3" />
								</span>
							</CardContent>
						</Card>
					</Link>

					<Link href="/disease/Type 2 Diabetes">
						<Card className="hover:shadow-md transition-shadow h-full cursor-pointer group">
							<CardContent className="p-5">
								<div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
									<HeartPulse className="h-5 w-5 text-red-500" />
								</div>
								<h3 className="font-semibold mb-1">Disease Search</h3>
								<p className="text-xs text-muted-foreground mb-3">
									Find SNPs and genes associated with a disease. See protective and risk variants.
								</p>
								<span className="text-xs text-red-500 flex items-center gap-1 group-hover:underline">
									Try Type 2 Diabetes <ArrowRight className="h-3 w-3" />
								</span>
							</CardContent>
						</Card>
					</Link>
				</div>
			</section>

			<Separator />

			{/* Methodology */}
			<section className="container mx-auto px-4 py-16">
				<h2 className="text-center text-xl font-semibold mb-2">Methodology</h2>
				<p className="text-center text-sm text-muted-foreground mb-10 max-w-2xl mx-auto">
					VANDA uses a multi-stage pipeline combining biomedical text mining, machine learning,
					and curated genomic databases to extract nutrigenetic associations.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
							<Database className="h-6 w-6 text-blue-600" />
						</div>
						<h4 className="font-semibold text-sm mb-1">1. Data Collection</h4>
						<p className="text-xs text-muted-foreground">
							261K SNPs and 6K+ articles collected from NCBI PubMed,
							filtered by nutrigenetic MeSH terms and keywords.
						</p>
					</div>

					<div className="text-center">
						<div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
							<Search className="h-6 w-6 text-emerald-600" />
						</div>
						<h4 className="font-semibold text-sm mb-1">2. Entity Extraction</h4>
						<p className="text-xs text-muted-foreground">
							HunFlair2 biomedical NER extracts diseases, genes, and chemicals.
							SNPs detected via regex patterns (rs IDs, HGVS notation).
						</p>
					</div>

					<div className="text-center">
						<div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
							<Brain className="h-6 w-6 text-purple-600" />
						</div>
						<h4 className="font-semibold text-sm mb-1">3. Relation Classification</h4>
						<p className="text-xs text-muted-foreground">
							PubMedBERT fine-tuned on BioRED + TBGA (31K examples) classifies each
							SNP-disease pair as beneficial, harmful, or neutral. F1 = 0.85.
						</p>
					</div>

					<div className="text-center">
						<div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
							<ShieldCheck className="h-6 w-6 text-amber-600" />
						</div>
						<h4 className="font-semibold text-sm mb-1">4. GWAS Integration</h4>
						<p className="text-xs text-muted-foreground">
							5K+ associations imported from GWAS Catalog with real odds ratios
							and genome-wide significance (p &lt; 5×10⁻⁸).
						</p>
					</div>
				</div>
			</section>

			<Separator />

			{/* Evidence Sources */}
			<section className="container mx-auto px-4 py-16">
				<h2 className="text-center text-xl font-semibold mb-2">Evidence Sources</h2>
				<p className="text-center text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
					Every prediction is traceable to its source. Two types of evidence are clearly distinguished.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
					<Card className="border-amber-200 bg-amber-50/30">
						<CardContent className="p-5">
							<Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 mb-3">
								GWAS Catalog
							</Badge>
							<h4 className="font-semibold text-sm mb-1">Curated Evidence</h4>
							<p className="text-xs text-muted-foreground">
								Expert-curated associations from genome-wide association studies. Includes
								odds ratios and p-values from studies with thousands of participants.
								Highest confidence level.
							</p>
						</CardContent>
					</Card>

					<Card className="border-slate-200 bg-slate-50/30">
						<CardContent className="p-5">
							<Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 mb-3">
								ML Inference
							</Badge>
							<h4 className="font-semibold text-sm mb-1">Automated Extraction</h4>
							<p className="text-xs text-muted-foreground">
								Extracted from PubMed literature using HunFlair2 (NER) and PubMedBERT (classification).
								Each prediction has a confidence score. Trained on BioRED + TBGA datasets.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator />

			{/* Data Sources */}
			<section className="bg-muted/30">
				<div className="container mx-auto px-4 py-12">
					<h2 className="text-center text-sm font-medium text-muted-foreground mb-8">DATA SOURCES & INTEGRATIONS</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
						<a href="https://www.ncbi.nlm.nih.gov/snp/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Image src="/logo/NIH_Logo.png" alt="NCBI" width={36} height={36} />
							<span className="text-xs font-medium">NCBI dbSNP</span>
							<span className="text-[10px]">261K SNPs</span>
						</a>
						<a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<FileText className="h-9 w-9" />
							<span className="text-xs font-medium">PubMed</span>
							<span className="text-[10px]">6K+ Articles</span>
						</a>
						<a href="https://www.ebi.ac.uk/gwas/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<BarChart3 className="h-9 w-9" />
							<span className="text-xs font-medium">GWAS Catalog</span>
							<span className="text-[10px]">5K+ Associations</span>
						</a>
						<a href="https://gnomad.broadinstitute.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Globe className="h-9 w-9" />
							<span className="text-xs font-medium">gnomAD</span>
							<span className="text-[10px]">Population Freq.</span>
						</a>
						<a href="https://www.ncbi.nlm.nih.gov/clinvar/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Activity className="h-9 w-9" />
							<span className="text-xs font-medium">ClinVar</span>
							<span className="text-[10px]">Clinical Signif.</span>
						</a>
						<a href="https://foodb.ca/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<UtensilsCrossed className="h-9 w-9" />
							<span className="text-xs font-medium">FooDB</span>
							<span className="text-[10px]">3.3M Food-Gene</span>
						</a>
					</div>
				</div>
			</section>

			{/* About & Links */}
			<section className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<div>
						<h3 className="font-semibold mb-3">About VANDA</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							VANDA is a nutrigenetics research platform developed at the
							Federal University of Rondônia (UNIR), Department of Computer Science (DACC).
							It automates the extraction of gene-nutrient-disease associations from
							biomedical literature, making nutrigenetic knowledge accessible to
							healthcare professionals and researchers.
						</p>
						<div className="flex items-center gap-4 mt-4">
							<Image src="/logo/unir-logo.ico" alt="UNIR" width={28} height={28} />
							<Image src="/logo/dacc-logo.png" alt="DACC" width={28} height={28} />
						</div>
					</div>

					<div>
						<h3 className="font-semibold mb-3">Resources</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a href="https://github.com/unir-dacc/vanda" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
									<GitBranch className="h-4 w-4" /> Backend Repository (Pipeline + API)
								</a>
							</li>
							<li>
								<a href="https://github.com/unir-dacc/vanda-f" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
									<GitBranch className="h-4 w-4" /> Frontend Repository (Next.js)
								</a>
							</li>
							<li>
								<Link href="/about" className="text-blue-600 hover:underline flex items-center gap-2">
									<BookOpen className="h-4 w-4" /> About the Project
								</Link>
							</li>
							<li>
								<a href="https://computacao.unir.br/vanda" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
									<ExternalLink className="h-4 w-4" /> Live Platform
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
