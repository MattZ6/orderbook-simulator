import { View } from "react-native";

import { Asks } from "./components/asks";
import { Bids } from "./components/bids";
import { Header } from "./components/header";
import { SpreadSeparator } from "./components/spread-separator";
import { TickSize } from "./components/tick-size";
import { ViewType } from "./components/view-type";

import { styles } from "./styles";

export function Orderbook() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TickSize />
				<ViewType />
			</View>

			<Header />

			<Asks />

			<SpreadSeparator />

			<Bids />
		</View>
	);
}
