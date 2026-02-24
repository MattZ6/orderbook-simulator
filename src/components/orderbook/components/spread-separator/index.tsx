import { Text, View } from "react-native";

import { Skeleton } from "@/components/skeleton";
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

function formatPercent(value: number) {
	return Intl.NumberFormat("en-us", {
		style: "percent",
		maximumFractionDigits: 3,
	}).format(value / 100);
}

export function SpreadSeparator() {
	const isBookLoading = useNewMarketStore((s) => s.isBookLoading);
	const isLoading = useDelayedLoading(isBookLoading, 300);

	const spread = useNewMarketStore((s) => s.book?.spread);
	const spreadPercent = useNewMarketStore((s) => s.book?.spreadPercent);

	return (
		<View style={styles.container}>
			<View style={styles.slot}>
				<Skeleton
					skeletonWidth="70%"
					skeletonHeight={14}
					isContentVisible={!isLoading}
					style={{ alignSelf: "flex-end" }}
				>
					<Text style={styles.text}>Spread</Text>
				</Skeleton>
			</View>
			<View style={styles.slot}>
				<Skeleton
					skeletonWidth="80%"
					skeletonHeight={14}
					isContentVisible={!isLoading}
					style={{ alignSelf: "center" }}
				>
					<Text style={[styles.text, styles.spreadPrice]}>
						{formatPrice(spread ?? 0)}
					</Text>
				</Skeleton>
			</View>
			<View style={styles.slot}>
				<Skeleton
					skeletonWidth="70%"
					skeletonHeight={14}
					isContentVisible={!isLoading}
					style={{ alignSelf: "flex-start" }}
				>
					<Text style={styles.text}>({formatPercent(spreadPercent ?? 0)})</Text>
				</Skeleton>
			</View>
		</View>
	);
}
