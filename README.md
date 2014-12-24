# Simple ScrollTo

一个ScrollTo组件，用于页面的滚动

依赖项：

- JQuery 2.0+

### 使用方法
首先，需要在页面里引用相关脚本

```html
<script type="text/javascript" src="path/to/jquery.min.js"></script>
<script type="text/javascript" src="path/to/scrollTo.js"></script>

```

目前支持2种滚动

```js
//滚动到对应的元素
simple.scrollTo({
    target: '#target',
    animation: true,
    offset: {
        x: 5,
        y: 10
    },
    duration: 800,
    callback: function(){
        console.log('ScrollTo is end!')
    }
});
```

```js
//在某个方向上滚动到某个位置
simple.scrollTo({
    animation: true,
    offset: 1000,
    axis: 'y',
    duration: 800,
    callback: function(){
        console.log('ScrollTo is end!')
    }
});
```



### API 文档

####自定义选项

__target__

滚动至target元素的选择器，可选。

__container__

滚动发生的容器，可选，默认为HTML, Body

__axis__

滚动的方向，默认为'y'，还可以为'x', 'xy'

__offset__

滚动的距离，或者增加的距离，可以是数字，也可以是{x: Number, y: Number}的对象

__animation__

Boolean，是否有滚动动画，默认为true

__duration__

Number，仅仅在animation为true时有效，滚动动画的时间

__callback__

Function，动画结束时调用的回调函数
