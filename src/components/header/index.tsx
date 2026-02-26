import { Text, View } from "react-native";

import { Change24h } from "./components/change24h";
import { Mark } from "./components/mark";
import { Price } from "./components/price";
import { Ticker } from "./components/ticker";
import { Volume24h } from "./components/volume24h";

import { styles } from "./styles";

export function Header() {
	return (
		<View style={styles.container}>
			<View style={styles.upper}>
				<Ticker />
				<Price />
			</View>

			<View style={styles.bottom}>
				<View style={styles.field}>
					<Text style={styles.label}>24h Change</Text>
					<Change24h />
				</View>
				<View style={[styles.field, styles.middleField]}>
					<Text style={[styles.label]}>24h Volume</Text>
					<Volume24h />
				</View>
				<View style={[styles.field, styles.lastField]}>
					<Text style={styles.label}>Mark</Text>
					<Mark />
				</View>
			</View>
		</View>
	);
}
