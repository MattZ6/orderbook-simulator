import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	header: {
		borderRadius: 18,
		backgroundColor: "#171717",
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
		borderTopColor: "#222222",

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

		borderColor: "#222222",
	},
	lastField: {
		alignItems: "flex-end",
	},
	label: {
		fontSize: 12,
		color: "#5c5e5d",
		textTransform: "uppercase",
	},
});
