[![Build Status](https://travis-ci.org/kokokele/cherry.svg?branch=master)](https://travis-ci.org/kokokele/cherry)

# cherry
![image](https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVWc4Y4dXqcqubFKdBCMgA9fWwpTfpeqxmG9EiFv-N_vLk-_jq)


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
    "dev": "cherry st",
  },
```

### step5
执行
```shell
npm run dev
```

浏览器输入 `localhost:8000` 即可看到效果