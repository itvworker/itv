// components/head/head.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['root-class'],
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        list:{
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
       select(e, ) {
           this.triggerEvent('select', e, e.currentTarget.dataset.index);
       },
       close(e) {
           this.triggerEvent('close',e);
       }
    }
})
