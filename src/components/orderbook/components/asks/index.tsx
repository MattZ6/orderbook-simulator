import { View } from "react-native";

import { LOADING_DELAY_IN_MS } from "@/config/ui";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";

import { useNewMarketStore } from "@/store/market/market.store";

import { Order } from "../order";
import { OrdersSkeleton } from "../order-skeletons";

export function Asks() {
	const isBookLoading = useNewMarketStore((s) => s.isBookLoading);
	const isLoading = useDelayedLoading(isBookLoading, LOADING_DELAY_IN_MS);

	const viewType = useNewMarketStore((s) => s.viewType);
	const maxTotal = useNewMarketStore((s) => s.book?.maxAskTotal);
	const asksFromStore = useNewMarketStore((s) => s.book?.asks);

	const asks = asksFromStore ?? [];

	if (isLoading || !asks.length) {
		return <OrdersSkeleton type="ask" />;
	}

	return (
		<View>
			{asks.map((ask, index) => (
				<Order
					key={String(index)}
					type="ask"
					viewType={viewType}
					order={ask}
					maxTotal={maxTotal ?? 0}
				/>
			))}
		</View>
	);
}
