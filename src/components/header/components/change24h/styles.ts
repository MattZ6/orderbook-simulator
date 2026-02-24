import { StyleSheet } from "react-native";

export const POSITIVE_COLOR = "#38a67c";
export const NEGATIVE_COLOR = "#bc263e";
export const BASE_COLOR = "#c9cdcc";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	value: {
		fontWeight: "600",
		fontSize: 14,
	},
});
