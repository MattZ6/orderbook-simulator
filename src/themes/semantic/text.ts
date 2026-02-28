import { typography } from "../tokens/typography";

export const fontSizes = {
	label: typography["1"],
	bodySmall: typography["2"],
	body: typography["3"],
	subtitle: typography["4"],
	title: typography["5"],
};

export const fontWeight = {
	regular: {
		fontWeight: "400",
	},
	semiBold: {
		fontWeight: "600",
	},
	bold: {
		fontWeight: "700",
	},
} as const;

export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeight;
