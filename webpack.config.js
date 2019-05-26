const resolve = path => require('path').resolve(__dirname, path);

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: resolve('./src/cube.ts'),
    output: {
        filename: 'cube.js',
        path: resolve('./dist'),
        library: 'Cube',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
        ]
    }
};
