// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Define tus colores premium (Ej: Oro, Negro Mate, Azul Profundo)
      colors: {
        'dark-bg': '#0D1117', // Fondo oscuro principal
        'card-dark': '#161B22', // Color de tarjetas y elementos
        'accent-gold': '#D4AF37', // Dorado de acento premium
        'text-light': '#F0F6FC', // Texto claro
        'text-muted': '#8B949E', // Texto secundario
      },
    },
  },
  plugins: [],
};