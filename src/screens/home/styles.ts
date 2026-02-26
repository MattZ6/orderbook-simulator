import { StyleSheet } from "react-native";

import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background.default,
		paddingTop: 60,
		paddingHorizontal: 16,
	},
	scrollableContent: {
		paddingBottom: 40,
	},
});
