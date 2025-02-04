module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-runtime",
      [
        "module-resolver",
        {
          alias: {
            "@common": "../common",
          },
        },
      ],
    ],
  };
};
