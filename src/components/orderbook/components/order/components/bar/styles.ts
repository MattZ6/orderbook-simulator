import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	bar: {
		height: "100%",
		position: "absolute",
		right: 0,
		top: 0,
	},
	barAsk: {
		backgroundColor: theme.colors.background.negative,
	},
	barBid: {
		backgroundColor: theme.colors.background.positive,
	},
});
