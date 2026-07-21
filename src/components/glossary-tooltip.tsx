"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const glossary: Record<string, { en: string; pt: string }> = {
	SNP: {
		en: "Single Nucleotide Polymorphism — A variation in a single DNA base that can affect how your body processes nutrients.",
		pt: "Polimorfismo de Nucleotídeo Único — Uma variação em uma única base do DNA que pode afetar como seu corpo processa nutrientes.",
	},
	gene: {
		en: "A segment of DNA that contains instructions for making proteins. Genes influence how your body metabolizes food and nutrients.",
		pt: "Um segmento de DNA que contém instruções para produzir proteínas. Genes influenciam como seu corpo metaboliza alimentos e nutrientes.",
	},
	GWAS: {
		en: "Genome-Wide Association Study — A large-scale study comparing DNA from thousands of people to find genetic variants linked to diseases or traits.",
		pt: "Estudo de Associação Genômica Ampla — Estudo em larga escala comparando DNA de milhares de pessoas para encontrar variantes genéticas ligadas a doenças.",
	},
	protective: {
		en: "This genetic variant is associated with reduced risk or a beneficial effect against the condition.",
		pt: "Esta variante genética está associada a risco reduzido ou efeito benéfico contra a condição.",
	},
	risk: {
		en: "This genetic variant is associated with increased susceptibility to the condition.",
		pt: "Esta variante genética está associada a maior suscetibilidade à condição.",
	},
	odds_ratio: {
		en: "A measure of how much a genetic variant increases or decreases the probability of a condition. Values above 1 indicate higher risk, below 1 indicate protection.",
		pt: "Uma medida de quanto uma variante genética aumenta ou diminui a probabilidade de uma condição. Valores acima de 1 indicam maior risco, abaixo de 1 indicam proteção.",
	},
	nutrigenetics: {
		en: "The study of how genetic variations affect individual responses to nutrients. Different people metabolize the same food differently due to their DNA.",
		pt: "O estudo de como variações genéticas afetam as respostas individuais aos nutrientes. Pessoas diferentes metabolizam o mesmo alimento de formas diferentes devido ao seu DNA.",
	},
	clinvar: {
		en: "A public database from NCBI that aggregates information about the clinical significance of genetic variants.",
		pt: "Um banco de dados público do NCBI que agrega informações sobre a significância clínica de variantes genéticas.",
	},
	gnomad: {
		en: "The Genome Aggregation Database — Shows how common a genetic variant is across different human populations worldwide.",
		pt: "O Banco de Dados de Agregação Genômica — Mostra quão comum uma variante genética é em diferentes populações humanas pelo mundo.",
	},
	foodb: {
		en: "A comprehensive database of food compounds, linking nutrients to the genes that metabolize them.",
		pt: "Um banco de dados abrangente de compostos alimentares, ligando nutrientes aos genes que os metabolizam.",
	},
};

interface GlossaryTooltipProps {
	term: string;
	children?: React.ReactNode;
	showIcon?: boolean;
}

export function GlossaryTooltip({ term, children, showIcon = true }: GlossaryTooltipProps) {
	const { locale } = useI18n();
	const entry = glossary[term.toLowerCase()] ?? glossary[term];

	if (!entry) return <>{children ?? term}</>;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span className="inline-flex items-center gap-0.5 cursor-help border-b border-dotted border-muted-foreground/40">
					{children ?? term}
					{showIcon && <HelpCircle className="h-3 w-3 text-muted-foreground/50" />}
				</span>
			</TooltipTrigger>
			<TooltipContent className="max-w-xs text-sm">
				<p>{locale === "pt" ? entry.pt : entry.en}</p>
			</TooltipContent>
		</Tooltip>
	);
}
