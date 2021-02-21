# Cliper

+ 可以导入样式替换当前组件样式

## 安装
```js
//全局安装
import vue from "vue";
import { Cliper } from "itv-ui";
vue.use(Cliper);

//局部安装
import { Cliper } from "itv-ui";
export default {
  components: {
​    Cliper
  }
}

```




### 属性

|名字|类型|默认值|说明|
|-|-|-|-|
|width|number|200|裁剪的宽度|
|height|number|200|裁剪的高度|
|clipType|string|orthogon|可选值 orthogon(矩形裁前), circle(圆形裁剪) width与height必须设置为同一数值;|
|outputFormat|string|输出图片类型||

### 方法
|名字|参数|说明|
|-|-|-|
|insertImage|value图片路径|参数是图片url|
|reset|--|重置操作的图片|
|done|--|返回base64图片|
