import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AnimatedTabs } from "@/components/animated-tabs";
import { Header } from "@/components/header";
import { Orderbook } from "@/components/orderbook";

import { useMarketController } from "@/hooks/use-market-controller";

type Tab = "orderbook" | "trades";

function Content() {
	const [activeTab, setActiveTab] = useState<Tab>("orderbook");

	return (
		<View style={styles.contentBlock}>
			<AnimatedTabs activeTab={activeTab} onChange={setActiveTab} />

			{activeTab === "orderbook" ? <Orderbook /> : null}
		</View>
	);
}

export default function TradeSurface() {
	useMarketController();

	return (
		<FlatList
			style={styles.container}
			data={[]} // lista vazia
			renderItem={null}
			ListHeaderComponent={
				<>
					<Header />
					<Content />
				</>
			}
			contentContainerStyle={{ paddingBottom: 40 }}
			showsVerticalScrollIndicator={false}
		/>
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
