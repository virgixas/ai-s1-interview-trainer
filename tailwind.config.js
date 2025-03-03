/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",    // All files in the `pages` directory
    "./src/components/**/*.{js,jsx,ts,tsx}", // All files in the `components` directory
    "./src/styles/**/*.{css,scss}",       // Any global styles under `styles`
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}

