import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UtensilsCrossed } from "lucide-react";
import type { FoodCompound } from "@/types/api";

interface FoodCompoundsListProps {
	gene: string;
	foods: FoodCompound[];
}

export function FoodCompoundsList({ gene, foods }: FoodCompoundsListProps) {
	if (!foods.length) return null;

	return (
		<div>
			<h4 className="text-sm font-medium text-muted-foreground mb-2">
				Foods associated with gene <span className="font-semibold text-foreground">{gene}</span>
			</h4>
			<Accordion type="single" collapsible className="w-full">
				{foods.map((food, i) => (
					<AccordionItem key={i} value={`food-${i}`}>
						<AccordionTrigger className="text-sm py-2 hover:no-underline">
							<div className="flex items-center gap-2">
								<UtensilsCrossed className="h-4 w-4 text-green-600" />
								<span>{food.food}</span>
								<span className="text-xs text-muted-foreground ml-2">
									#{food.rank}
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="pl-6 text-sm text-muted-foreground">
								<p>
									Amount: <span className="font-mono font-medium text-foreground">{food.amount}</span>{" "}
									<span className="text-xs">{food.unit}</span>
								</p>
								<p className="text-xs mt-1">
									Rank #{food.rank} among foods associated with {gene}
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
