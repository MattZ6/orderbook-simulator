import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		height: 34,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		height: "100%",
	},
	slot: {
		flex: 1,
		paddingHorizontal: theme.spacing["4"],
	},
});
