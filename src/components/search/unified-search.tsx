"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dna, UtensilsCrossed, FlaskConical, HeartPulse, ArrowRight, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { apiClient } from "@/api/axios";

interface Suggestion {
	value: string;
	label: string;
	type: "snp" | "gene" | "disease" | "food";
	count: number;
}

const typeIcons = {
	snp: Dna,
	gene: FlaskConical,
	disease: HeartPulse,
	food: UtensilsCrossed,
};

const typeColors = {
	snp: "text-blue-600",
	gene: "text-purple-600",
	disease: "text-red-500",
	food: "text-green-600",
};

const typeLabels = {
	snp: "SNP",
	gene: "Gene",
	disease: "Disease",
	food: "Food",
};

interface UnifiedSearchProps {
	size?: "default" | "large";
	className?: string;
	autoFocus?: boolean;
}

export function UnifiedSearch({ size = "default", className = "", autoFocus = false }: UnifiedSearchProps) {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [loading, setLoading] = useState(false);
	const debouncedQuery = useDebounce(query, 300);
	const router = useRouter();

	useEffect(() => {
		if (debouncedQuery.length < 2) {
			setSuggestions([]);
			return;
		}

		setLoading(true);
		apiClient.get(`/suggest?q=${encodeURIComponent(debouncedQuery)}`)
			.then(res => setSuggestions(res.data.suggestions ?? []))
			.catch(() => setSuggestions([]))
			.finally(() => setLoading(false));
	}, [debouncedQuery]);

	const navigate = useCallback((type: string, value: string) => {
		if (!value.trim()) return;
		const encoded = encodeURIComponent(value.trim());
		if (type === "snp") router.push(`/snp/${encoded}`);
		else if (type === "gene") router.push(`/gene/${encoded}`);
		else if (type === "disease") router.push(`/disease/${encoded}`);
		else router.push(`/food/${encoded}`);
	}, [router]);

	const handleSelect = useCallback((value: string) => {
		const [type, ...rest] = value.split(":");
		navigate(type, rest.join(":"));
	}, [navigate]);

	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key === "Enter" && query.trim()) {
			// Auto-detect type
			const q = query.trim();
			if (/^rs\d+$/i.test(q)) navigate("snp", q);
			else if (/^[A-Z][A-Z0-9]{1,9}$/.test(q)) navigate("gene", q);
			else navigate("food", q);
		}
	}, [query, navigate]);

	const isLarge = size === "large";

	// Group suggestions by type
	const grouped = suggestions.reduce<Record<string, Suggestion[]>>((acc, s) => {
		if (!acc[s.type]) acc[s.type] = [];
		acc[s.type].push(s);
		return acc;
	}, {});

	return (
		<Command className={`border rounded-xl bg-white shadow-md ${isLarge ? "max-w-2xl" : "max-w-lg"} ${className}`}>
			<CommandInput
				placeholder="Search SNPs, genes, foods, or diseases..."
				value={query}
				onValueChange={setQuery}
				onKeyDown={handleKeyDown}
				autoFocus={autoFocus}
				className={isLarge ? "h-14 text-lg" : "h-10"}
			/>
			<CommandList>
				{query.length >= 2 && (
					<>
						{loading && (
							<div className="flex items-center justify-center py-4 text-muted-foreground">
								<Loader2 className="h-4 w-4 animate-spin mr-2" />
								<span className="text-sm">Searching...</span>
							</div>
						)}

						{!loading && suggestions.length === 0 && (
							<CommandEmpty>
								<div className="py-4 text-center text-muted-foreground">
									<p className="text-sm">No results found for &quot;{query}&quot;</p>
									<p className="text-xs mt-1">Press Enter to search anyway</p>
								</div>
							</CommandEmpty>
						)}

						{Object.entries(grouped).map(([type, items]) => {
							const Icon = typeIcons[type as keyof typeof typeIcons] ?? Dna;
							const label = typeLabels[type as keyof typeof typeLabels] ?? type;
							return (
								<CommandGroup key={type} heading={label}>
									{items.map((item) => (
										<CommandItem
											key={`${item.type}:${item.value}`}
											value={`${item.type}:${item.value}`}
											onSelect={handleSelect}
										>
											<Icon className={`mr-2 h-4 w-4 ${typeColors[item.type as keyof typeof typeColors]}`} />
											<span className={item.type === "snp" ? "font-mono" : item.type === "gene" ? "font-semibold" : ""}>
												{item.label}
											</span>
											<span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
												{item.count > 0 && <span>{item.count}</span>}
												<ArrowRight className="h-3 w-3" />
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							);
						})}
					</>
				)}
			</CommandList>
		</Command>
	);
}
