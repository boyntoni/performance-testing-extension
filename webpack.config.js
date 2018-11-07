const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const options = {
    mode: "none",
    //  load all files in directory. construct an array to compile into one file
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
        rules: [
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
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/transform-runtime"],
                },
            },
            {
                test: new RegExp(`.("${fileExtensions.join("|")})$`),
                loader: "file-loader?name=[name].[ext]",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // clean the build folder
        new CleanWebpackPlugin(["build"]),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("developmemnt") }),
        new webpack.optimize.ModuleConcatenationPlugin(),
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
    ],
};

options.devtool = "cheap-module-eval-source-map";

module.exports = options;
