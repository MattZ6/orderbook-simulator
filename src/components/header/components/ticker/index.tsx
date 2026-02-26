import FeatherIcon from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { DEFAULT_HIT_SLOP } from "@/config/ui";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles, TICKER_LOGO_COLOR_MAP } from "./styles";

function triggerTapHaptic() {
	if (Platform.OS === "android") {
		Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick);
	} else {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
	}
}

export function Ticker() {
	const symbol = useNewMarketStore((s) => s.currentSymbol);
	const switchSymbol = useNewMarketStore((s) => s.switchSymbol);

	const handleToggleSymbol = useCallback(() => {
		triggerTapHaptic();
		switchSymbol(symbol === "BTC" ? "ETH" : "BTC");
	}, [symbol, switchSymbol]);

	return (
		<Pressable hitSlop={DEFAULT_HIT_SLOP} onPress={handleToggleSymbol}>
			<View style={styles.container}>
				<View
					style={[
						styles.logo,
						{ backgroundColor: TICKER_LOGO_COLOR_MAP[symbol] },
					]}
				/>
				<Text style={styles.ticker}>{symbol}</Text>
				<FeatherIcon name="chevron-down" size={20} style={styles.icon} />
			</View>
		</Pressable>
	);
}
