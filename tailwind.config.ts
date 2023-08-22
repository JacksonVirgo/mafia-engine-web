import { type Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
		},
	},
	plugins: [],
} satisfies Config;
