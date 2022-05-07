const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
    courses: "./src/pages/courses.js",
    test: "./src/test.js",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["index", "test"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/courses.html",
      chunks: ["courses"],
      filename: "courses.html",
      base: "pages",
    }),
    new webpack.ProvidePlugin({
      d: "date-fns",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
