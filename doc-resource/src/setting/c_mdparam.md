---
category: 配置说明
page: markdown书写格式
---

# markdown书写格式

### 头部yaml说明：

```yaml
---
category: 配置说明
page: markdown书写格式
rank: 0
---
```

`category`: 目录名称， 可省略，如不设置则代表此文章为一级导航
`page`: 当前页面导航名称，不可省略
`rank`: 当前md在整体文章中的排序。从0开始，如果一个文章只有一个md文件可以省略

> 注：因为在一个md文件中只允许渲染一个react模块，所以允许多个md文件拼接成一个文章显示。 rank就代表每个md文件在一个文章中显示顺序。

### markdown语法
支持标准的markdown语法。

新增标签：`^^^`
```
^^^js

export default () => {
    return (<div>hello</div>)
}

^^^
```
> 此标签代表里面的代码可以运行。如果需要展示react组件效果需要 添加 `export default` 导出该组件做展示。
