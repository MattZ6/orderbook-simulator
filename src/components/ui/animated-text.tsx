import Animated from "react-native-reanimated";

import { type TextVariant, textStyles } from "@/styles/semantic/text-styles";

type Props = React.ComponentProps<typeof Animated.Text> & {
	variant?: TextVariant;
};

export function AnimatedText({ variant = "body", style, ...rest }: Props) {
	return <Animated.Text {...rest} style={[textStyles[variant], style]} />;
}
