"use client";

import AppHeader from "@/components/app-header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, Mail, GitBranch, Database, Brain, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";

const team = [
	{
		name: "Dr. Lucas Marques da Cunha",
		role: "Advisor",
		initials: "LC",
		color: "bg-green-600",
		credentials: [
			"Ph.D. in Bioinformatics",
			"M.Sc. in Computer Science",
			"Specialist in Education Management",
			"B.Sc. in Information Systems",
		],
		links: [
			{ label: "Currículo Lattes", url: "http://lattes.cnpq.br/", icon: GraduationCap },
		],
	},
	{
		name: "Ricardo Alves da Silva",
		role: "Researcher",
		initials: "RA",
		color: "bg-blue-600",
		credentials: [],
		links: [
			{ label: "ricardcpu@gmail.com", url: "mailto:ricardcpu@gmail.com", icon: Mail },
			{ label: "GitHub", url: "https://github.com/riccardoalv", icon: GitBranch },
		],
	},
	{
		name: "Thauan Silva",
		role: "Researcher",
		initials: "TS",
		color: "bg-purple-600",
		credentials: [],
		links: [
			{ label: "thauansilva243@gmail.com", url: "mailto:thauansilva243@gmail.com", icon: Mail },
		],
	},
];

export default function AboutPage() {
	return (
		<>
			<AppHeader />
			<main className="container mx-auto px-4 py-12 max-w-5xl">
				<section className="text-center mb-12">
					<Image src="/logo/vandaLogo.svg" alt="VANDA" width={56} height={56} className="mx-auto mb-4" />
					<h1 className="text-3xl font-bold mb-3">About VANDA</h1>
					<p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						VANDA (Visualization and Analysis of Nutrigenetic Data Associations) is a research platform
						that automates the extraction of relationships between genetic variants (SNPs), nutrients, and
						diseases from biomedical literature. It integrates multiple curated databases to make
						nutrigenetic knowledge accessible to healthcare professionals and researchers.
					</p>
				</section>

				<Separator className="mb-12" />

				<section className="mb-12">
					<h2 className="text-xl font-semibold text-center mb-8">Methodology</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
									<Database className="h-6 w-6 text-blue-600" />
								</div>
								<h4 className="font-semibold text-sm mb-1">1. Data Collection</h4>
								<p className="text-xs text-muted-foreground">
									261K+ SNPs and 6K+ articles collected from NCBI/PubMed, filtered by nutrigenetic MeSH terms.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
									<Search className="h-6 w-6 text-emerald-600" />
								</div>
								<h4 className="font-semibold text-sm mb-1">2. Entity Extraction</h4>
								<p className="text-xs text-muted-foreground">
									HunFlair2 biomedical NER identifies diseases, genes, and chemicals. SNPs detected via regex.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
									<Brain className="h-6 w-6 text-purple-600" />
								</div>
								<h4 className="font-semibold text-sm mb-1">3. Classification</h4>
								<p className="text-xs text-muted-foreground">
									PubMedBERT fine-tuned on BioRED + TBGA (31K examples). F1: 0.85. Classifies protective, risk, or neutral.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="pt-6 text-center">
								<div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
									<ShieldCheck className="h-6 w-6 text-amber-600" />
								</div>
								<h4 className="font-semibold text-sm mb-1">4. GWAS Integration</h4>
								<p className="text-xs text-muted-foreground">
									5K+ curated associations from GWAS Catalog with real odds ratios and genome-wide significance.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>

				<Separator className="mb-12" />

				<section className="mb-12">
					<h2 className="text-xl font-semibold text-center mb-8">Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{team.map((member) => (
							<Card key={member.name}>
								<CardContent className="pt-6">
									<div className="flex flex-col items-center text-center">
										<div className={`h-16 w-16 rounded-full ${member.color} flex items-center justify-center text-white text-xl font-bold mb-3`}>
											{member.initials}
										</div>
										<h3 className="font-semibold">{member.name}</h3>
										<Badge variant="outline" className="mt-1 mb-3">{member.role}</Badge>

										{member.credentials.length > 0 && (
											<div className="text-xs text-muted-foreground space-y-0.5 mb-3">
												{member.credentials.map((c, i) => (
													<p key={i}>{c}</p>
												))}
											</div>
										)}

										<div className="flex flex-col gap-1 w-full">
											{member.links.map((link) => {
												const Icon = link.icon;
												return (
													<a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
														className="text-xs text-blue-600 hover:underline flex items-center gap-1 justify-center">
														<Icon className="h-3 w-3" /> {link.label}
													</a>
												);
											})}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<Separator className="mb-12" />

				<section className="text-center mb-12">
					<h2 className="text-xl font-semibold mb-6">Institution</h2>
					<div className="flex items-center justify-center gap-6">
						<Image src="/logo/unir-logo.ico" alt="UNIR" width={48} height={48} />
						<div className="text-left">
							<p className="font-semibold">Federal University of Rondônia (UNIR)</p>
							<p className="text-sm text-muted-foreground">Department of Computer Science (DACC)</p>
							<a href="https://www.unir.br" target="_blank" rel="noopener noreferrer"
								className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1">
								<ExternalLink className="h-3 w-3" /> www.unir.br
							</a>
						</div>
					</div>
				</section>

				<section className="text-center">
					<div className="flex flex-wrap items-center justify-center gap-6 text-sm">
						<a href="https://github.com/unir-dacc/vanda" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
							<GitBranch className="h-4 w-4" /> Backend Repository
						</a>
						<a href="https://github.com/unir-dacc/vanda-f" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
							<GitBranch className="h-4 w-4" /> Frontend Repository
						</a>
						<a href="https://computacao.unir.br/vanda" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
							<ExternalLink className="h-4 w-4" /> Live Platform
						</a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
