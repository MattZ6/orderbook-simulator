import FeatherIcon from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { Platform, Pressable, Text } from "react-native";

import { DEFAULT_HIT_SLOP } from "@/config/ui";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

function triggerTapHaptic() {
	if (Platform.OS === "android") {
		Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick);
	} else {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}
}

export function TickSize() {
	const tickSize = useNewMarketStore((s) => s.tickSize);
	const availableTickSizes = useNewMarketStore((s) => s.availableTickSizes);
	const setTickSize = useNewMarketStore((s) => s.setTickSize);

	const handleChangeTickSize = useCallback(() => {
		const index = availableTickSizes.indexOf(tickSize);
		const newTickSizeIndex =
			index + 1 > availableTickSizes.length - 1 ? 0 : index + 1;
		const newTickSize = availableTickSizes[newTickSizeIndex];

		setTickSize(newTickSize);
		triggerTapHaptic();
	}, [tickSize, availableTickSizes, setTickSize]);

	return (
		<Pressable
			style={styles.button}
			onPress={handleChangeTickSize}
			hitSlop={DEFAULT_HIT_SLOP}
		>
			<Text style={styles.text}>{tickSize}</Text>
			<FeatherIcon name="chevron-down" size={14} style={styles.icon} />
		</Pressable>
	);
}
