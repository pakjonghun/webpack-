const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/Users/jeonghunbag/project/basicLec/web-pack/dist/",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
    ],
  },
};
