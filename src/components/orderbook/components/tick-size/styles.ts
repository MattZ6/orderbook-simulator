import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing["1.5"],
		height: 36,
		paddingHorizontal: theme.spacing["3"],
		borderRadius: 8,
		backgroundColor: theme.colors.background.subtle,
	},
	text: {
		color: theme.colors.text.foreground,
		fontWeight: "600",
		fontSize: 13,
	},
	icon: {
		color: theme.colors.text.muted,
	},
});
