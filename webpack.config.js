
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// const autoprefixer = require('autoprefixer')
const path = require("path");
const {EntriePoint, pagesConfig} = require("./EntriesConfig");

module.exports = {

    // entry : {
    //         'index' :{import:'./src/entries/index.js'   ,dependOn:'app'},
    //         'halo'  :{import:'./src/entries/halo.js'    ,dependOn:'app'},
    //         'app'   :{import:'./src/apps/Singleton.js'}
    //     },
    entry: EntriePoint,
    output: {
        path :path.resolve(__dirname, 'dist'),
        filename:'script/[name]-[contenthash].bundle.js',
        assetModuleFilename : 'assets/[name][ext]',
        clean:true

    },
    module:{
        rules:[
            { test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }
            },
            { test: /\.json$/, 
                type:'json'
            },
            { test: /\.(png|jpe?g|gif|webp)$/i,
                type: 'asset/resource',
            },
            { test: /\.woff2?$/,
                type: "asset/resource",
            },
            {
                mimetype: 'image/svg+xml',
                scheme: 'data',
                type: 'asset/resource',
                generator: {
                    filename: 'icons/[hash].svg'
                }
            },
            { 
                test: /\.s[ac]ss$/i,
                use: [
                // Creates `style` nodes from JS strings
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
                ],
            }
        ],
    },
    plugins:[
        ...pagesConfig.map(m=>new HtmlWebpackPlugin(m)),
        new FaviconsWebpackPlugin({
            logo:'./src/img/icons/pic72.png',
            mode:'webapp',
            devMode:'webapp',
            prefix:'/',
            cache: true,
            inject:true,
            favicons:{
                path: "/", // Path for overriding default icons path. `string`
                appName: "Edurasa 2023/2024", // Your application's name. `string`
                appShortName: "edurasa_20232024", // Your application's short_name. `string`. Optional. If not set, appName will be used
                appDescription: "Aplikasi Pembelajaran Jarak Jauh (PJJ) selama Belajar di Rumah (BDR) untuk Siswa, Guru Kelas, Guru Mata Pelajaran, Kepala Sekolah, dan Orang tua", // Your application's description. `string`
                developerName: 'Ade Andriansyah', // Your (or your developer's) name. `string`
                developerURL: 'https://www.facebook.com/syahandrianeda', // Your (or your developer's) URL. `string`
                cacheBustingQueryParam: null, // Query parameter added to all URLs that acts as a cache busting system. `string | null`
                dir: "auto", // Primary text direction for name, short_name, and description
                lang: "id-ID", // Primary language for name and short_name
                background: "#fff", // Background colour for flattened icons. `string`
                theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
                appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
                display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
                orientation: "portrait-primary", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
                scope: "/", // set of URLs that the browser considers within your app
                start_url: "/index.html", // Start URL when launching the application from a device. `string`
                preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
                relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
                version: "1.0", // Your application's version string. `string`
                pixel_art: true, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
                loadManifestWithCredentials: true, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
                manifestMaskable: true, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
                icons: {
                    // Platform Options:
                    // - offset - offset in percentage
                    // - background:
                    //   * false - use default
                    //   * true - force use default, e.g. set background for Android icons
                    //   * color - set background for the specified icons
                    //
                    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
                    appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
                    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
                    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
                    windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
                    yandex: false, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
                }
            }
        }),
        new MiniCssExtractPlugin(
            {
                filename:'src/[name].min.css',
                chunkFilename:'src/[id].min.css',
            }
        ),
        
        new WorkboxPlugin.GenerateSW({
            cacheId:'hash'+new Date().getTime(),
            
            // precacheManifestFilename:'generateSW'+new Date().getTime(),
            disableDevLogs:true,
            cleanupOutdatedCaches:true,
            inlineWorkboxRuntime:true,
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 6000000,
        }),
        // new HtmlWebpackPlugin({
        //     title:'Edurasa',
        //     'template':'./src/templates/index.html',
        //     'inject':"body",
        //     'chunks':['index','app'],
        //     publicPath:'/'
        // }),
        // new HtmlWebpackPlugin({
        //     'title':'Edurasa | Coba lagi',
        //     'template':'./src/templates/index.html',
        //     'favicon':'./src/assets/favicon.ico',
        //     'filename':'/halo/index.html',
        //     'inject':"body",
        //     'chunks':['app','halo'],
        //     publicPath:'/'
        // })
    ],
    optimization: {
        runtimeChunk: 'single',
        // runtimeChunk: {
        //     name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
        //   },
        splitChunks: {
            cacheGroups: {

                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -5,
                    reuseExistingChunk: true,
                    chunks: "initial",
                    name: "app_node_modules",
                    minSize: 0,
					minChunks: 2,
					chunks: "initial",
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					// minSize: 0 // This is example is too small to create commons chunks
				},
				
				vendorBootrstrap: {
					// test: /node_modules/,
                    test: /[\\/]node_modules[\\/](bootstrap|bootsrap-icons)[\\/]/,
					chunks: "initial",
					name: "vendorsBootrstrap",
					priority: 10,
                    // priority: -5,
                    // priority: 2,
					enforce: true,
                    reuseExistingChunk: true,
                    minSize: 0
				}
            }
        },
        
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    },
                }),
        ],
    },
    externals: {
        charts: 'google.charts'  // or any other alias you want, can be a regex too! check Webpack's doc for more
      }
}