<template>
<div class="itv-input-box">
    <input class="itv-input" ref="value" :type="type" 
           :maxlength="maxlength" :minlength="minlength"
           :placeholder="placeholder"
           @input="input" @change="change"  @blur="blur"
           @keydown="keydown"
           v-model="currentValue"
    />
    <!-- <div class="input-placeholder" v-show="inputValue.toString().length<=0">{{placeholder}}</div> -->
    
</div>
    
</template>

<script>
    export default {
        name: 'itv-input',
        model:{
            prop:'value',
            event:'input'
        },
        props: {
            value: {
                type: [String, Number],
                default:''
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            maxlength: {
                type: Number,
                default: null
            },
            minlength: {
                type: Number,
                default: null
            },
            inputType: {
                type:String,
                default:'text' // text int float positive
            }
        },

        watch: {
            value(n,o) {
                this.currentValue = n;
                this.itvFormItem.value = n;

            }
        },
        inject:['itvFormItem'],
        data(){
            return {
                name:'itv-input',
                currentValue: this.value,
                inputValue: this.value,
                numberStr:'-e+.'
            }
        },
        methods:{
            vaildate(value, type) {

            },
            keydown(e) {
                 
                 //当type ===number 只能输入数字
                 if(this.numberStr.indexOf(e.key) >-1&& this.type==='number') {
                    e.preventDefault()   
                }
            },
            input(e) {
                this.inputValue = this.$refs.value.value;
                this.$emit('input', this.currentValue);
            },
            blur() {
                this.itvFormItem.blur();
            },
            change() {

            }
        },
        mounted() {
            this.itvFormItem.$on('del', ()=>{
                this.currentValue = null;
                this.$emit('input', this.currentValue);
            })

            this.itvFormItem.$on('focus', ()=>{
                let dom = this.$refs.value;
                if(this.type ==='number') {
                    dom.type = "tel";
                }
                if(dom.setSelectionRange && this.currentValue) {
                    dom.setSelectionRange(this.currentValue.length, this.currentValue.length);
                }
                dom.focus();
                setTimeout(()=>{
                    if(this.type ==='number') {
                        dom.type = this.type;
                    }
                })
                

            })
        }
    }
</script>

<style lang="less">
.itv-input-box {
    display: flex;
    position:relative;
    // overflow: hidden;
    height: 100%;
    width: 100%;
    .itv-input{
        line-height: normal;
        font-size: 14ipx;
        height: 22ipx;
        box-sizing: border-box;
        line-height: 40ipx;
        width: 100%;
        background-color: rgba(0,0,0,0);
    }
    .error-text {
        position: absolute;
        top: 100%;
        left: 0;
        color: red;
        font-size: 12ipx;
    }
}
</style>
