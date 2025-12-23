/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,html,js}"],
  theme: {
    extend: {
      animation: {
        'loop-scroll': 'loop-scroll 50s linear infinite',
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": { // Fixed: Added curly braces for the webkit-scrollbar rule
          display: "none",
        },
        ".no-scrollbar": { // Fixed: Added curly braces for the .no-scrollbar rule
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};