import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	bar: {
		height: "100%",
		position: "absolute",
		right: 0,
		top: 0,
	},
	barAsk: {
		backgroundColor: theme.colors.feedback.negative.surface,
	},
	barBid: {
		backgroundColor: theme.colors.feedback.positive.surface,
	},
});
