"use client";

import Footer from "@/components/footer";
import { UnifiedSearch } from "@/components/search/unified-search";
import { Dna, FlaskConical, UtensilsCrossed, BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero */}
			<section className="relative flex flex-col items-center justify-center px-4 py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" />

				<div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
					<Image src="/logo/vandaLogo.svg" alt="VANDA" width={64} height={64} className="mb-4" />

					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
						VANDA
					</h1>
					<p className="text-lg text-muted-foreground mb-8">
						Visualization and Analysis of Nutrigenetic Data Associations
					</p>

					{/* Unified Search */}
					<div className="w-full max-w-2xl">
						<UnifiedSearch size="large" autoFocus />
					</div>

					{/* Quick links */}
					<div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
						<span className="text-muted-foreground">Try:</span>
						<Link href="/snp/rs1801133" className="text-blue-600 hover:underline font-mono">rs1801133</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/gene/MTHFR" className="text-purple-600 hover:underline font-semibold">MTHFR</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/food/Vitamin D" className="text-green-600 hover:underline">Vitamin D</Link>
						<span className="text-muted-foreground">·</span>
						<Link href="/food/Caffeine" className="text-green-600 hover:underline">Caffeine</Link>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Link href="/snp/rs9939609" className="group">
						<div className="border rounded-xl p-6 hover:shadow-md transition-shadow h-full">
							<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
								<Dna className="h-5 w-5 text-blue-600" />
							</div>
							<h3 className="font-semibold mb-2">SNP Analysis</h3>
							<p className="text-sm text-muted-foreground">
								Explore genetic variants with population frequencies, clinical significance, and nutrigenetic associations.
							</p>
						</div>
					</Link>

					<Link href="/food/Olive oil" className="group">
						<div className="border rounded-xl p-6 hover:shadow-md transition-shadow h-full">
							<div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center mb-4">
								<UtensilsCrossed className="h-5 w-5 text-green-600" />
							</div>
							<h3 className="font-semibold mb-2">Food Analysis</h3>
							<p className="text-sm text-muted-foreground">
								Discover how foods interact with genetic variants. See beneficial, harmful, and neutral effects.
							</p>
						</div>
					</Link>

					<Link href="/gene/CYP1A2" className="group">
						<div className="border rounded-xl p-6 hover:shadow-md transition-shadow h-full">
							<div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
								<FlaskConical className="h-5 w-5 text-purple-600" />
							</div>
							<h3 className="font-semibold mb-2">Gene Explorer</h3>
							<p className="text-sm text-muted-foreground">
								Dive into gene-nutrient interactions. Explore SNPs, diseases, and food compounds for any gene.
							</p>
						</div>
					</Link>
				</div>
			</section>

			{/* Data Sources */}
			<section className="border-t bg-muted/30">
				<div className="container mx-auto px-4 py-12">
					<h2 className="text-center text-sm font-medium text-muted-foreground mb-6">DATA SOURCES</h2>
					<div className="flex flex-wrap items-center justify-center gap-8">
						<a href="https://www.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
							<Image src="/logo/NIH_Logo.png" alt="NCBI" width={40} height={40} />
							<span className="text-sm">NCBI / PubMed</span>
						</a>
						<div className="flex items-center gap-2 text-muted-foreground">
							<BookOpen className="h-5 w-5" />
							<span className="text-sm">GWAS Catalog</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="text-sm">gnomAD</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="text-sm">ClinVar</span>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="text-sm">FooDB</span>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
