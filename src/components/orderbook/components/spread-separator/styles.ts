import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",

		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#222222",
	},
	slot: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
		height: 44,
	},
	spreadPrice: {
		fontSize: 14,
		color: "#e8e3db",
	},
	text: {
		fontSize: 12,
		lineHeight: 20,
		color: "#606563",
		textAlign: "center",
		textTransform: "uppercase",
	},
});
