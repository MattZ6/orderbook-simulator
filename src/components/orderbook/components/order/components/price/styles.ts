import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		lineHeight: 20,
		color: theme.colors.text.foreground,
	},
	bid: {
		color: theme.colors.text.positive,
	},
	ask: {
		color: theme.colors.text.negative,
	},
});
