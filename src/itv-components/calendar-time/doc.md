# calenderTime

calendarTime是一个移动端日历以及时间弹框选择器

+ 可以导入样式替换当前组件样式
+ 模板多种样
+ 可以以插件的访式调用

## 安装

```js
//全局安装
import vue from "vue";
import { calendarTime } from "itv-ui";
vue.use(calendarTime);

//局部安装
import { calendarTime } from "itv-ui";
export default {
  components: {
    calendarTime
  }
}

```



该组件插件方式调用

```js
// 安装
import vue from "vue";
import { pluginCalendarTime } from "itv-ui";
vue.use(pluginCalendarTime)


//显示
this.$itv.calendarTime.show({
     minDate: '2020-08-05 10:56',
     value: '2020-08-05 10:15',
     maxDate: '2020-09-18 10:15',
     style:"average",
     onConfirm:(res)=>{
        this.calendarTime = res;
     }
})

//关闭
this.$itv.calendarTime.hide()
//获取插件是处于打开状态还是关闭
this.$itv.calendarTime.isVisible();

```



## 属性

| 参数    | 说明                                     | 类型   | 默认值           |
| ------- | -------------------------------------------- | ------ | ---------------- |
| current | 当前日期时间传入值，格式为"yyyy-MM-dd hh:mm" | <font color="#2caf4f">string</font> | 2020-08-26 11:12 |
| minDate | 可选最小日期时间,格式为"yyyy-MM-dd hh:mm"    | <font color="#2caf4f">string</font> | 2000-01-01 00:00 |
| maxDate | 可选最大日期时间,格式为"yyyy-MM-dd hh:mm"    | <font color="#2caf4f">string</font> | 2200-12-30 23:59 |
| dateType | 组件显示的类型, 只能传入以下三个类型:<font color="#e1251b">calendar-time</font>,<font color="#e1251b">calendar</font>,<font color="#e1251b">time</font> | <font color="#2caf4f">string</font> | calendar-time |
| confirmText | 确认按钮文字 | <font color="#2caf4f">string</font> | 确认 |
| cancelText | 取消按钮文字 | <font color="#2caf4f">string</font> | 取消 |
| titleText | 插件标题文字 | <font color="#2caf4f">string</font> | 请选择日期 |
| calendarDir | 日历滑动方向 <font color="#e1251b">column</font>竖向滑动， <font color="#e1251b">row</font>横向滑动 | <font color="#2caf4f">string</font> | column |
| hideOnClick | 点击遮罩是否关闭组件 | <font color="#2caf4f">Boolean</font> | true |
| value | 是否显示插件 v-model | <font color="#2caf4f">Boolean</font> | false |
| teleport | 是否挂载到body上，插件模式下无效 | <font color="#2caf4f">Boolean</font> | false |

## 事件

| 事件名  | 说明                                                | 返回参数         |
| ------- | --------------------------------------------------- | ---------------- |
| confirm | 点击确认，当dateType=calendar是时选择日期也返回这个 | 当前所选日期时间 |
| hide    | 点击取消，点击背景返回关闭                          | 无               |

