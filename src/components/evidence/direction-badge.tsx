import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface DirectionBadgeProps {
	direction: string;
	className?: string;
}

const config = {
	beneficial: {
		key: "direction.beneficial" as const,
		icon: ShieldCheck,
		className: "bg-green-50 text-green-800 border-green-200",
	},
	harmful: {
		key: "direction.harmful" as const,
		icon: ShieldAlert,
		className: "bg-red-50 text-red-800 border-red-200",
	},
	neutral: {
		key: "direction.neutral" as const,
		icon: Minus,
		className: "bg-gray-50 text-gray-700 border-gray-200",
	},
};

export function DirectionBadge({ direction, className }: DirectionBadgeProps) {
	const { t } = useI18n();
	const c = config[direction as keyof typeof config] ?? config.neutral;
	const Icon = c.icon;

	return (
		<Badge variant="outline" className={cn("gap-1 text-xs font-medium", c.className, className)}>
			<Icon className="h-3 w-3" />
			{t(c.key)}
		</Badge>
	);
}
