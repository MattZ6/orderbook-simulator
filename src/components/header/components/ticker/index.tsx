import FeatherIcon from "@expo/vector-icons/Feather";
import { useCallback } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";

import { DEFAULT_HIT_SLOP } from "@/config/ui";

import { Haptics } from "@/services/device/haptics";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles, TICKER_LOGO_COLOR_MAP } from "./styles";

export function Ticker() {
	const symbol = useNewMarketStore((s) => s.currentSymbol);
	const switchSymbol = useNewMarketStore((s) => s.switchSymbol);

	const handleToggleSymbol = useCallback(() => {
		Haptics.selection();
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
				<Text variant="title" weight="bold" style={styles.ticker}>
					{symbol}
				</Text>
				<FeatherIcon name="chevron-down" size={20} style={styles.icon} />
			</View>
		</Pressable>
	);
}
