import {
	Text as RNText,
	type TextProps as RNTextProps,
	type StyleProp,
	type TextStyle,
} from "react-native";

import { type TextVariant, textStyles } from "@/styles/semantic/text-styles";

type Props = RNTextProps & {
	variant?: TextVariant;
	style?: StyleProp<TextStyle>;
};

export function Text({ variant = "body", style, ...rest }: Props) {
	return <RNText {...rest} style={[textStyles[variant], style]} />;
}
