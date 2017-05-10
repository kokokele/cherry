---
category: 配置说明
page: 基础配置

---

# 基础配置

### cherry.config.js

```js
module.exports = {
    title: 'cherry-doc 使用说明', // 网站标题
    root: './src', // md文件目录
    ext: '.md', // markdown文件后缀名
    category: [ // 要显示的目录排序
        "配置说明"
    ],

    // 导航配置, label：导航标题， uri：资源路径，如果是http就会打开新网页，否则就会解析制定md文件。
    // 注意：最好不要和root目录在一起。
    nav: [
        {
            label: '糯米', uri: 'http://nuomi.com',
            label: '更新记录', uri: './nav/history.md'
        }
    ],

    // sever配置
    server: {
        port: 8000, 
        middleware: []
    },

    // webpack配置
    setWebpackConfig(config, isProduction) {
       return config;
    }
}
```

### server配置

基于express作为开发服务器

```js
server: {
        port: 8000, 
        middleware: []
    },
```
- port：网站端口号
- middleware： 支持express中间件插入


### 设置webpack配置

cherry基于webpack作为打包工具，可以通过 `setWebpack` 方法进行配置

```js
// 参数 config：完整的webpack.config数据， isProduction: 是否是开发环境还是线上
setWebpackConfig(config, isProduction) {
       return config;
    }
```

