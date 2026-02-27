import { StyleSheet } from "react-native";

import { shape } from "@/styles/semantic/shape";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing["2"],

		height: 36,
		paddingHorizontal: theme.spacing["3"],
		borderRadius: shape.button,

		backgroundColor: theme.colors.background.subtle,
	},
	text: {
		color: theme.colors.text.foreground,
	},
	icon: {
		color: theme.colors.text.muted,
	},
});
