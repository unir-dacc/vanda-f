"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import React from "react";

export type Locale = "en" | "pt";

const translations = {
	// Evidence
	"source.gwas": { en: "Clinical Study", pt: "Estudo Clínico" },
	"source.ml": { en: "Literature Analysis", pt: "Análise da Literatura" },
	"direction.beneficial": { en: "Protective", pt: "Protetor" },
	"direction.harmful": { en: "Risk", pt: "Risco" },
	"direction.neutral": { en: "Neutral", pt: "Neutro" },
	"confidence": { en: "Reliability", pt: "Confiabilidade" },
	"odds_ratio": { en: "Risk Level", pt: "Nível de Risco" },
	"or.increased": { en: "increased risk", pt: "mais risco" },
	"or.reduced": { en: "reduced risk (protective)", pt: "menos risco (protetor)" },
	"or.minimal": { en: "minimal effect", pt: "efeito mínimo" },

	// Tabs
	"tab.associations": { en: "Associations", pt: "Associações" },
	"tab.overview": { en: "Overview", pt: "Visão Geral" },
	"tab.population": { en: "Population", pt: "População" },
	"tab.foods": { en: "Foods", pt: "Alimentos" },
	"tab.articles": { en: "Articles", pt: "Artigos" },
	"tab.genes": { en: "Genes", pt: "Genes" },
	"tab.compounds": { en: "Compounds", pt: "Compostos" },

	// Table headers
	"th.disease": { en: "Disease", pt: "Doença" },
	"th.effect": { en: "Effect", pt: "Efeito" },
	"th.gene": { en: "Gene", pt: "Gene" },
	"th.snp": { en: "SNP", pt: "SNP" },
	"th.reliability": { en: "Reliability", pt: "Confiabilidade" },
	"th.source": { en: "Source", pt: "Fonte" },
	"th.article": { en: "Article", pt: "Artigo" },
	"th.food": { en: "Food", pt: "Alimento" },
	"th.amount": { en: "Amount", pt: "Quantidade" },

	// Filters
	"filter.all": { en: "All", pt: "Todos" },
	"filter.search": { en: "Search...", pt: "Buscar..." },
	"filter.source": { en: "Source", pt: "Fonte" },
	"filter.effect": { en: "Effect", pt: "Efeito" },

	// Empty states
	"empty.no_data": { en: "No data available", pt: "Sem dados disponíveis" },
	"empty.no_associations": { en: "No associations found", pt: "Nenhuma associação encontrada" },
	"empty.no_articles": { en: "No articles found", pt: "Nenhum artigo encontrado" },
	"empty.no_foods": { en: "No food associations", pt: "Sem associações alimentares" },
	"empty.check_back": { en: "Check back later as our database is continuously updated.", pt: "Volte mais tarde, nosso banco é atualizado continuamente." },

	// Pages
	"page.associations": { en: "associations", pt: "associações" },
	"page.genes": { en: "genes", pt: "genes" },
	"page.predictions": { en: "predictions", pt: "predições" },
	"page.view_source": { en: "View source article", pt: "Ver artigo fonte" },
	"page.view_evidence": { en: "View evidence", pt: "Ver evidência" },
	"page.view_on": { en: "View on", pt: "Ver no" },

	// Homepage
	"home.title": { en: "VANDA", pt: "VANDA" },
	"home.subtitle": { en: "Visualization and Analysis of Nutrigenetic Data Associations", pt: "Visualização e Análise de Dados de Associações Nutrigenéticas" },
	"home.description": { en: "Connecting genetic variants to nutrients and diseases through automated literature mining, machine learning, and curated genomic databases.", pt: "Conectando variantes genéticas a nutrientes e doenças através de mineração automatizada de literatura, aprendizado de máquina e bancos genômicos curados." },
	"home.search_placeholder": { en: "Search SNPs, genes, foods, or diseases...", pt: "Buscar SNPs, genes, alimentos ou doenças..." },
	"home.try": { en: "Try:", pt: "Tente:" },
	"home.what_is": { en: "What is Nutrigenetics?", pt: "O que é Nutrigenética?" },
	"home.what_is_text": { en: "Nutrigenetics studies how genetic variations (SNPs) affect individual responses to nutrients. Different people metabolize the same food differently due to their DNA. VANDA maps these relationships automatically from scientific literature, helping healthcare professionals personalize dietary recommendations based on genetic profiles.", pt: "A nutrigenética estuda como variações genéticas (SNPs) afetam as respostas individuais aos nutrientes. Pessoas diferentes metabolizam o mesmo alimento de formas diferentes devido ao seu DNA. O VANDA mapeia essas relações automaticamente a partir da literatura científica, ajudando profissionais de saúde a personalizar recomendações dietéticas com base em perfis genéticos." },
	"home.explore": { en: "Explore by Category", pt: "Explore por Categoria" },
	"home.top_diseases": { en: "Most Studied Diseases", pt: "Doenças Mais Estudadas" },
	"home.top_genes": { en: "Key Nutrigenetic Genes", pt: "Genes Nutrigenéticos Chave" },
	"home.top_foods": { en: "Foods with Most Gene Links", pt: "Alimentos com Mais Ligações Genéticas" },

	// About
	"about.mission": { en: "Mission", pt: "Missão" },
	"about.team": { en: "Team", pt: "Equipe" },
	"about.methodology": { en: "Methodology", pt: "Metodologia" },
	"about.institution": { en: "Institution", pt: "Instituição" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
	locale: "en",
	setLocale: () => {},
	t: (key) => translations[key]?.en ?? key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
	const [locale, setLocale] = useState<Locale>("en");

	const t = useCallback(
		(key: TranslationKey): string => {
			return translations[key]?.[locale] ?? key;
		},
		[locale]
	);

	return React.createElement(
		I18nContext.Provider,
		{ value: { locale, setLocale, t } },
		children
	);
}

export function useI18n() {
	return useContext(I18nContext);
}
