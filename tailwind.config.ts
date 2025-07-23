// tailwind.config.ts
import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate" // Import the plugin

const config = {
  darkMode: "class", // Changed from ["class"] to "class"
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
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
    extend: {},
  },
  plugins: [tailwindcssAnimate], // Use the imported variable
} satisfies Config

export default config