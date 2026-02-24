import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	type LayoutChangeEvent,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import Animated, {
	interpolateColor,
	type SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type SegmentedContextType<T> = {
	value: T;
	onChange: (value: T) => void;
	register: (value: string) => number;
	animatedIndex: SharedValue<number>;
};

const SegmentedContext = createContext<SegmentedContextType<T> | null>(null);

type RootProps<T> = {
	value: T;
	onChange: (value: T) => void;
	children: ReactNode;
};

function Root<T>({ value, onChange, children }: RootProps<T>) {
	const [width, setWidth] = useState(0);
	const [values, setValues] = useState<T[]>([]);

	const animatedIndex = useSharedValue(0);

	useEffect(() => {
		const index = values.indexOf(value);
		if (index !== -1) {
			animatedIndex.value = withTiming(index, { duration: 250 });
		}
	}, [value, values, animatedIndex]);

	const register = useCallback(
		(val: T) => {
			setValues((prev) => {
				if (prev.includes(val)) {
					return prev;
				}

				return [...prev, val];
			});
			return values.indexOf(val);
		},
		[values.indexOf],
	);

	const handleLayout = (e: LayoutChangeEvent) => {
		setWidth(e.nativeEvent.layout.width);
	};

	const contextValue = useMemo(
		() => ({
			value,
			onChange,
			register,
			animatedIndex,
		}),
		[value, onChange, animatedIndex, register],
	);

	const tabWidth = width / values.length || 0;

	const backgroundStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: animatedIndex.value * tabWidth }],
	}));

	return (
		<SegmentedContext.Provider value={contextValue}>
			<View style={styles.container} onLayout={handleLayout}>
				<Animated.View
					style={[
						styles.activeBackground,
						{ width: tabWidth },
						backgroundStyle,
					]}
				/>
				{children}
			</View>
		</SegmentedContext.Provider>
	);
}

type ItemProps = {
	value: string;
	children: ReactNode;
};

function Item({ value, children }: ItemProps) {
	const context = useContext(SegmentedContext);
	if (!context) {
		throw Error(
			"SegmentedControl.Item must be used inside of a SegmentedControl.Root",
		);
	}

	const { value: activeValue, onChange, register } = context;

	const [, setIndex] = useState<number | null>(null);
	useEffect(() => {
		const idx = register(value);
		setIndex(idx);
	}, [register, value]);

	const progress = useSharedValue(0);

	useEffect(() => {
		progress.value = withTiming(activeValue === value ? 1 : 0, {
			duration: 200,
		});
	}, [activeValue, progress, value]);

	const animatedTextStyle = useAnimatedStyle(() => ({
		color: interpolateColor(progress.value, [0, 1], ["#888", "#000"]),
		transform: [
			{
				scale: progress.value === 1 ? 1 : 0.98,
			},
		],
	}));

	return (
		<Pressable style={styles.button} onPress={() => onChange(value)}>
			<Animated.Text style={[styles.text, animatedTextStyle]}>
				{children}
			</Animated.Text>
		</Pressable>
	);
}

export const SegmentedControl = Object.assign(Root, { Item });

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#1a1a1a",
		borderRadius: 10,
		overflow: "hidden",
		position: "relative",
	},
	button: {
		flex: 1,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	text: {
		fontSize: 14,
		fontWeight: "600",
	},
	activeBackground: {
		position: "absolute",
		height: "100%",
		backgroundColor: "#e8e3db",
		borderRadius: 10,
	},
});
