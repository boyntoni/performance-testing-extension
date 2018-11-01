const webpack = require("webpack");
const path = require("path");
const env = require("./utils/env");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const options = {
    entry: {
        background: path.join(__dirname, "src", "js", "background.js"),
        inject: path.join(__dirname, "src", "js", "inject.js"),
        content: path.join(__dirname, "src", "js", "content.js"),
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].bundle.js",
    },
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.(js)$/,
                include: path.join(__dirname, "src", "js"),
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'production'",
            },
        }),
        // clean the build folder
        new CleanWebpackPlugin(["build"]),
        // expose and write the allowed env vars on the compiled bundle
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
        }),
        new CopyWebpackPlugin([{
            from: "src/manifest.json",
            transform: (content) => {
                const contentItems = JSON.parse(content.toString());
                contentItems.description = process.env.npm_package_description;
                contentItems.version = process.env.npm_package_version;
                // generates the manifest file using the package.json informations
                return Buffer.from(JSON.stringify(contentItems));
            },
        }]),
        new WriteFilePlugin(),
    ],
};

options.devtool = "cheap-module-eval-source-map";

module.exports = options;
