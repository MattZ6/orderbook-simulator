import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing["4"],
	},
	value: {
		fontWeight: "600",
		fontSize: 14,
	},
});
