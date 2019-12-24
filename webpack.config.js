const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        chunkFilename: 'js/[name].[hash].bundle.js',
        path: path.join( __dirname, 'dist' ),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        } )
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx'],
      },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
		loader: require.resolve('babel-loader')
            },
            {
                test:/\.s?css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
	    {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader?name=img/[name].[ext]']
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                    chunks: 'all',
                enforce: true
              },
            },
          },
    }
}