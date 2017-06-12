---
category: 配置说明
page: 自定义主题
---

# 自定义主题

### 配置主题

默认主题是用antd实现的界面，在在目录`/theme_default`下。

替换默认主题：

在cherry.config.js 中添加参数

```js
{
    theme: './my_theme_folder' // 主题目录文件夹
}
```

默认主题文件入口文件必须是 `index.js`;

### 主题开发规范

- 主题开发必须基于react实现
- 如果index.js 组件props会接收到db属性。 db属性内容如下：
```js
{
    "md": {
        "testCategory": [
            {
                "page": "testPage",
                "key": "testCategory_testPage",
                "files": [
                    "/Users/zhangpeng53/Documents/my/markdoc/__test__/md/a.md"
                ]
            }
        ]
    },
    "config": {
        "root": "/Users/zhangpeng53/Documents/my/markdoc/__test__/md",
        "ext": ".md",
        "theme": "/Users/zhangpeng53/Documents/my/markdoc/__test__"
    },
    "source": {
        "testCategory_testPage": "./tmp/__testCategory_testPage"
    },
    "root": "/Users/zhangpeng53/Documents/my/markdoc",

    "nav": [{"label": "导航标题", "uri": "导航内容地址"}]
}
```
