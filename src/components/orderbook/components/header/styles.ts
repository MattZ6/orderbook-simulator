import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.border.default,
	},
	slot: {
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: theme.spacing["4"],
		paddingVertical: theme.spacing["3"],
	},
	lasSlot: {
		justifyContent: "flex-end",
	},
	label: {
		color: theme.colors.content.secondary,
		textTransform: "uppercase",
	},
	lastLabel: {
		textAlign: "right",
	},
});
