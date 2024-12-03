import type { Config } from "tailwindcss";

export default {
  // Specify the paths to all of the template files in your project
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Scan all relevant files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include components folder
    "./pages/**/*.{js,jsx,ts,tsx}", // Include pages folder
    "./public/**/*.html", // Include static HTML files in the public folder
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: "#1d4ed8", // Primary blue
        secondary: "#9333ea", // Secondary purple
        accent: "#facc15", // Accent yellow
        neutral: "#64748b", // Neutral gray
        background: "#f9fafb", // Light background
        foreground: "#111827", // Dark text
      },
      spacing: {
        128: "32rem", // Custom spacing
        144: "36rem",
        160: "40rem",
      },
      borderRadius: {
        xl: "1rem", // Extended border radius
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)", // Custom box shadow
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Plugin for form styling
    require("@tailwindcss/typography"), // Plugin for rich text formatting
    require("@tailwindcss/aspect-ratio"), // Plugin for maintaining aspect ratios
    require("@tailwindcss/line-clamp"), // Optional: For truncating text
  ],
} satisfies Config;
