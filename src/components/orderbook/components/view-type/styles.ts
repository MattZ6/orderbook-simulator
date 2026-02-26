import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,

		height: 36,
		paddingHorizontal: 12,
		borderRadius: 8,

		backgroundColor: theme.colors.background.subtle,
	},
	text: {
		color: "white",
	},
	icon: {
		color: theme.colors.text.muted,
	},
});
