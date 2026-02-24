import { Text, View } from "react-native";

import { useNewMarketStore } from "@/store/market/market.store";

import { styles } from "./styles";

export function Header() {
	const ticker = useNewMarketStore((s) => s.currentSymbol);
	const viewType = useNewMarketStore((s) => s.viewType);

	const viewTypeLabel = viewType === "symbol" ? ticker : "USD";

	return (
		<View style={styles.container}>
			<View style={styles.slot}>
				<Text style={styles.label}>Price</Text>
			</View>
			<View style={styles.slot}>
				<Text style={styles.label}>Size ({viewTypeLabel})</Text>
			</View>
			<View style={[styles.slot, styles.lasSlot]}>
				<Text style={[styles.label, styles.lastLabel]}>
					Total ({viewTypeLabel})
				</Text>
			</View>
		</View>
	);
}
