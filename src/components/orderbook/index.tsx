import { View } from "react-native";

import { Asks } from "./components/asks";
import { Bids } from "./components/bids";
import { Header } from "./components/header";
import { SpreadSeparator } from "./components/spread-separator";
import { TickSizeSwitcher } from "./components/tick-size-switcher";
import { ViewTypeSwitcher } from "./components/view-type-switcher";

import { styles } from "./styles";

export function Orderbook() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TickSizeSwitcher />
				<ViewTypeSwitcher />
			</View>

			<Header />

			<Asks />

			<SpreadSeparator />

			<Bids />
		</View>
	);
}
