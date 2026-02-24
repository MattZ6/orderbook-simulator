import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#222222",
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
		color: "#606563",
		textTransform: "uppercase",
	},
	lastLabel: {
		textAlign: "right",
	},
});
