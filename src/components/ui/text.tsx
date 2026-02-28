import {
	Text as RNText,
	type TextProps as RNTextProps,
	type StyleProp,
	type TextStyle,
} from "react-native";

import {
	type FontSize,
	type FontWeight,
	fontSizes,
	fontWeight,
} from "@/themes/semantic/text";

type Props = RNTextProps & {
	variant?: FontSize;
	weight?: FontWeight;
	style?: StyleProp<TextStyle>;
};

export function Text({
	variant = "body",
	weight = "regular",
	style,
	...rest
}: Props) {
	return (
		<RNText {...rest} style={[fontSizes[variant], fontWeight[weight], style]} />
	);
}
