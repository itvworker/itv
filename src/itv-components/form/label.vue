<template>
    <label class="itv-label">
        <div class="itv-label-title">
         <slot name="left">
             *{{label}}
        </slot>   
         
        </div>
        <div class="itv-label-content">
            <slot />
        </div>
        <div class="right">
            <button @click="$emit('del')">del</button>
        </div>
    </label>
</template>
<script>
    export default {
        name: 'itv-label',
        props: {
            label: {
                type: String,
                defaut: ''
            },
            prop: {
                type: String,
                default: ''
            },
            id: {
                type: [String, Number],
                default:null
            },
            rule: {
                type: String,
                default: null
            }
           
        },
        inject:['itvForm', 'formScroller'],
        provide() {
            return  {
                itvFormItem: this,
                
            }
        },
        data(){
            return {
               
                value:null,
                random:null   
            }
        },
        methods:{
            vaildate(value, type) {
                
            },
            focus() {
                this.$emit('focus')
            },
            blur() {
              let res =  this.itvForm.vaildata(this.value, this.rule, this);
              console.log(res);
            },
            scrollTop() {
                let scroller =  this.formScroller.getPostion();
                let y = this.$el.offsetTop;
                this.formScroller.scrollTop(y-scroller.y)
            },

        },
        destroyed() {
            this.itvForm.delItem(this)
        },
        mounted() {
            this.itvForm.addItem(this);
        }
    }
</script>

<style lang="less" >
@import '../../assets/css/itv-theme.less';
.itv-label {
    display: flex;
    border-bottom: #eee solid 1px;
    padding: 10.5ipx 15ipx;
    line-height: 1.6;
    font-size: 14ipx;
    align-items: center;

    .itv-label-content{
        flex: 1;
        display: flex;
        align-items: center;
    }
    .itv-label-title{
        // margin-right: 10ipx;
        box-sizing: border-box;
        display: flex;
        height: 22ipx;
        line-height: 22ipx;
        padding-right: 10ipx;
        // background-color: #aaa;
        
    }
    
}
</style>
