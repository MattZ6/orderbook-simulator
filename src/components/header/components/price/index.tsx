import { useEffect, useRef } from "react";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { Skeleton } from "@/components/skeleton";

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

enum Direction {
	Negative = -1,
	Base = 0,
	Positive = 1,
}

export function Price() {
	const isTickerLoading = useNewMarketStore((s) => s.isTickerLoading);
	const isLoading = useDelayedLoading(isTickerLoading, LOADING_DELAY_IN_MS);

	const midPrice = useNewMarketStore((s) => s.ticker?.midPrice);
	const prevMidPriceRef = useRef(midPrice);

	const direction = useSharedValue(Direction.Base);

	useEffect(() => {
		if (typeof midPrice !== "number") {
			return;
		}

		if (prevMidPriceRef.current == null) {
			prevMidPriceRef.current = midPrice;
			return;
		}

		const previous = prevMidPriceRef.current ?? 0;

		if (midPrice === previous) {
			return;
		}

		direction.value =
			midPrice > previous ? Direction.Positive : Direction.Negative;

		prevMidPriceRef.current = midPrice;

		direction.value = withTiming(Direction.Base, { duration: 600 });
	}, [midPrice, direction]);

	const animatedStyle = useAnimatedStyle(() => {
		const baseColor = "#dfdfdf";

		const color = interpolateColor(
			direction.value,
			[-1, 0, 1],
			["#bc263e", baseColor, "#38a67c"],
		);

		return { color };
	});

	return (
		<Skeleton
			skeletonWidth={80}
			skeletonHeight={18}
			isContentVisible={!isLoading}
			style={styles.skeleton}
		>
			<Animated.Text style={[styles.price, animatedStyle]}>
				{formatPrice(midPrice ?? 0)}
			</Animated.Text>
		</Skeleton>
	);
}
