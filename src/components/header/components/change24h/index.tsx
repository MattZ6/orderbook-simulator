import FeatherIcon from "@expo/vector-icons/Feather";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { Skeleton } from "@/components/skeleton";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

function formatPercent(value: number) {
	return Intl.NumberFormat("en-us", {
		style: "percent",
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		signDisplay: "exceptZero",
	}).format(value / 100);
}

enum Direction {
	Negative = -1,
	Base = 0,
	Positive = 1,
}

function getDirection(value: number): Direction {
	if (value > 0) return Direction.Positive;
	if (value < 0) return Direction.Negative;
	return Direction.Base;
}

const iconMap = {
	[Direction.Positive]: "trending-up",
	[Direction.Negative]: "trending-down",
	[Direction.Base]: "minus",
} as const;

const colorMap = {
	[Direction.Positive]: "#38a67c",
	[Direction.Negative]: "#bc263e",
	[Direction.Base]: "#c9cdcc",
} as const;

export function Change24h() {
	const isTickerLoading = useNewMarketStore((s) => s.isTickerLoading);
	const changePercent = useNewMarketStore((s) => s.ticker?.changePercent);

	const prevRef = useRef(changePercent);
	const direction = useSharedValue(Direction.Base);

	useEffect(() => {
		if (typeof changePercent !== "number") {
			return;
		}

		if (prevRef.current == null) {
			prevRef.current = changePercent;
			return;
		}

		if (changePercent === prevRef.current) return;

		direction.value = getDirection(changePercent);

		prevRef.current = changePercent;

		direction.value = withTiming(Direction.Base, {
			duration: 500,
		});
	}, [changePercent, direction]);

	const animatedStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			direction.value,
			[Direction.Negative, Direction.Base, Direction.Positive],
			[
				colorMap[Direction.Negative],
				colorMap[Direction.Base],
				colorMap[Direction.Positive],
			],
		);

		return { color };
	});

	const variation = getDirection(changePercent ?? 0);

	return (
		<Skeleton
			skeletonWidth={60}
			skeletonHeight={14}
			isContentVisible={!isTickerLoading}
		>
			<View style={styles.container}>
				<FeatherIcon
					name={iconMap[variation]}
					size={12}
					color={colorMap[variation]}
				/>
				<Animated.Text style={[styles.value, animatedStyle]}>
					{formatPercent(changePercent ?? 0)}
				</Animated.Text>
			</View>
		</Skeleton>
	);
}
