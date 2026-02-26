import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	skeleton: {
		right: 0,
	},
	value: {
		fontWeight: "600",
		color: theme.colors.text.foreground,
	},
});
