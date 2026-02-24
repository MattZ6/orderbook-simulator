import FeatherIcon from "@expo/vector-icons/Feather";
import { Pressable, Text } from "react-native";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

export function ViewType() {
	const ticker = useNewMarketStore((s) => s.currentSymbol);
	const viewType = useNewMarketStore((s) => s.viewType);
	const toggleViewType = useNewMarketStore((s) => s.toggleViewType);

	const label = viewType === "symbol" ? ticker : "USD";

	return (
		<Pressable
			style={styles.button}
			onPress={toggleViewType}
			hitSlop={{
				top: 16,
				bottom: 16,
				left: 16,
				right: 16,
			}}
		>
			<Text style={styles.text}>{label}</Text>
			<FeatherIcon name="refresh-cw" size={12} style={styles.icon} />
		</Pressable>
	);
}
