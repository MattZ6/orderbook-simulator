import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	wrapper: {
		padding: theme.spacing["2"],
	},

	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: theme.colors.surface.base,
		padding: theme.spacing["1"],
		borderRadius: theme.radii["5"],

		position: "relative",
		overflow: "hidden",
	},

	button: {
		flex: 1,
		height: 40,
		paddingHorizontal: theme.spacing["4"],
		borderRadius: theme.shape.button,
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		color: theme.colors.content.secondary,
		textAlign: "center",
	},

	textActive: {
		color: theme.colors.content.brand,
	},

	activeBackground: {
		position: "absolute",
		backgroundColor: theme.colors.surface.brandMuted,
		borderRadius: theme.shape.button,
		height: 40,
		top: 4,
		left: 4,
	},
});
