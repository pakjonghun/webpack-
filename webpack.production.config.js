const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    index2: "./src/index2.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "dist"),
    publicPath: "../",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10,
    },
  },
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
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "origin",
      filename: "sub/iiinnndddeeexxx.html",
      chunks: ["index"],
      meta: {
        description: "desc",
      },
      minify: false,
    }),
    new HtmlWebpackPlugin({
      title: "origin2",
      chunks: ["index2"],
      filename: "sub/index.html",
      meta: {
        description: "desc2",
      },
      minify: false,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(__dirname, "build/**/*"),
      ],
    }),
  ],
};
