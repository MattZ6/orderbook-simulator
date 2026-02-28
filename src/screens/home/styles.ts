import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.surface.base,
	},
	scrollableContent: {
		paddingTop: 60,
		paddingHorizontal: theme.spacing["4"],
		paddingBottom: theme.spacing["4"],
	},
});
