import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";
import { radii } from "@/styles/tokens/radii";

export const styles = StyleSheet.create({
	base: {
		position: "absolute",

		backgroundColor: theme.colors.background.skeleton,
		borderRadius: radii["2"],
	},
});

export const skeletonBlockStyles = StyleSheet.create({
	base: {
		backgroundColor: theme.colors.background.skeleton,
		borderRadius: radii["2"],
	},
});
