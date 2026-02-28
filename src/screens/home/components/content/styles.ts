import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	container: {
		gap: theme.spacing["3"],

		borderRadius: theme.shape.card,
		backgroundColor: theme.colors.surface.elevated,

		marginTop: theme.spacing["4"],
	},
});
