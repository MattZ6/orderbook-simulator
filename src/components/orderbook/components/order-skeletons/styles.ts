import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		height: 34,
	},
	bidSkeleton: {
		backgroundColor: "rgba(92, 192, 155, 0.15)",
	},
	askSkeleton: {
		backgroundColor: "rgba(212, 75, 98, 0.15)",
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
