"use client";

import { I18nProvider } from "@/lib/i18n";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<I18nProvider>
			<TooltipProvider>
				{children}
			</TooltipProvider>
		</I18nProvider>
	);
}
