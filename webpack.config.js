/*
	Copyright (c) 2022 Skyflow, Inc. 
*/
const path = require("path");
module.exports = {
    mode: "production",
    entry:'./src/index.ts',
    output: { path: path.resolve(__dirname, "dist") },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
            },
        ]
    },
    stats: {
        errorDetails: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },


};