# Actionsheet

Actionsheet是一个移动端弹框选择器

+ 可以导入样式替换当前组件样式
+ 可以以插件的访式调用

## 安装

```js
//全局安装
import vue from "vue";
import { actionsheet } from "itv-ui";
vue.use(actionsheet);

//局部安装
import { actionsheet } from "itv-ui";
export default {
  components: {
    actionsheet
  }
}

```



该组件插件方式调用

```js
// 安装
import vue from "vue";
import { actionsheet } from "itv-ui";
vue.use(actionsheet)


//显示
this.$itv.actionsheet.show({
    items:[
        {
            text:'选项一'
        },
        {
            text:'选项二'
        }
    ],
    //点击确认时，执行的方法
    onConfirm(item) {

    },
    //插件关闭时调用的方法 
    onHide() {
        
    }
})

//关闭
this.$itv.actionsheet.hide()
//获取插件是处于打开状态还是关闭
this.$itv.actionsheet.isVisible();

```



## 属性

| 参数    | 说明                                     | 类型   | 默认值           |
| ------- | -------------------------------------------- | ------ | ---------------- |
| value | 否显示插件 v-model | <font color="#2caf4f">Boolean</font> | false |
| items | 选项,选项中的json对象中必须要有text字段 | <font color="#2caf4f">Array[...Object]</font> | null |
| hideBtnCancel | 是否隐取消按钮 | <font color="#2caf4f">Boolean</font> | false |
| cancelText | 取消按钮的文字 | <font color="#2caf4f">string</font> | 取消 |
| iosSafeArea | 是否开启ios全屏安全区域 | <font color="#2caf4f">Boolean</font> | false |
| hideOnClick | 点击遮罩是否关闭组件 | <font color="#2caf4f">Boolean</font> | true |
| teleport | 是否挂载到body上，插件模式下无效 | <font color="#2caf4f">Boolean</font> | false |

## 事件

| 事件名  | 说明                       | 返回参数         |
| ------- | -------------------------- | ---------------- |
| confirm | 点击选择选项时执行         | 当前所选日期时间 |
| hide    | 点击取消，点击背景返回关闭 | 无               |



