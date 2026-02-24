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
	select: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,

		height: 32,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	toggle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,

		height: 32,
		paddingHorizontal: 12,
		borderRadius: 8,

		backgroundColor: "#29302d",
	},
	toggleText: {
		textAlign: "center",
		color: "#d6dbd9",
	},
});
