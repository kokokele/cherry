---
category: Comp
page: A
rank: 0
---

## APIdfddssdddsss

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| offsetTop    | 距离窗口顶部达到指定偏移量后触发   | number |         |
| offsetBottom | 距离窗口底部达到指定偏移量后触发   | number |         |
| target | 设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |
| onChange | 固定状态改变时触发的回调函数   | Function(affixed) | 无        |

# a.m

````js
import {Button, DatePicker} from 'antd';
import React from 'react';
import ReactDom from 'react-dom';

export default (props) => {
    return (
        <div>
            <DatePicker />
        </div>
    )
}

````