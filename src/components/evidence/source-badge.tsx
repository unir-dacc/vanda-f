import { Badge } from "@/components/ui/badge";
import { Star, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceBadgeProps {
	source: string | null;
	className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
	const isGWAS = source === "gwas-catalog";

	return (
		<Badge
			variant="outline"
			className={cn(
				"gap-1 text-xs font-medium",
				isGWAS
					? "bg-amber-50 text-amber-800 border-amber-200"
					: "bg-slate-50 text-slate-700 border-slate-200",
				className
			)}
		>
			{isGWAS ? <Star className="h-3 w-3" /> : <Cpu className="h-3 w-3" />}
			{isGWAS ? "GWAS Catalog" : "ML Inference"}
		</Badge>
	);
}
