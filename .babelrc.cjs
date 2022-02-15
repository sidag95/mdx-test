module.exports = function config(api) {
  api.cache(true);
  return {
    presets: [require('@babel/preset-env'), require('@babel/preset-react')],
  };
};
