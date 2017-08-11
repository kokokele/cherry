[![Build Status](https://travis-ci.org/kokokele/cherry.svg?branch=master)](https://travis-ci.org/kokokele/cherry)

# cherry
![image](https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVWc4Y4dXqcqubFKdBCMgA9fWwpTfpeqxmG9EiFv-N_vLk-_jq)

# 概述

### cherry-doc 是什么？

cherry是一个基于React的动态文档系统。区别于hexo等md文档工具，它是开发者边开发边生成文档网站，不会再有后期补充文档的烦恼。基于markdown语法书写js代码，可以通过code标签运行code里的js代码预览效果。
做到边开发边生成文档。


### 特性
- 上手快，简单配置即可
- 基于md预览js代码效果
- 一键生成文档站点
- 无需数据库支持
- 支持自定义主题
- 支持两级目录
- 支持es6语法
- 支持hot-reload


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
安装 cherry-doc

```shell
npm i --save-dev cherry-doc
```

### step3

在cherry.config.js之前设置root目录里新建 test.md

```md
---
page: test
rank: 0
---

## 我是测试页面
```


### step4
在package.json 添加 dev 命令
```
"scripts": {
    "dev": "cherry dev",
  },
```

### step5
执行
```shell
npm run dev
```

浏览器输入 `localhost:8000` 即可看到效果

# 详细文档以及效果预览
[文档地址](https://kokokele.github.io/cherry/doc/)
