# react.js 规范

## import 顺序

从上到下依次是：

- js原生库
- react官方库
- 第三方js库
- 本项目的其他组件
- utils中的内容
- webapi

## 一个组件内部写法

一个组件内部从上到下依次是：

- API封装函数
- constructor
- 事件响应函数
- 其他函数
- render函数
