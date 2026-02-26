import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		overflow: "hidden",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: theme.spacing["4"],

		paddingHorizontal: theme.spacing["4"],

		marginBottom: theme.spacing["3"],
	},
});
