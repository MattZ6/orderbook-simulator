import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/ui/text";

import { LOADING_DELAY_IN_MS } from "@/config/ui";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

function formatPrice(value: number) {
	return Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);
}

export function Mark() {
	const isTickerLoading = useNewMarketStore((s) => s.isTickerLoading);
	const isLoading = useDelayedLoading(isTickerLoading, LOADING_DELAY_IN_MS);

	const markPrice = useNewMarketStore((s) => s.ticker?.markPrice);

	return (
		<Skeleton
			skeletonWidth={65}
			skeletonHeight={14}
			isContentVisible={!isLoading}
			style={styles.skeleton}
		>
			<Text variant="bodySmall" style={styles.value}>
				{formatPrice(markPrice ?? 0)}
			</Text>
		</Skeleton>
	);
}
