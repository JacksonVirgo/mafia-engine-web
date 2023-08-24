import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: ["Arvo", "serif"],
		},
		extend: {
			backgroundImage: {
				chalkboard: "url('/public/chalkboard.jpg')",
			},
			fontFamily: {
				raleway: ["Raleway", "sans-serif"],
			},
			animation: {
				grow: "spin 3s linear infinite",
			},
			height: {
				smallview: "100svh",
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
} satisfies Config;
