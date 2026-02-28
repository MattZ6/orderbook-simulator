import Animated from "react-native-reanimated";

import {
	type FontSize,
	type FontWeight,
	fontSizes,
	fontWeight,
} from "@/themes/semantic/text";

type Props = React.ComponentProps<typeof Animated.Text> & {
	variant?: FontSize;
	weight?: FontWeight;
};

export function AnimatedText({
	variant = "body",
	weight = "regular",
	style,
	...rest
}: Props) {
	return (
		<Animated.Text
			{...rest}
			style={[fontSizes[variant], fontWeight[weight], style]}
		/>
	);
}
