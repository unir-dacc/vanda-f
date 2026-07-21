"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UnifiedSearch } from "@/components/search/unified-search";
import { useI18n } from "@/lib/i18n";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AppHeader() {
	const [searchOpen, setSearchOpen] = useState(false);
	const { locale, setLocale } = useI18n();

	return (
		<>
			<header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-800 to-emerald-700 text-white shadow-md">
				<div className="container mx-auto flex h-14 items-center justify-between px-4">
					<Link href="/" className="flex items-center gap-2">
						<Image src="/logo/vandaLogo.svg" alt="VANDA" width={28} height={28} className="brightness-0 invert" />
						<span className="font-bold text-lg">VANDA</span>
					</Link>

					<nav className="flex items-center gap-3">
						<button
							onClick={() => setSearchOpen(true)}
							className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/80 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
						>
							<Search className="h-4 w-4" />
							<span className="hidden sm:inline">Search...</span>
							<kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px]">
								⌘K
							</kbd>
						</button>

						<Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
							About
						</Link>

						<a href="https://github.com/unir-dacc/vanda" target="_blank" rel="noopener noreferrer"
							className="text-sm text-white/80 hover:text-white transition-colors">
							GitHub
						</a>

						<button
							onClick={() => setLocale(locale === "en" ? "pt" : "en")}
							className="flex items-center gap-1 px-2 py-1 text-xs text-white/80 border border-white/20 rounded hover:bg-white/10 transition-colors"
							title={locale === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
						>
							<Globe className="h-3 w-3" />
							{locale === "en" ? "PT" : "EN"}
						</button>
					</nav>
				</div>
			</header>

			<Dialog open={searchOpen} onOpenChange={setSearchOpen}>
				<DialogContent className="p-0 gap-0 max-w-2xl">
					<VisuallyHidden>
						<DialogTitle>Search</DialogTitle>
					</VisuallyHidden>
					<UnifiedSearch autoFocus />
				</DialogContent>
			</Dialog>
		</>
	);
}
