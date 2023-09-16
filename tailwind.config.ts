import type { Config } from "tailwindcss"
import { addDynamicIconSelectors } from "@iconify/tailwind"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ed4a3e",

        light: "#fafafd",
        dark: "#202122",
        lightBackground: "#f0f0f6",
        darkBackground: "#1c1c1d",

        border: "#71717a40",
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
}
export default config
