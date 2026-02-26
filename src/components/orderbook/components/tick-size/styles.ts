import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		height: 36,
		paddingHorizontal: 12,
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
