
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx",
     "./components/**/*.{js,jsx,ts,tsx}"
    ,"./screens/**/*.{js,jsx,ts,tsx}"
    , "./src/**/*.{js,jsx,ts,tsx}"
    ],
     corePlugin: {
    textOpacity: true,
  },
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}