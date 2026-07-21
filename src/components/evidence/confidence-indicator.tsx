import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ConfidenceIndicatorProps {
	value: number;
	showLabel?: boolean;
	className?: string;
}

export function ConfidenceIndicator({ value, showLabel = true, className }: ConfidenceIndicatorProps) {
	const pct = Math.round(value * 100);
	const color = pct >= 80 ? "text-green-700" : pct >= 50 ? "text-yellow-700" : "text-red-700";
	const barColor = pct >= 80 ? "[&>div]:bg-green-500" : pct >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500";

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Progress value={pct} className={cn("h-2 w-16 bg-gray-100", barColor)} />
			{showLabel && <span className={cn("text-xs font-medium", color)}>{pct}%</span>}
		</div>
	);
}
