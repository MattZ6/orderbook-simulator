import * as ExpoHaptics from "expo-haptics";

export const Haptics = {
	selection() {
		ExpoHaptics.selectionAsync();
	},
};
