const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[main].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  devtool: "source-map",
  // watch: true,
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebPackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    open: true,
    static: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
  },
};
