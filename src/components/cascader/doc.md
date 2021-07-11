# Cascader

Cascader是一个移动端级联选择器弹框选择器

+ 可以导入样式替换当前组件样式
+ 可以以插件的方式调用

## 安装

```js
//全局安装
import vue from "vue";
import { Cascader } from "itv-ui";
vue.use(Cascader);

//局部安装
import { Cascader } from "itv-ui";
export default {
  components: {
    Cascader
  }
}

```



该组件插件方式调用

```js
// 安装
import vue from "vue";
import { pluginCascader } from "itv-ui";
vue.use(pluginCascader)


//显示
this.$itv.cascader.show({
    items: [{
        "id": 150000,
        "code": 150000,
        "pid": 0,
        "level": 0,
        "name": "内蒙古自治区"
    },
    {
        "id": 150300,
        "code": 150300,
        "pid": 150000,
        "level": 1,
        "name": "乌海市"
    },
    {
        "id": 150303,
        "code": 150303,
        "pid": 150300,
        "level": 2,
        "name": "海南区"
    }],
    selected:[150000],
    onConfirm:(res)=>{
      	//res返回的是所选的数组对象 [...Object]
       
    }
});

//关闭
this.$itv.cascader.hide()
//获取插件是处于打开状态还是关闭
this.$itv.cascader.isVisible();

```



## 属性

| 参数    | 说明                                     | 类型   | 默认值           |
| ------- | -------------------------------------------- | ------ | ---------------- |
| titleText | 标题 | <font color="#2caf4f">string</font> | 请选择分类 |
| placehoder | 请选择的文字 | <font color="#2caf4f">string</font> | 请选择 |
| items | 选项数据的数据，数据的结构是 | <font color="#2caf4f">Array[Object...]</font> | <font color="blue">null</font> |
| Selected | 所选项目的id数组,如[id1,id2,id3] | <font color="#2caf4f">Array</font> | [] |
| confirmText | 确认按钮文字 | <font color="#2caf4f">string</font> | 确认 |
| cancelText | 取消按钮文字 | <font color="#2caf4f">string</font> | 取消 |
| isLastConfirm | 是否要选完最后一级才能定确定 | <font color="#2caf4f">Boolean</font> | <font color="blue">true</font> |
| hideOnClick | 点击遮罩是否关闭组件 | <font color="#2caf4f">Boolean</font> | <font color="blue">true</font> |
| value | 否显示插件 v-model | <font color="#2caf4f">Boolean</font> | <font color="blue">false</font> |
| teleport | 是否挂载到body上，插件模式下无效 | <font color="#2caf4f">Boolean</font> | <font color="blue">false</font> |

### items
|参数名|说明|是否必要|
|-----|---|---|
|id|id健名|是|
|pid|父id，此参数是与父级联系起来的|是|
|name|输出来在选项上的文字|是|

实例

```js
//items的实例
[
    {
        id:1,
        pid: 0,
        name:"父类"
    },{
        id:2,
        pid:1,
        name:"子类"
    }
]
```



## 事件

| 事件名  | 说明               | 返回参数         |
| ------- | ------------------ | ---------------- |
| confirm | 点击确认返回的事件 | Array[Object...] |
| hide    | 关闭时会发送事件   | 无               |

