/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeColor: "#f57c00",
        bgOverlay: "rgba(0,0,0,0.15)",
        hamburgerHover: "rgba(60,64,67,.1)",
        themeDark: "#000003",
        settingPostText: "#8f8f8f",
      },
      boxShadow: {
        authenticationShadow: "0 0 10px rgba(0, 0, 0, 0.2);",
        btnAddPostShadhow: "0 1px 4px 0 rgba(60,64,67,.3)",
        userInfoShadow: "0px 3px 7px 0px rgba(0,0,0,0.5)",
      },
      screens: {
        mb: "320px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};
