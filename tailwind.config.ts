import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate" // Use the correct import
import typography from "@tailwindcss/typography"

const config = {
  darkMode: "class", // Correctly set as a string
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}', // This will scan all components, including /ui and /go-club
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {}, // Your custom theme extensions from globals.css are handled automatically
  },
  plugins: [tailwindcssAnimate, typography], // Use the correct plugin variable
} satisfies Config

export default config