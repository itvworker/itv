<template>
    <div class="itv-form-item">
        <div class="itv-form-item-title">
         <slot name="left">
             *{{label}}
        </slot>   
        </div>
        <div class="itv-form-item-content">
            <slot />
        </div>
        <div class="right">
            <button @click="$emit('del')">del</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'itv-form-item',
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
               
              if(this.rule) {   
                  let res =  this.itvForm.vaildata(this.value, this.rule, this);
              }
              
             
            },
            scrollTop() {
                let scroller =  this.formScroller.getPostion();
                let y = this.$el.offsetTop;
                this.formScroller.scrollTop(y-scroller.y)
            },
            setMinHeight(value) {
                this.$el.children[0].style.minHeight = value;
                this.$el.children[1].style.minHeight = value;
                this.$el.children[2].style.minHeight = value;
                this.$el.style.lineHeight = value;
            }
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
.itv-form-item {
    display: flex;
    border-bottom: #eee solid 1px;
    padding: 10.5ipx 15ipx;
    line-height: 1.6;
    font-size: 14ipx;
    .itv-form-item-content{
        flex: 1;
        display: flex;
        font-size: 0;
    }
    .itv-form-item-title{
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
