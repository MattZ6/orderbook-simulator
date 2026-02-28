import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		height: 34,
	},
	bidSkeleton: {
		backgroundColor: theme.colors.feedback.positive.surface,
	},
	askSkeleton: {
		backgroundColor: theme.colors.feedback.negative.surface,
	},
	slot: {
		flex: 1,
		paddingHorizontal: theme.spacing["4"],
		justifyContent: "center",
	},
	slotRight: {
		alignItems: "flex-end",
	},
});
