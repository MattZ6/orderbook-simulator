import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/ui/text";

import { LOADING_DELAY_IN_MS } from "@/config/ui";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";

import { NumberFormat } from "@/lib/number-format";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

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
			<Text variant="bodySmall" weight="semiBold" style={styles.value}>
				{NumberFormat.currency(markPrice ?? 0)}
			</Text>
		</Skeleton>
	);
}
