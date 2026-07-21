import { apiClient } from "@/api/axios";
import type {
	ClinVarResponse,
	EvidenceResponse,
	FoodAnalysisResponse,
	FoodDetailResponse,
	FrequencyResponse,
	GeneCompoundsResponse,
	GenePageResponse,
	PMIDChainResponse,
	SNPCompleteResponse,
	SNPPageResponse,
} from "@/types/api";

async function get<T>(url: string): Promise<T> {
	const { data } = await apiClient.get<T>(url);
	return data;
}

// ─── Core ─────────────────────────────────────────────────────────────────────

export const api = {
	// SNP
	snpPage: (rsid: string) =>
		get<SNPPageResponse>(`/snp/${encodeURIComponent(rsid)}`),

	snpComplete: (rsid: string) =>
		get<SNPCompleteResponse>(`/enrich/snp-complete/${encodeURIComponent(rsid)}`),

	// Gene
	genePage: (name: string) =>
		get<GenePageResponse>(`/gene/${encodeURIComponent(name)}`),

	geneCompounds: (name: string) =>
		get<GeneCompoundsResponse>(`/enrich/compounds/${encodeURIComponent(name)}`),

	// Food
	foodAnalysis: (name: string) =>
		get<FoodAnalysisResponse>(`/snps/food-analize/${encodeURIComponent(name)}`),

	foodDetail: (name: string) =>
		get<FoodDetailResponse>(`/enrich/food-detail/${encodeURIComponent(name)}`),

	// Enrichment
	frequency: (rsid: string) =>
		get<FrequencyResponse>(`/enrich/frequency/${encodeURIComponent(rsid)}`),

	clinvar: (rsid: string) =>
		get<ClinVarResponse>(`/enrich/clinvar/${encodeURIComponent(rsid)}`),

	// Evidence
	evidence: (predId: number) =>
		get<EvidenceResponse>(`/evidence/${predId}`),

	pmidChain: (pmid: string) =>
		get<PMIDChainResponse>(`/evidence/pmid/${encodeURIComponent(pmid)}`),
};
