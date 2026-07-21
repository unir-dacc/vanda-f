// ─── SNP Search ───────────────────────────────────────────────────────────────

export interface MutationDetail {
	id: string;
	mutation: string;
}

export interface HGVSData {
	proteins: MutationDetail[];
	genomics: MutationDetail[];
	mrnas: MutationDetail[];
}

export interface SearchResultItem {
	snp_id: string;
	chromossome_number: string;
	genomic_position: string;
	alleles: string;
	genes: string[];
	mutations: HGVSData;
	publications: PubMedArticle[];
}

export interface PubMedArticle {
	pmid: string;
	title: string;
	abstract: string;
}

// ─── SNP Page ─────────────────────────────────────────────────────────────────

export interface SNPPageResponse {
	topics: Record<string, SNPTopicArticle[]>;
	genes: string[];
}

export interface SNPTopicArticle {
	pmid: string;
	title: string;
	abstract: string;
}

// ─── Gene Page ────────────────────────────────────────────────────────────────

export interface GenePageResponse {
	gene_name: string;
	description: string;
	snp_topics: Record<string, SNPTopicArticle[]>;
	data: Record<string, SNPTopicArticle[]>;
}

// ─── Food Analysis ────────────────────────────────────────────────────────────

export interface DirectionCounts {
	snps: number;
	genes: number;
}

export interface FoodDetail {
	food: string;
	disease: string;
	direction: string;
	snp_id: string;
	gene_info: string;
	confidence: number;
	odds_ratio: number | null;
	source: string | null;
	rn: number;
	pred_id?: number;
}

export interface DiseaseInfo {
	disease: string;
	gene_info: string;
}

export interface SNPByGene {
	gene_info: string;
	snp_count: number;
}

export interface FoodAnalysisResponse {
	totalDetails: { total_snps: number; total_genes: number };
	counts: Record<string, DirectionCounts>;
	details: Record<string, FoodDetail[]>;
	disease: DiseaseInfo[];
	snpByGene: SNPByGene[];
}

// ─── Evidence ─────────────────────────────────────────────────────────────────

export interface EvidenceResponse {
	prediction: {
		id: number;
		pmid: number;
		title: string;
		snp: string;
		disease: string;
		direction: string;
		confidence: number;
		model_version: string;
		created_at: string;
	};
	article: {
		pmid: string;
		title: string;
		abstract: string;
	} | null;
	snp: {
		snp_id: string;
		hgvs: string;
		gene_info: string;
	} | null;
}

export interface PMIDChainResponse {
	pmid: string;
	found_in: string[];
	prediction_count?: number;
	linked_snps?: string[];
}

// ─── Enrichment: gnomAD ───────────────────────────────────────────────────────

export interface PopulationFrequency {
	frequency: number;
	allele_count: number;
	allele_number: number;
}

export interface FrequencyResponse {
	rsid: string;
	ref: string | null;
	alt: string | null;
	position: number | null;
	global_frequency: number | null;
	populations: Record<string, PopulationFrequency>;
}

// ─── Enrichment: ClinVar ──────────────────────────────────────────────────────

export interface ClinVarResponse {
	rsid: string;
	clinical_significance: string;
	conditions: string[];
	review_status: string;
	clinvar_id: string;
}

// ─── Enrichment: FooDB ────────────────────────────────────────────────────────

export interface FoodCompound {
	food: string;
	amount: number;
	unit: string;
	rank: number;
}

export interface GeneCompoundsResponse {
	gene: string;
	foods: FoodCompound[];
}

export interface FoodGeneAssociation {
	snp: string;
	disease: string;
	direction: string;
	confidence: number;
}

export interface FoodGeneDetail {
	gene: string;
	foods: { food: string; amount: number; unit: string }[];
	associations: FoodGeneAssociation[];
}

export interface FoodDetailResponse {
	food: string;
	genes: FoodGeneDetail[];
}

// ─── Enrichment: SNP Complete ─────────────────────────────────────────────────

export interface SNPPrediction {
	disease: string;
	direction: string;
	confidence: number;
	source: string;
	odds_ratio: number | null;
	p_value: number | null;
	pred_id?: number;
}

export interface SNPCompleteResponse {
	rsid: string;
	gene: string | null;
	frequency: FrequencyResponse | null;
	clinvar: ClinVarResponse | null;
	predictions: SNPPrediction[];
	foods: FoodCompound[];
}
