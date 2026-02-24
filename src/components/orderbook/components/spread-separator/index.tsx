import { SkeletonBlock } from "@/components/skeleton";
import { LOADING_DELAY_IN_MS } from "@/config/ui";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";
import { useNewMarketStore } from "@/store/market/market.store";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { styles } from "./styles";

function formatPrice(value: number) {
	let fractionDigits = 0;

	if (value < 1) {
		fractionDigits = 3;
	}

	return Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits,
	}).format(value);
}

function formatPercent(value: number) {
	return Intl.NumberFormat("en-us", {
		style: "percent",
		maximumFractionDigits: 3,
	}).format(value / 100);
}

export function SpreadSeparator() {
	const isBookLoading = useNewMarketStore((s) => s.isBookLoading);
	const isLoading = useDelayedLoading(isBookLoading, LOADING_DELAY_IN_MS);

	const spread = useNewMarketStore((s) => s.book?.spread);
	const spreadPercent = useNewMarketStore((s) => s.book?.spreadPercent);

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
				<Text style={styles.text}>Spread</Text>
			</View>
			<View style={styles.slot}>
				<Text style={[styles.text, styles.spreadPrice]}>
					{formatPrice(spread ?? 0)}
				</Text>
			</View>
			<View style={styles.slot}>
				<Text style={styles.text}>({formatPercent(spreadPercent ?? 0)})</Text>
			</View>
		</Animated.View>
	);
}
