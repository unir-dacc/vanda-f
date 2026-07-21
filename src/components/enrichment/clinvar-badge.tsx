import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ClinVarResponse } from "@/types/api";

const significanceConfig: Record<string, { label: string; className: string }> = {
	"pathogenic": { label: "Pathogenic", className: "bg-red-100 text-red-800 border-red-300" },
	"likely pathogenic": { label: "Likely Pathogenic", className: "bg-orange-100 text-orange-800 border-orange-300" },
	"risk factor": { label: "Risk Factor", className: "bg-amber-100 text-amber-800 border-amber-300" },
	"benign": { label: "Benign", className: "bg-green-100 text-green-800 border-green-300" },
	"likely benign": { label: "Likely Benign", className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
	"uncertain significance": { label: "VUS", className: "bg-yellow-100 text-yellow-800 border-yellow-300" },
	"drug response": { label: "Drug Response", className: "bg-blue-100 text-blue-800 border-blue-300" },
	"protective": { label: "Protective", className: "bg-teal-100 text-teal-800 border-teal-300" },
};

interface ClinVarBadgeProps {
	data: ClinVarResponse;
	className?: string;
}

export function ClinVarBadge({ data, className }: ClinVarBadgeProps) {
	const sig = data.clinical_significance?.toLowerCase() || "";
	const config = Object.entries(significanceConfig).find(([key]) => sig.includes(key));
	const { label, className: badgeClass } = config?.[1] ?? {
		label: data.clinical_significance || "Unknown",
		className: "bg-gray-100 text-gray-700 border-gray-300",
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Badge variant="outline" className={cn("text-xs font-medium", badgeClass, className)}>
						ClinVar: {label}
					</Badge>
				</TooltipTrigger>
				<TooltipContent className="max-w-xs">
					{data.conditions.length > 0 && (
						<div>
							<p className="font-medium text-xs mb-1">Associated conditions:</p>
							<ul className="text-xs space-y-0.5">
								{data.conditions.slice(0, 5).map((c, i) => (
									<li key={i}>• {c}</li>
								))}
							</ul>
						</div>
					)}
					{data.review_status && (
						<p className="text-xs text-muted-foreground mt-1">Review: {data.review_status}</p>
					)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
