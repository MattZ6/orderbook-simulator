import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing["1.5"],
		height: 36,
		paddingHorizontal: theme.spacing["3"],
		borderRadius: theme.shape.button,
		backgroundColor: theme.colors.surface.subtle,
	},
	text: {
		color: theme.colors.content.primary,
	},
	icon: {
		color: theme.colors.content.secondary,
	},
});
