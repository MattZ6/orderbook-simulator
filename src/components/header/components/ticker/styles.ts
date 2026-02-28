import { StyleSheet } from "react-native";
import { theme } from "@/themes/theme";

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
		backgroundColor: theme.colors.surface.base,
		borderWidth: 1,
		borderColor: theme.colors.border.default,
	},
	ticker: {
		color: theme.colors.content.primary,
	},
	icon: {
		color: theme.colors.content.secondary,
	},
});
