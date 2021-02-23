<template>
    <form>
        <slot />
    </form>
</template>

<script>

import Vaildata from './lib/vaildata.js'
export default {
    name: 'itv-form',
    props: {
        rules: {
            type: Object,
            default: ()=>{}
        },
        model: {
            type: Object,
            default: ()=>{}
        }
    },
    data(){
        return{
            items:[]
        }
    },
    provide(){
        return {
            itvForm:this,
           
        }
    },
    
    methods:{
        /**
         * @description 验证值是否通过验证
         * @param value {Anyting} 要验证的值
         * @param rules {Array[Object...]} 验证规则
         * @param obj {Objct} 组件对象
         */
        vaildata(value, rule, obj) {
            let res = new Vaildata(value, this.rules[rule]);
            let vail = res.getResult();
            if(vail) {
                vail.component = obj;
                return vail
            }
        },
        vaildataAll() {
            let arr = [];
            this.items.forEach(item=>{
               let res = this.vaildata(item.value, item.rule, item);
               if(res){
                   arr.push(res);
               }
            })
            if(arr.length>0) {
                return arr;
            }
        },
        addItem(value) {
            this.items.push(value);
        },
        delItem(value) {
            for(let i = 0, l = this.items.length; i < l; i++) {
                if(value._uid === this.items[i]._uid ) {
                    this.items.splice(i,1);
                    break;
                }
            }
        },
        focus(id) {
            for(let i = 0, l = this.items.length; i < l; i++) {
                if(value._uid === this.items[i]._uid ) {
                    this.items.splice(i,1);
                    break;
                }
            }
        }
        
    },
    updated() {
        
    },
    mounted() {
        
    }
}
</script>

<style lang="less">
</style>
