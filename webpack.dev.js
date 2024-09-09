const {merge} = require("webpack-merge");
const commonConfig= require("./webpack.common.js");

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/index.html"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset/resource"
            }
        ]
    }
})