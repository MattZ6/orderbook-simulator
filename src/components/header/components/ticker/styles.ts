import { StyleSheet } from "react-native";

export const TICKER_LOGO_SIZE = 28;

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	logo: {
		width: TICKER_LOGO_SIZE,
		height: TICKER_LOGO_SIZE,
		borderRadius: TICKER_LOGO_SIZE,
		backgroundColor: "#111111",
	},
	ticker: {
		fontWeight: "700",
		fontSize: 20,
		color: "#dfdfdf",
	},
	icon: {
		color: "#606563",
	},
});
