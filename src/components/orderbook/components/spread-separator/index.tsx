import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { SkeletonBlock } from "@/components/skeleton";
import { Text } from "@/components/ui/text";

import { LOADING_DELAY_IN_MS } from "@/config/ui";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";

import { NumberFormat } from "@/lib/number-format";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

const SPREAD_STEP = 1_000;

export function SpreadSeparator() {
	const isBookLoading = useNewMarketStore((s) => s.isBookLoading);
	const isLoading = useDelayedLoading(isBookLoading, LOADING_DELAY_IN_MS);

	const spread = useNewMarketStore((s) => s.book?.spread);
	const spreadPercent = useNewMarketStore((s) => s.book?.spreadPercent);

	const normalizedSpread = (spread ?? 0) * SPREAD_STEP;

	if (isLoading || typeof spread !== "number") {
		return (
			<Animated.View style={styles.container} entering={FadeIn.duration(300)}>
				<View style={styles.slot}>
					<SkeletonBlock width="70%" height={14} />
				</View>
				<View style={styles.slot}>
					<SkeletonBlock width="80%" height={14} />
				</View>
				<View style={styles.slot}>
					<SkeletonBlock width="70%" height={14} />
				</View>
			</Animated.View>
		);
	}

	return (
		<Animated.View style={styles.container} entering={FadeIn.duration(300)}>
			<View style={styles.slot}>
				<Text variant="label" style={styles.text}>
					Spread
				</Text>
			</View>
			<View style={styles.slot}>
				<Text variant="bodySmall" style={[styles.text, styles.spreadPrice]}>
					{NumberFormat.currency(normalizedSpread, {
						fractionDigits: 0,
					})}
				</Text>
			</View>
			<View style={styles.slot}>
				<Text variant="label" style={styles.text}>
					({NumberFormat.percent(spreadPercent ?? 0, { fractionDigits: 3 })})
				</Text>
			</View>
		</Animated.View>
	);
}
