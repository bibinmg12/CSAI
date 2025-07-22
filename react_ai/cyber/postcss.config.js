// module.exports = {
//   plugins: [
//     require('@tailwindcss/postcss')(), // ✅ NEW plugin
//     require('autoprefixer'),
//   ],
// };

// postcss.config.js for Tailwind v3
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};