import FeatherIcon from "@expo/vector-icons/Feather";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

const LOGO_COLOR_MAP: { [key: string]: string } = {
	BTC: "#f7931a",
	ETH: "#ffffff",
};

export function Ticker() {
	const symbol = useNewMarketStore((s) => s.currentSymbol);
	const switchSymbol = useNewMarketStore((s) => s.switchSymbol);

	const handleToggleSymbol = useCallback(() => {
		switchSymbol(symbol === "BTC" ? "ETH" : "BTC");
	}, [symbol, switchSymbol]);

	return (
		<Pressable
			hitSlop={{
				top: 16,
				bottom: 16,
				left: 16,
				right: 16,
			}}
			onPress={handleToggleSymbol}
		>
			<View style={styles.container}>
				<View
					style={[styles.logo, { backgroundColor: LOGO_COLOR_MAP[symbol] }]}
				/>
				<Text style={styles.ticker}>{symbol}</Text>
				<FeatherIcon name="chevron-down" size={20} style={styles.icon} />
			</View>
		</Pressable>
	);
}
