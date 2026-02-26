import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border.default,
	},
	slot: {
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	lasSlot: {
		justifyContent: "flex-end",
	},
	label: {
		fontSize: 12,
		lineHeight: 20,
		color: theme.colors.text.muted,
		textTransform: "uppercase",
	},
	lastLabel: {
		textAlign: "right",
	},
});
