const path = require("path");
const webpack = require("webpack");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "eval-cheap-module-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.(ts|tsx)$/, loader: "ts-loader" }],
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(
        __dirname,
        "./vendor/magic-wormhole.rs/wasm"
      ),
      outDir: path.resolve(__dirname, "./pkg"),
    }),
    // Have this example work in Edge which doesn't ship `TextEncoder` or
    // `TextDecoder` at this time.
    new webpack.ProvidePlugin({
      TextDecoder: ["text-encoding", "TextDecoder"],
      TextEncoder: ["text-encoding", "TextEncoder"],
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.join(__dirname, "src/public"),
      publicPath: "/",
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
