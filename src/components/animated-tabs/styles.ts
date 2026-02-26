import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	wrapper: {
		padding: 8,
	},

	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: theme.colors.background.default,
		padding: 4,
		borderRadius: 12,

		position: "relative",
		overflow: "hidden",
	},

	button: {
		flex: 1,
		height: 40,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		fontWeight: "600",
		fontSize: 16,
		color: theme.colors.text.muted,
		textAlign: "center",
	},

	textActive: {
		color: theme.colors.text.primary,
	},

	activeBackground: {
		position: "absolute",
		backgroundColor: theme.colors.background.primaryMuted,
		borderRadius: 8,
		height: 40,
		top: 4,
		left: 4,
	},
});
