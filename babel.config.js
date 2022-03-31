const tsconfig = require("./tsconfig.json");

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@assets": "./src/assets",
            "@pages": "./src/pages",
            "@components": "./src/components",
            "@routes": "./src/routes",
            "@configs": "./src/configs",
            "@utils": "./src/utils",
            "@theme": "./src/theme",
            "@store": "./src/store",
          },
        },
      ],
    ],
  };
};
