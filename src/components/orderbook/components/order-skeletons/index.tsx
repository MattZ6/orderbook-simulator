import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { SkeletonBlock } from "@/components/skeleton";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

type Props = {
	type: "ask" | "bid";
};

export function OrdersSkeleton({ type }: Props) {
	const levels = useNewMarketStore((s) => s.levels);

	return (
		<Animated.View entering={FadeIn.duration(300)}>
			{Array.from({ length: levels }).map((_, i) => (
				<OrderSkeleton key={String(i)} type={type} />
			))}
		</Animated.View>
	);
}

type OrderSkeletonProps = {
	type: "ask" | "bid";
};

function OrderSkeleton({ type }: OrderSkeletonProps) {
	return (
		<View style={styles.row}>
			<View style={styles.slot}>
				<SkeletonBlock
					width="55%"
					height={14}
					style={type === "ask" ? styles.askSkeleton : styles.bidSkeleton}
				/>
			</View>
			<View style={styles.slot}>
				<SkeletonBlock width="60%" height={14} />
			</View>
			<View style={[styles.slot, styles.slotRight]}>
				<SkeletonBlock width="60%" height={14} />
			</View>
		</View>
	);
}
