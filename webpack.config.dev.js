const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  devServer: {
    static: "./dist",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin({})],
};
