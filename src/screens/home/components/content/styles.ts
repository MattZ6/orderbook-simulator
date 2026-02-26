import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		gap: theme.spacing["3"],

		borderRadius: 18,
		backgroundColor: theme.colors.background.card,

		marginTop: theme.spacing["4"],
	},
});
