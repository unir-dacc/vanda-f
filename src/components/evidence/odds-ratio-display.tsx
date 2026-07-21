import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface OddsRatioDisplayProps {
	value: number | null;
	className?: string;
}

export function OddsRatioDisplay({ value, className }: OddsRatioDisplayProps) {
	const { t } = useI18n();

	if (value === null || value === undefined) return null;

	const color = value > 1.2
		? "text-red-700 bg-red-50 border-red-200"
		: value < 0.8
			? "text-green-700 bg-green-50 border-green-200"
			: "text-gray-700 bg-gray-50 border-gray-200";

	const pctChange = value > 1
		? `${((value - 1) * 100).toFixed(0)}% ${t("or.increased")}`
		: value < 1
			? `${((1 - value) * 100).toFixed(0)}% ${t("or.reduced")}`
			: t("or.minimal");

	return (
		<Tooltip>
			<TooltipTrigger>
				<span className={cn("inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium", color, className)}>
					{pctChange}
				</span>
			</TooltipTrigger>
			<TooltipContent>
				<p className="text-sm">Odds Ratio: {value.toFixed(2)}</p>
			</TooltipContent>
		</Tooltip>
	);
}
