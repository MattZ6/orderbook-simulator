import { useEffect, useState } from "react";
import { type LayoutChangeEvent, Pressable, View } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { AnimatedText } from "@/components/ui/animated-text";

import { DEFAULT_HIT_SLOP } from "@/config/ui";

import { Haptics } from "@/services/device/haptics";

import { styles } from "./styles";

const BACKGROUND_ANIMATION_DURATION = 220;
const TEXT_ANIMATION_DURATION = 180;

type Tab = "orderbook" | "trades";

type Props = {
	activeTab: Tab;
	onChange: (tab: Tab) => void;
};

export function AnimatedTabs({ activeTab, onChange }: Props) {
	const [containerWidth, setContainerWidth] = useState(0);

	const translateX = useSharedValue(0);

	const orderbookProgress = useSharedValue(activeTab === "orderbook" ? 1 : 0);
	const tradesProgress = useSharedValue(activeTab === "trades" ? 1 : 0);

	const TAB_INDEX = activeTab === "orderbook" ? 0 : 1;

	useEffect(() => {
		if (containerWidth === 0) {
			return;
		}

		const tabWidth = containerWidth / 2;

		translateX.value = withTiming(tabWidth * TAB_INDEX, {
			duration: BACKGROUND_ANIMATION_DURATION,
		});

		orderbookProgress.value = withTiming(activeTab === "orderbook" ? 1 : 0, {
			duration: TEXT_ANIMATION_DURATION,
		});

		tradesProgress.value = withTiming(activeTab === "trades" ? 1 : 0, {
			duration: TEXT_ANIMATION_DURATION,
		});
	}, [
		TAB_INDEX,
		containerWidth,
		activeTab,
		orderbookProgress,
		tradesProgress,
		translateX,
	]);

	const animatedBackgroundStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const orderbookTextStyle = useAnimatedStyle(() => ({
		color: interpolateColor(
			orderbookProgress.value,
			[0, 1],
			["#545857", "#37cc81"],
		),
	}));

	const tradesTextStyle = useAnimatedStyle(() => ({
		color: interpolateColor(
			tradesProgress.value,
			[0, 1],
			["#545857", "#37cc81"],
		),
	}));

	const handleLayout = (e: LayoutChangeEvent) => {
		setContainerWidth(e.nativeEvent.layout.width - 8);
	};

	const handleChangeTab = (tab: Tab) => {
		Haptics.selection();
		onChange(tab);
	};

	return (
		<View style={styles.wrapper}>
			<View style={styles.container} onLayout={handleLayout}>
				<Animated.View
					style={[
						styles.activeBackground,
						{ width: containerWidth / 2 },
						animatedBackgroundStyle,
					]}
				/>

				<Pressable
					style={styles.button}
					hitSlop={{ ...DEFAULT_HIT_SLOP, right: 0 }}
					onPress={() => handleChangeTab("orderbook")}
				>
					<AnimatedText
						variant="bodySmall"
						weight="semiBold"
						style={[styles.text, orderbookTextStyle]}
					>
						Orderbook
					</AnimatedText>
				</Pressable>

				<Pressable
					style={styles.button}
					hitSlop={{ ...DEFAULT_HIT_SLOP, left: 0 }}
					onPress={() => handleChangeTab("trades")}
				>
					<AnimatedText
						variant="bodySmall"
						weight="semiBold"
						style={[styles.text, tradesTextStyle]}
					>
						Trades
					</AnimatedText>
				</Pressable>
			</View>
		</View>
	);
}
