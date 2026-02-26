import { useState } from "react";
import { View } from "react-native";

import { AnimatedTabs } from "@/components/animated-tabs";
import { Orderbook } from "@/components/orderbook";

import { styles } from "./styles";

type Tab = "orderbook" | "trades";

export function Content() {
	const [activeTab, setActiveTab] = useState<Tab>("orderbook");

	return (
		<View style={styles.container}>
			<AnimatedTabs activeTab={activeTab} onChange={setActiveTab} />

			{activeTab === "orderbook" ? <Orderbook /> : null}
		</View>
	);
}
