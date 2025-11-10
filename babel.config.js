module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Añade este plugin al final
      'nativewind/babel',
    ],
  };
};