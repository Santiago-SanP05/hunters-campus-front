const webpack = require('webpack')
const path = require('path')

// console.log(process.env.NODE_ENV);

module.exports = {
    chainWebpack: config => {
        config.module.rule('svg').use('file-loader').loader('vue-svg-loader')
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'lodash',
                echarts: 'echarts',
                // moment: 'moment'
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
    pwa: {
        name: 'Hunters',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            skipWaiting: true
        },
        manifestOptions: {
            name: 'Hunters',
            display: 'standalone',
            start_url: '/'
        }
    }
}
