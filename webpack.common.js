const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: {
    svgLoader: "./src/lib/svg-loader.js",
    index: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "ToDo",
      template: "./src/index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new FaviconsWebpackPlugin("./favicon/favicon.ico"),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            name: "[name].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
