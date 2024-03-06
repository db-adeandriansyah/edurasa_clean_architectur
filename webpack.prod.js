const mainConfig = require('./webpack.config');
const {merge} = require('webpack-merge')
module.exports = merge(mainConfig,{
    mode:'production',
    devtool:'nosources-source-map',
    // performance: {
    //     hints: false,
    //     maxEntrypointSize: 612000,
    //     maxAssetSize: 612000
    // }   
})