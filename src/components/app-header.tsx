"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UnifiedSearch } from "@/components/search/unified-search";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AppHeader() {
	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<>
			<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
				<div className="container mx-auto flex h-14 items-center justify-between px-4">
					<Link href="/" className="flex items-center gap-2">
						<Image src="/logo/vandaLogo.svg" alt="VANDA" width={28} height={28} />
						<span className="font-bold text-lg text-green-800">VANDA</span>
					</Link>

					<nav className="flex items-center gap-4">
						<button
							onClick={() => setSearchOpen(true)}
							className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border rounded-lg hover:bg-muted transition-colors"
						>
							<Search className="h-4 w-4" />
							<span className="hidden sm:inline">Search...</span>
							<kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
								⌘K
							</kbd>
						</button>

						<Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							About
						</Link>

						<a
							href="https://github.com/riccardoalv/vanda"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							GitHub
						</a>
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
