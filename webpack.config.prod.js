const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  module: {
    mode: "production",
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*"),
          to: path.resolve(__dirname, "dist"),
          context: "src",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      safelist: ["remain-classname"],
    }),
  ],
};
