import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DirectionBadgeProps {
	direction: string;
	className?: string;
}

const config = {
	beneficial: {
		label: "Beneficial",
		icon: ShieldCheck,
		className: "bg-green-50 text-green-800 border-green-200",
	},
	harmful: {
		label: "Harmful",
		icon: ShieldAlert,
		className: "bg-red-50 text-red-800 border-red-200",
	},
	neutral: {
		label: "Neutral",
		icon: Minus,
		className: "bg-gray-50 text-gray-700 border-gray-200",
	},
} as const;

export function DirectionBadge({ direction, className }: DirectionBadgeProps) {
	const c = config[direction as keyof typeof config] ?? config.neutral;
	const Icon = c.icon;

	return (
		<Badge variant="outline" className={cn("gap-1 text-xs font-medium", c.className, className)}>
			<Icon className="h-3 w-3" />
			{c.label}
		</Badge>
	);
}
