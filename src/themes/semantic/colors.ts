import { palette } from "../tokens/pallete";

export const colors = {
	surface: {
		base: palette.gray["950"],
		elevated: palette.gray["900"],
		subtle: palette.gray["800"],
		skeleton: palette.gray["700"],

		brandMuted: palette.green["950"],
	},

	content: {
		primary: palette.gray["300"],
		secondary: palette.gray["500"],

		brand: palette.green["400"],
	},

	border: {
		default: palette.gray["800"],
	},

	feedback: {
		positive: {
			content: palette.green["300"],
			surface: "rgba(92, 192, 155, 0.15)",
		},

		negative: {
			content: palette.red["400"],
			surface: "rgba(212, 75, 98, 0.15)",
		},
	},
};
