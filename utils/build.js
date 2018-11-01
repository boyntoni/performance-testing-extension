const config = require("../webpack.config");
const webpack = require("webpack");

delete config.chromeExtensionBoilerplate;

webpack(config, (err) => { if (err) throw err; });
