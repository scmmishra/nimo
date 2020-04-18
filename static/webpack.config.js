const path = require("path");

module.exports = {
	entry: "./src/index.js",
	mode: process.env.NODE_ENV,
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "public"),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};