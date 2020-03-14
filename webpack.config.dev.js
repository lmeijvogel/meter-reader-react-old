var path = require("path");
var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /.jsx?$|.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: require("html-webpack-template"),

            title: "Energie (dev)",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
            appMountId: "app",
        }),
        new CheckerPlugin(),
    ],

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ".json"],
    },
};
