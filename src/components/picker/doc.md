# Picker

Picker是一个移动端日历以及时间弹框选择器

+ 可以导入样式替换当前组件样式

## 安装

```js
//全局安装
import vue from "vue";
import { picker } from "itv-ui";
vue.use(calendarTime);

//局部安装
import { picker } from "itv-ui";
export default {
  components: {
    picker
  }
}

```





## 属性

| 参数    | 说明                                     | 类型   | 默认值           |
| ------- | -------------------------------------------- | ------ | ---------------- |
| listData | 选项 | <font color="#2caf4f">array</font> | [] |
| defaultValueData | 默认选中值 | <font color="#2caf4f">array</font> | [] |
| rows | 滚动行数，只支持<font color="red">5</font>或<font color="red">7</font>行 | <font color="#2caf4f">string</font> | 5 |
| isLoop | 是否循环滚动<font color="red">当选项超过行数一半才有效</font> | <font color="#2caf4f">Boolean</font> | false |

### listData

listData是一个数组， 也可以是一个对像数组



## 事件

| 事件名 | 说明         | 返回参数                        |
| ------ | ------------ | ------------------------------- |
| choose | 当选项变化时 | index: 列， value: 当前选中的项 |

