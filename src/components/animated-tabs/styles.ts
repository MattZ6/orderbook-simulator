import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	wrapper: {
		padding: 8,
	},

	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#111111",
		padding: 4,
		borderRadius: 12,

		position: "relative",
		overflow: "hidden",
	},

	button: {
		flex: 1,
		height: 40,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		fontWeight: "600",
		fontSize: 16,
		color: "#545857",
		textAlign: "center",
	},

	textActive: {
		color: "#37cc81",
	},

	activeBackground: {
		position: "absolute",
		backgroundColor: "#2c3532",
		borderRadius: 8,
		height: 40,
		top: 4,
		left: 4,
	},
});
