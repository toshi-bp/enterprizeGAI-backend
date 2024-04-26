/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkgray: {
          100: "#afafaf",
          200: "#ababab",
          300: "#959595",
        },
        black: "#000",
        silver: {
          100: "#c1c1c1",
          200: "#b7b7b7",
        },
        snow: "#fbfafa",
        gray: {
          100: "#929292",
          200: "#878787",
        },
        lavender: "#d8e7ff",
        lightgray: {
          100: "#d4d4d4",
          200: "#d0d0d0",
        },
        mediumblue: "#192ce1",
        darkslategray: "#434343",
        whitesmoke: "#f0f0f0",
        dimgray: "#595959",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "4xs": "9px",
        "2xs": "11px",
        mini: "15px",
      },
    },
    fontSize: {
      lg: "14px",
      mini: "14px",
      xs: "12px",
      base: "12px",
      xl: "14px",
      sm: "14px",
      inherit: "inherit",
    },
    screens: {
      sm: {
        min: "530px",
      },
      ms: {
        min: "960px",
      },
      md:{
        max: "960px"
      },
      ld:{
        min:"1120px"
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
};
