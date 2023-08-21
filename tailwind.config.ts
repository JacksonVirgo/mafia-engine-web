import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        chalkboard: "url('/public/chalkboard.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
