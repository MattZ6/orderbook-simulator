import { View } from "react-native";

import { LOADING_DELAY_IN_MS } from "@/config/ui";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";

import { useNewMarketStore } from "@/store/market/market.store";

import { Order } from "../order";
import { OrdersSkeleton } from "../order-skeletons";

export function Bids() {
	const isBookLoading = useNewMarketStore((s) => s.isBookLoading);
	const isLoading = useDelayedLoading(isBookLoading, LOADING_DELAY_IN_MS);

	const viewType = useNewMarketStore((s) => s.viewType);
	const maxTotal = useNewMarketStore((s) => s.book?.maxAskTotal);
	const bidsFromStore = useNewMarketStore((s) => s.book?.bids);

	const bids = bidsFromStore ?? [];

	if (isLoading || !bids.length) {
		return <OrdersSkeleton type="bid" />;
	}

	return (
		<View>
			{bids.map((bid, index) => (
				<Order
					key={String(index)}
					type="bid"
					viewType={viewType}
					order={bid}
					maxTotal={maxTotal ?? 0}
				/>
			))}
		</View>
	);
}
