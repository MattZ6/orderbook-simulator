import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const TICKER_LOGO_COLOR_MAP: { [key: string]: string } = {
	BTC: "#f7931a",
	ETH: "#ffffff",
};

const SIZE = 28;

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing["2"],
	},
	logo: {
		width: SIZE,
		height: SIZE,
		borderRadius: SIZE,
		backgroundColor: theme.colors.background.default,
		borderWidth: 1,
		borderColor: theme.colors.border.default,
	},
	ticker: {
		fontWeight: "700",
		fontSize: 20,
		color: theme.colors.text.foreground,
	},
	icon: {
		color: theme.colors.text.muted,
	},
});
