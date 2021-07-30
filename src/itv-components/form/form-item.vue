<template>
    <div class="itv-label" :class="{'itv-label-cloume':!flexDirection, 'none-line': isNoneLine}">
        <div class="itv-label-title" v-if="!isHideTitle" >
            <slot name="left">
                <span class="label-title-text">{{title}} <em class="dot" v-if="requireColor!=='#fff'" :style="{color:requireColor}"></em></span> 
            </slot>   
        </div>
        <div class="itv-label-content" @click="onFocus">
            <slot />
        </div>
        <div class="error-text" v-show="errorVaildate">
            {{errorText || errorVaildate }}
        </div>
        <div class="right">
            <slot name="right" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'itv-form-item',
    props: {
        title: {
            type: String,
            defaut: ''
        },
        //是否隐藏标题
        isHideTitle: {
            type: Boolean,
            defaut: false
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
        },
        flexDirection:{
            type: Boolean,
            default: false
        }, 
        requireColor: {
            type: String,
            default: "#F73D47"
        },
        errorText: { //错误的提示语句
            type: String,
            default: null
        },
        isNoneLine: {
            type: Boolean,
            defaut: false
        }
    },
    inject:['itvForm'],
    provide() {
        return  {
            itvFormItem: this,
        }
    },
    data(){
        return {
            
            value:null,
            random:null,
            lineHeight:null,
            fs:null,
            errorVaildate:null   
        }
    },
    watch: {
        rule() {
            if(this.value) {
                this.runVaildata();
            }
        }
    },
    methods:{
        /**
            * @descption 事件验证
            * @param {String} type 事件的类型， input change blur
            * @param {Number, String} value 要验证的值
            */
        vaildata(type, value) {
            if(type==='reu')
            //是否不存在规则
            if(this.itvForm.closeVaildate) return;
            if(!this.rule) return;
            let rule = this.itvForm.rules[this.rule];
            let is = false;

            //存在规则    
            if(Array.isArray(rule)) {
                rule.forEach((item)=>{
                    if(item.trigger && item.trigger.indexOf(type)>=0) {
                        is = true;
                    }
                })
            }else{
                if(rule.trigger.indexOf(type)>=0) {
                    is = true;
                }
            }
            if(!is) return;
            this.itvForm.vaildata(value || this.value , this.rule, this);
        },
        runVaildata() {
            this.itvForm.vaildata(this.value, this.rule, this);
        },
        focus() {
            this.$emit('focus')
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
        },
        onFocus() {
            this.$children.forEach(item=>{
                if(item.focusInput) {
                    item.focusInput()
                }
            })
        },
        closeVaildata() {
            this.errorVaildate = false;
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
.itv-label {
    display: flex;
    padding: 12ipx 15ipx;
    line-height: 1.6;
    font-size: 14ipx;
    &.none-line{
        &::after {
            display: none !important;
        }
    }
    .error-text {
        color:@color-text-fail;
        font-size:@icon-small-size;
        height:10pt;
    }
    .itv-label-content{
        flex: 1;
        display: flex;
        font-size: 0;
        font-size: 12ipx;
        
    }
    .itv-label-title{
        // margin-right: 10ipx;
        box-sizing: border-box;
        display: flex;
        height: 24ipx;
        line-height: 24ipx;
        padding-right: 10ipx;
        align-items: center;
        justify-content: center;
        font-size: 16ipx;
        color: @color-text-regluar-fade;
        margin-bottom: 8pt;
        // background-color: #aaa;
        .label-title-text{
            position: relative;
            padding-right: 8pt;
            .dot {
                position:absolute;
                right: 0pt;
                top: 50%;
                transform: translateY(-3pt);
                font-size: 16pt;
                line-height: 14pt;
                font-style: normal;
                width: 7pt;
                height: 7pt;
                background-image: url('~@/assets/images/星.svg');
                transform: translateY(-52%);
                background-size: cover;
                right: -4pt;
                
            }
        }
    }
    &.itv-label-cloume{
        flex-direction: column;
        .itv-label-title{
            justify-content:start;
        }
    }
    
}
</style>
