/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,html}", // <== Update this
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000",
        secondary: "#fff",
        accent: "#2563eb",
        bgcol: "#00C5FF",
        blueCustom: "#0054F0",
        cyanCustom: "#05D2E9",
        darkBottom: "#84B1BE2E",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(84.91deg, #0054F0 -43.87%, #05D2E9 143.84%)",
        "invoice-btn-gradient":
          "linear-gradient(90.02deg, #00C5FF 0.01%, #0054F0 204.21%)",
        "diamond-gradient":
          "linear-gradient(143deg, #000000 -22%, #00a9f100 50%, #000000 120%), linear-gradient(397deg, #000000 -22%, #00a9f1 50%, #000000 120%)",
        "theme-btn-gradient":
          "linear-gradient(255.06deg, #011720 -9.73%, #046086 88.49%)",

        "custom-bgcl-gradient": `radial-gradient(130.17% 184.63% at -30.97% 127.22%, 
          rgba(0, 78, 167, 1.31) -125%, 
          rgba(0, 0, 0, 1.31) 72.38%, 
          rgba(0, 161, 231, 1.31) 213%)`,
      },
      boxShadow: {
        "custom-inset": "inset 2px 2px 4px 0px rgba(253, 253, 253, 0.38)", // #FDFDFD61 in rgba
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false, // if using custom styles
  // },
  variants: {
    extend: {
      display: ['print'],
      overflow: ['print'],
      height: ['print'],
    },
  },
};
