import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",

		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: theme.colors.border.default,
	},
	slot: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: theme.spacing["4"],
		height: 44,
	},
	spreadPrice: {
		color: theme.colors.text.foreground,
	},
	text: {
		color: theme.colors.text.muted,
		textAlign: "center",
		textTransform: "uppercase",
	},
});
