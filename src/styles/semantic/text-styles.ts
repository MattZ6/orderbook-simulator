import { typography } from "../tokens/typography";

export const textStyles = {
	label: typography["1"],
	bodySmall: typography["2"],
	body: typography["3"],
	subtitle: typography["4"],
	title: typography["5"],
};

export type TextVariant = keyof typeof textStyles;
