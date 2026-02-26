import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		height: 34,
	},
	bidSkeleton: {
		backgroundColor: theme.colors.background.positive,
	},
	askSkeleton: {
		backgroundColor: theme.colors.background.negative,
	},
	slot: {
		flex: 1,
		paddingHorizontal: 16,
		justifyContent: "center",
	},
	slotRight: {
		alignItems: "flex-end",
	},
});
