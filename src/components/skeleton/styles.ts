import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
	base: {
		position: "absolute",

		backgroundColor: theme.colors.background.skeleton,
		borderRadius: 4,
	},
});

export const skeletonBlockStyles = StyleSheet.create({
	base: {
		backgroundColor: theme.colors.background.skeleton,
		borderRadius: 4,
	},
});
