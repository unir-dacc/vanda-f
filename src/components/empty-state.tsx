import { Card, CardContent } from "@/components/ui/card";
import { SearchX, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
	icon?: LucideIcon;
	title: string;
	description: string;
	suggestion?: string;
	linkText?: string;
	linkHref?: string;
}

export function EmptyState({
	icon: Icon = SearchX,
	title,
	description,
	suggestion,
	linkText,
	linkHref,
}: EmptyStateProps) {
	return (
		<Card className="border-dashed">
			<CardContent className="flex flex-col items-center justify-center py-12 text-center">
				<div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
					<Icon className="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 className="text-lg font-semibold mb-1">{title}</h3>
				<p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
				{suggestion && (
					<p className="text-xs text-muted-foreground italic">{suggestion}</p>
				)}
				{linkText && linkHref && (
					<Link
						href={linkHref}
						className="mt-3 text-sm text-blue-600 hover:underline"
					>
						{linkText}
					</Link>
				)}
			</CardContent>
		</Card>
	);
}
