import { StyleSheet } from "react-native";
import { shape } from "@/styles/semantic/shape";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		borderRadius: shape.card,
		backgroundColor: theme.colors.background.card,
	},
	upper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: theme.spacing["4"],

		padding: theme.spacing["4"],
	},
	bottom: {
		flexDirection: "row",
		gap: theme.spacing["2"],

		borderTopWidth: 1,
		borderTopColor: theme.colors.border.default,

		paddingVertical: theme.spacing["4"],
	},
	field: {
		flex: 1,
		gap: theme.spacing["1"],
		paddingHorizontal: theme.spacing["4"],
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
		color: theme.colors.text.muted,
		textTransform: "uppercase",
	},
});
