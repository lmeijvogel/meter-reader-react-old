const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle-[hash].js",
        path: __dirname + "/dist/",
        publicPath: "/",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /.jsx?$|.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"],
                },
            },
            {
                test: /.css$/,
                loader: "style-loader!css-loader",
            },
        ],
    },
    optimization: {
      minimize: true
    },
    plugins: [
        new CleanWebpackPlugin({
            paths: ["./dist"],
            exclude: ["login.html"],
            verbose: false,
            dry: false,
        }),
        new webpack.DefinePlugin({
            // <-- key to reducing React's size
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
        new HtmlWebpackPlugin({
            inject: false,
            template: require("html-webpack-template"),

            title: "Energie",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
            appMountId: "app",
        }),
    ],

    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ".json"],
    },
};
