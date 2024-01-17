const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {

    entry : './src/entries/index.js',
    output: {
        path :path.resolve(__dirname, 'dist'),
        filename:'[name].bundle.js',
        clean:true

    },
    module:{
        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }
            }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            'template':'./src/templates/index.html',
        }),
        new HtmlWebpackPlugin({
            'title':'Coba lagi',
            'template':'./src/templates/index.html',
            'favicon':'./src/assets/favicon.ico',
            'filename':'/halo/index.html'
        })
    ]

}