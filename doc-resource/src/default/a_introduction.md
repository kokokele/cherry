---
page: 概述
---

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


### 案例
- 本文档基于此生成。

### 组件渲染效果预览

^^^js
import React from 'react';
export default class Comp extends React.Component {

    handleClicked(e) {
        alert('hi cherry');
    }

    render() {
        return (
            <button 
                onClick={this.handleClicked.bind(this)} 
                style={{fontSize:'40px', backgroundColor:"#FF0"}}>
                我是按钮
            </button>
        )
    }
    
    
}
^^^

