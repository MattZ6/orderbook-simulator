import { useEffect, useRef } from "react";
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { Skeleton } from "@/components/skeleton";
import { AnimatedText } from "@/components/ui/animated-text";

import { LOADING_DELAY_IN_MS } from "@/config/ui";

import { useDelayedLoading } from "@/hooks/use-delayed-loading";

import { useNewMarketStore } from "@/store/market/market.store";

import { theme } from "@/styles/theme";

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
		const color = interpolateColor(
			direction.value,
			[Direction.Negative, Direction.Base, Direction.Positive],
			[
				theme.colors.text.negative,
				theme.colors.text.foreground,
				theme.colors.text.positive,
			],
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
			<AnimatedText variant="subtitle" weight="semiBold" style={animatedStyle}>
				{formatPrice(midPrice ?? 0)}
			</AnimatedText>
		</Skeleton>
	);
}
