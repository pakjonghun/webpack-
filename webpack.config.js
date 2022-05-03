const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(abc)/,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg)/,
        type: "asset/resource",
      },
    ],
  },
};
