import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	header: {
		borderRadius: 18,
		backgroundColor: theme.colors.background.card,
	},
	upper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,

		padding: 16,
	},
	bottom: {
		flexDirection: "row",
		gap: 8,

		borderTopWidth: 1,
		borderTopColor: theme.colors.border.default,

		paddingVertical: 16,
	},
	field: {
		flex: 1,
		gap: 8,
		paddingHorizontal: 16,
	},
	middleField: {
		borderLeftWidth: 1,
		borderRightWidth: 1,

		borderColor: theme.colors.border.default,
	},
	lastField: {
		alignItems: "flex-end",
	},
	label: {
		fontSize: 12,
		color: theme.colors.text.muted,
		textTransform: "uppercase",
	},
});
