import { Card, CardContent } from "@/components/ui/card";
import { SourceBadge } from "./source-badge";
import { ConfidenceIndicator } from "./confidence-indicator";
import { OddsRatioDisplay } from "./odds-ratio-display";
import { DirectionBadge } from "./direction-badge";
import { ExternalLink } from "lucide-react";
import type { SNPPrediction } from "@/types/api";

interface EvidenceCardProps {
	prediction: SNPPrediction;
	snp?: string;
}

export function EvidenceCard({ prediction, snp }: EvidenceCardProps) {
	return (
		<Card className="hover:shadow-md transition-shadow">
			<CardContent className="p-4">
				<div className="flex flex-wrap items-start justify-between gap-2">
					<div className="space-y-1">
						<h4 className="font-semibold text-sm">{prediction.disease}</h4>
						{snp && <p className="text-xs text-muted-foreground font-mono">{snp}</p>}
					</div>
					<DirectionBadge direction={prediction.direction} />
				</div>

				<div className="flex flex-wrap items-center gap-3 mt-3">
					<SourceBadge source={prediction.source} />
					<ConfidenceIndicator value={prediction.confidence} />
					{prediction.odds_ratio && <OddsRatioDisplay value={prediction.odds_ratio} />}
					{prediction.p_value && (
						<span className="text-xs text-muted-foreground font-mono">
							p={prediction.p_value.toExponential(1)}
						</span>
					)}
				</div>

				{prediction.pred_id && (
					<a
						href={`https://pubmed.ncbi.nlm.nih.gov/${prediction.pred_id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2"
					>
						<ExternalLink className="h-3 w-3" />
						View on PubMed
					</a>
				)}
			</CardContent>
		</Card>
	);
}
