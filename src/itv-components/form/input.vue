<template>
<div class="itv-input-box">
    <input v-if="type!=='textarea'" class="itv-input" ref="value" :type="type" 
           :maxlength="maxlength" :minlength="minlength"
           :placeholder="placeholder"
           @input="input" @change="change"  @blur="blur"
           @keydown="keydown"
           v-model="currentValue"
    />
    <textarea v-if="type=='textarea'" class="itv-textarea" 
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        @input="input" @change="change"  @blur="blur"
        @keydown="keydown"
        v-model="currentValue"
     ref="value"></textarea>
    <div  v-if="type=='textarea'" class="itv-textarea itv-textarea-box" v-html="currentValue" >
       
    </div>
    
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
        computed: {
            
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
   
    position:relative;
    // overflow: hidden;
    height: auto;
    width: 100%;
    min-height: 22ipx;
    .itv-input{
        line-height: normal;
        font-size: 14ipx;
        height: 22ipx;
        box-sizing: border-box;
        width: 100%;
        background-color: rgba(0,0,0,0);
    }
    .itv-textarea{
        min-height: 22ipx;
        line-height: 22ipx;
        height: 100%;
        outline: none;
        position: absolute;
        width: 100%;
        top: 0;
        padding: 0;
        background-color: rgba(0,0,0,0);
        border:none;
        font-size: 14ipx;
        resize: none;
    }
    .itv-textarea-box{
        min-height: 22ipx;
        line-height: 22ipx;
        height: auto;
        position: relative;
        word-break: break-all;  
        
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
