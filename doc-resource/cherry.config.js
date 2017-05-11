
module.exports = {
    title: 'cherry-doc 使用说明',
    root: './src',
    out: '../doc',
    ext: '.md',
    category: [
        "配置说明"
    ],
    

    nav: [
        {
            label: '糯米', uri: 'http://nuomi.com'
        }
    ],

    // theme: './theme_default',
    server: {
        port: 8000,
        middleware: []
    },

    setWebpackConfig(config, isProduction) {
       return config;
    }
}