import { Badge } from "@/components/ui/badge";
import { Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface SourceBadgeProps {
	source: string | null;
	className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
	const { t } = useI18n();
	const isGWAS = source === "gwas-catalog";

	return (
		<Badge
			variant="outline"
			className={cn(
				"gap-1 text-xs font-medium",
				isGWAS
					? "bg-amber-50 text-amber-800 border-amber-200"
					: "bg-blue-50 text-blue-800 border-blue-200",
				className
			)}
		>
			{isGWAS ? <Star className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
			{isGWAS ? t("source.gwas") : t("source.ml")}
		</Badge>
	);
}
