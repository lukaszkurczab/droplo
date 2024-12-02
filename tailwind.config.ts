import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/feature/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          bg_primary: "#FFFFFF",
          bg_secondary: "#F9FAFB",
          bg_tertiary: "#F5F5F5",
        },
        border: {
          border_primary: "#D0D5DD",
          border_secondary: "#EAECF0",
        },
        buttons: {
          button_primary: "#7F56D9",
          button_secondary: "#D6BBFB",
          button_secondary_fb: "#6941C6",
          button_secondary_fg: "#344054",
          button_tertiary_fg: "#475467",
        },
        foreground: {
          fq_quaternary: "#667085",
        },
        text: {
          text_primary: "#101828",
          text_primary_fg: "#FFFFFF",
          text_secondary: "#344054",
          text_tertiary: "#475467",
          text_placeholder: "#667085",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
