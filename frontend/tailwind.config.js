module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14467B',
          light: '#1E5A9D',
          dark: '#0D2F52',
        }
      }
    }
  },
  plugins: [],
}