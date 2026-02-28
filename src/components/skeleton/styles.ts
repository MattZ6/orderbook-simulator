import { StyleSheet } from "react-native";

import { theme } from "@/themes/theme";

export const skeletonBlockStyles = StyleSheet.create({
	base: {
		backgroundColor: theme.colors.surface.skeleton,
		borderRadius: theme.radii["2"],
	},
});

export const styles = StyleSheet.create({
	base: {
		position: "absolute",
		...skeletonBlockStyles.base,
	},
});
