import { StyleSheet } from "react-native";

import { shape } from "@/styles/semantic/shape";
import { theme } from "@/styles/theme";
import { radii } from "@/styles/tokens/radii";

export const styles = StyleSheet.create({
	wrapper: {
		padding: theme.spacing["2"],
	},

	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: theme.colors.background.default,
		padding: theme.spacing["1"],
		borderRadius: radii["5"],

		position: "relative",
		overflow: "hidden",
	},

	button: {
		flex: 1,
		height: 40,
		paddingHorizontal: theme.spacing["4"],
		borderRadius: shape.button,
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		color: theme.colors.text.muted,
		textAlign: "center",
	},

	textActive: {
		color: theme.colors.text.primary,
	},

	activeBackground: {
		position: "absolute",
		backgroundColor: theme.colors.background.primaryMuted,
		borderRadius: shape.button,
		height: 40,
		top: 4,
		left: 4,
	},
});
