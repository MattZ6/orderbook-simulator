import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		overflow: "hidden",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,

		paddingHorizontal: 16,

		marginBottom: 12,
	},
});
