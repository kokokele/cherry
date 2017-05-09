---
page: 快速开始
rank: 0
---

# 快速开始

### step 1
在项目根目录添加 cherry.config.js


```js
module.exports = {
    title: 'cherry-doc 使用说明', // 文档标题
    root: './src', // md 存放目录
    ext: '.md', // md 后缀名
    category: [
    ],
    server: {
        port: 8000,  // server port
        middleware: []
    },
}
```


### step2

