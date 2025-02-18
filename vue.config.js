const webpack = require('webpack')
const path = require('path')

module.exports = {
    chainWebpack: config => {
        config.module.rule('svg').use('file-loader').loader('vue-svg-loader')
        
        // Optimiza los chunks para el middleware
        config.optimization.splitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                        return `npm.${packageName.replace('@', '')}`
                    }
                },
                middleware: {
                    test: /[\\/]middleware[\\/]/,
                    name: 'middleware',
                    chunks: 'all',
                    enforce: true
                }
            }
        })
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'lodash',
                echarts: 'echarts',
            })
        ],
        resolve: {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '~': path.join(__dirname, './src'),
                '@sass': path.join(__dirname, './src/sass')
            }
        }
    },
    productionSourceMap: false,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    pwa: {
        name: 'Hunters',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            exclude: [
                /\.map$/,
                /manifest\.json$/
            ]
        },
        manifestOptions: {
            name: 'Hunters',
            display: 'standalone',
            start_url: '/'
        }
    }
}