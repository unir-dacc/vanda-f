import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ConfidenceIndicatorProps {
	value: number;
	showLabel?: boolean;
	className?: string;
}

export function ConfidenceIndicator({ value, showLabel = true, className }: ConfidenceIndicatorProps) {
	const pct = Math.round(value * 100);
	const color = value >= 0.8 ? "text-green-700" : value >= 0.5 ? "text-yellow-700" : "text-red-700";
	const barColor = value >= 0.8 ? "[&>div]:bg-green-500" : value >= 0.5 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500";

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Progress value={pct} className={cn("h-2 w-20 bg-gray-100", barColor)} />
			{showLabel && <span className={cn("text-xs font-mono font-medium", color)}>{value.toFixed(2)}</span>}
		</div>
	);
}
