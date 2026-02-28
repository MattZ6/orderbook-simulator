import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/ui/text";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";
import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

function formatVolume(value: number) {
	if (value >= 1_000_000_000) {
		return `$${(value / 1_000_000_000).toFixed(1)}B`;
	}

	if (value >= 1_000_000) {
		return `$${(value / 1_000_000).toFixed(1)}M`;
	}

	if (value >= 1_000) {
		return `$${(value / 1_000).toFixed(1)}K`;
	}

	return `$${value.toFixed(0)}`;
}

export function Volume24h() {
	const isTickerLoading = useNewMarketStore((s) => s.isTickerLoading);
	const isLoading = useDelayedLoading(isTickerLoading, 300);

	const volume24h = useNewMarketStore((s) => s.ticker?.volume24h);

	return (
		<Skeleton
			skeletonWidth={65}
			skeletonHeight={14}
			isContentVisible={!isLoading}
		>
			<Text variant="bodySmall" weight="semiBold" style={styles.value}>
				{formatVolume(volume24h ?? 0)}
			</Text>
		</Skeleton>
	);
}
