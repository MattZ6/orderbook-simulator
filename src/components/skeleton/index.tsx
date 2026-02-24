import { type ReactNode, useEffect } from "react";
import { View, type ViewProps } from "react-native";
import Animated, {
	type AnimatedProps,
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { skeletonBlockStyles, styles } from "./styles";

type Props = AnimatedProps<ViewProps> & {
	skeletonWidth: number | `${number}%`;
	skeletonHeight: number | `${number}%`;
	isContentVisible?: boolean;
	children?: ReactNode;
};

export function Skeleton({
	skeletonWidth,
	skeletonHeight,
	style,
	isContentVisible = false,
	children,
	...props
}: Props) {
	const shimmer = useSharedValue(0.4);
	const skeletonOpacity = useSharedValue(0);
	const contentOpacity = useSharedValue(0);

	const skeletonAnimatedStyle = useAnimatedStyle(() => ({
		opacity: shimmer.value * skeletonOpacity.value,
	}));

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		opacity: contentOpacity.value,
	}));

	useEffect(() => {
		if (isContentVisible) {
			skeletonOpacity.value = withTiming(0, { duration: 250 });
			contentOpacity.value = withTiming(1, { duration: 250 });

			cancelAnimation(shimmer);
		} else {
			skeletonOpacity.value = withTiming(1, { duration: 200 });
			contentOpacity.value = withTiming(0, { duration: 200 });

			shimmer.value = withRepeat(withTiming(0.8, { duration: 900 }), -1, true);
		}
	}, [isContentVisible, contentOpacity, skeletonOpacity, shimmer]);

	return (
		<View>
			<Animated.View
				pointerEvents="none"
				style={[
					styles.base,
					{ width: skeletonWidth, height: skeletonHeight },
					style,
					skeletonAnimatedStyle,
				]}
				{...props}
			/>
			{children && (
				<Animated.View
					pointerEvents={isContentVisible ? "auto" : "none"}
					style={contentAnimatedStyle}
				>
					{children}
				</Animated.View>
			)}
		</View>
	);
}

type SkeletonBlockProps = Pick<AnimatedProps<ViewProps>, "style"> & {
	width: number | `${number}%`;
	height: number | `${number}%`;
};

export function SkeletonBlock({
	width,
	height,
	style,
	...props
}: SkeletonBlockProps) {
	const shimmer = useSharedValue(0.4);
	const opacity = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: shimmer.value * opacity.value,
	}));

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 200 });

		shimmer.value = withRepeat(withTiming(0.8, { duration: 900 }), -1, true);
	}, [opacity, shimmer]);

	return (
		<Animated.View
			pointerEvents="none"
			style={[
				skeletonBlockStyles.base,
				{ width, height },
				style,
				animatedStyle,
			]}
			{...props}
		/>
	);
}
