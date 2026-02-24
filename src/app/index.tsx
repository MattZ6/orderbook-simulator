import { StyleSheet, Text, View } from "react-native";

import { Header } from "@/components/header";
import { Orderbook } from "@/components/orderbook";

import { useMarketController } from "@/hooks/use-market-controller";
import { useNewMarketStore } from "@/store/market/market.store";

export default function TradeSurface() {
	useMarketController();

	return (
		<View style={styles.container}>
			<Header />

			<ConnectionStatus />

			<View style={styles.contentBlock}>
				<View style={styles.contentBlockHeader}>
					<View style={styles.contentBlockHeaderToggle}>
						<View
							style={[
								styles.contentBlockHeaderButton,
								styles.contentBlockHeaderButtonActive,
							]}
						>
							<Text
								style={[
									styles.contentBlockHeaderButtonText,
									styles.contentBlockHeaderButtonTextActive,
								]}
							>
								Orderbook
							</Text>
						</View>
						<View style={styles.contentBlockHeaderButton}>
							<Text style={styles.contentBlockHeaderButtonText}>Trades</Text>
						</View>
					</View>
				</View>

				<Orderbook />
			</View>
		</View>
	);
}

function ConnectionStatus() {
	const connectionStatus = useNewMarketStore((s) => s.connectionStatus);

	return (
		<Text style={{ color: "white", paddingHorizontal: 16, fontSize: 20 }}>
			{connectionStatus}
		</Text>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0a0a0a",
		paddingTop: 60,
		paddingHorizontal: 16,
	},
	contentBlock: {
		gap: 12,

		borderRadius: 18,
		backgroundColor: "#171717",

		marginTop: 16,
	},
	contentBlockHeader: {
		flexDirection: "row",
		padding: 8,
	},
	contentBlockHeaderToggle: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#111111",
		padding: 4,
		borderRadius: 12,
	},
	contentBlockHeaderButton: {
		flex: 1,
		backgroundColor: "#111111",
		height: 40,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	contentBlockHeaderButtonText: {
		fontWeight: "600",
		fontSize: 16,
		color: "#545857",
		textAlign: "center",
	},
	contentBlockHeaderButtonActive: {
		backgroundColor: "#2c3532",
	},
	contentBlockHeaderButtonTextActive: {
		color: "#37cc81",
	},
});
