const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// *** File rules *** //
const rules = [];

// Scripts
rules.push({
	test: /\.js?$/,
	use: {
		loader: "babel-loader",
		options: {
			compact: false,
		},
	},
});

// *** Plugins *** //
const plugins = [];

// Don't output anything on an error
plugins.push(new webpack.NoEmitOnErrorsPlugin());

// Remove moment's locale code to keep it small
plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

// Give us a good ol' index.html
plugins.push(new HtmlWebpackPlugin({
	template: "./src/index.ejs",
}));

// Allow HMR
plugins.push(new webpack.HotModuleReplacementPlugin());
// Give modules proper names for debugging
plugins.push(new webpack.NamedModulesPlugin());



// *** Final Config *** //
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.[hash:8].js",
		publicPath: "/",
	},
	resolve: {
		modules: ["node_modules", path.resolve(__dirname, "src")],
		extensions: [".js"],
	},
	module: {
		rules,
	},
	plugins,
	devtool: "eval-source-map",
	devServer: {
		port: process.env.PORT || 3000,
		hot: true,
		overlay: true,
		historyApiFallback: true,
	},
};
