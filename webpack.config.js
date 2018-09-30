var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                loader: "style-loader"
            },
            {
                test: /\.css$/,
                loader: "css-loader",
                query: {
                    camelCase: true,
                    modules: true,
                    localIdentName: "[name]__[local]___[hash:base64:5]"
                }
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./node_modules/react/umd/react.production.min.js",
                to: "./react.production.min.js"
            },
            {
                from: "./node_modules/react-dom/umd/react-dom.production.min.js",
                to: "./react-dom.production.min.js"
            },
            {
                from: "./node_modules/react-bootstrap/dist/react-bootstrap.min.js",
                to: "./react-bootstrap.min.js"
            }
        ])
    ]
};
