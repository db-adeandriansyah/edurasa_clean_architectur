const path = require('path');
const mainConfig = require('./webpack.config');
const {merge} = require('webpack-merge')
module.exports = merge(mainConfig,{
    mode:'development',
    devtool: 'inline-source-map',//false ,//'inline-source-map',
    devServer:{
        
        static:{
            directory:path.join(__dirname,'src')
        },
        port:3055,
        liveReload:true,
        compress: true,
        hot:true,
        client:{
            overlay:false,
        }
    }
})