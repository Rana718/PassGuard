/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E1A47",
        secondary: "#3B82F6",
        accent: "#FF8800",
        background: "#1A1B41",
        text: "#D6D6D6",
      },
    },
  },
  plugins: [],
};
