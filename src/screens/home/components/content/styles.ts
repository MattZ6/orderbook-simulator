import { StyleSheet } from "react-native";

import { shape } from "@/styles/semantic/shape";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		gap: theme.spacing["3"],

		borderRadius: shape.card,
		backgroundColor: theme.colors.background.card,

		marginTop: theme.spacing["4"],
	},
});
