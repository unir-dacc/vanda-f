import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface OddsRatioDisplayProps {
	value: number | null;
	className?: string;
}

export function OddsRatioDisplay({ value, className }: OddsRatioDisplayProps) {
	if (value === null || value === undefined) return null;

	const color = value > 1.2
		? "text-red-700 bg-red-50 border-red-200"
		: value < 0.8
			? "text-green-700 bg-green-50 border-green-200"
			: "text-gray-700 bg-gray-50 border-gray-200";

	const interpretation = value > 1.2
		? `${((value - 1) * 100).toFixed(0)}% increased risk`
		: value < 0.8
			? `${((1 - value) * 100).toFixed(0)}% reduced risk (protective)`
			: "Minimal effect";

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<span className={cn("inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-medium", color, className)}>
						OR {value.toFixed(2)}
					</span>
				</TooltipTrigger>
				<TooltipContent>
					<p className="text-sm">{interpretation}</p>
					<p className="text-xs text-muted-foreground mt-1">
						Odds Ratio: probability of outcome with variant vs without
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
