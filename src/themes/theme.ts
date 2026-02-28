import { colors } from "./semantic/colors";
import { shape } from "./semantic/shape";
import { fontSizes, fontWeight } from "./semantic/text";

import { palette } from "./tokens/pallete";
import { radii } from "./tokens/radii";
import { spacing } from "./tokens/spacing";
import { typography } from "./tokens/typography";

export const theme = {
	colors,
	shape,
	fontSizes,
	fontWeight,
	palette,
	radii,
	spacing,
	typography,
} as const;

export type Theme = typeof theme;
