<template>
<div class="itv-input-box" :style="{'height': height+'px'}">
    <input v-if="type!=='textarea'" class="itv-input" ref="value" 
            :type="type" 
           :maxlength="maxlength" :minlength="minlength"
           :placeholder="placeholder"
           @input="input" @change="change"  @blur="blur"
           @keydown="keydown"
           v-model="currentValue"
           :style="{height:height+'px','font-size': fs+'px'}"
    />
    <textarea v-if="type=='textarea'" class="itv-textarea" 
        :style="{'height':startHeight+'px','line-height': startHeight+'px','font-size': fs+'px'}"
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        @input="input" @change="change"  @blur="blur"
        @keydown="keydown"
        v-model="currentValue"
     ref="value" ></textarea>
     <div class="number" v-if="number">{{currentLength}}</div>
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
            },
            number: {
                type: Boolean,
                default: false
            }
        },
        
        watch: {
            value(n,o) {
                this.currentValue = n;
                this.itvFormItem.value = n;

            },
            height(n) {
                this.itvFormItem.lineHeight = n
            },
            fs(n) {
                this.itvFormItem.fs = n
             
            }
        },
        computed: {
            currentValueHtml() {
                if(this.currentValue) { 
                   let current = this.currentValue.toString();
                   return current.replace(/\n/ig,'<br/>')
                }
                return null;
            },
            currentLength() {
                if(this.currentValue) {
                    let current = this.currentValue.toString();
                    return current.length;
                }
                return 0
            }
        },
        inject:['itvFormItem'],
        data(){
            return {
                name:'itv-input',
                currentValue: this.value,
                inputValue: this.value,
                numberStr:'-e+.',
                startHeight:null,
                height: null,
                fs: null
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
                if(this.type == 'textarea') {
                    this.$refs.value.style.height = this.startHeight+'px';
                    this.$refs.value.style.height = this.$refs.value.scrollHeight+'px';
                }
            },
            blur() {
                this.itvFormItem.blur();
            },
            change() {

            },
            init() {
                let height = this.$el.clientHeight;
                height = height%2?height+1:height;
                let fs = window.getComputedStyle(this.$refs.value).fontSize;
                let size = Math.round(parseFloat(fs))
                this.fs = size;
                if(this.type !== 'textarea') {
                    this.height = height;
                    return
                }
                this.startHeight = height;
                
               
                
            }
        },
        mounted() {
            this.init()
            this.itvFormItem.$on('del', ()=>{
                this.currentValue = null;
                this.$emit('input', this.currentValue);
            })
            this.startHeight = this.$refs.value.scrollHeight;
           

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
@import '../../assets/css/itv-theme.less';
.itv-input-box {
    font-size: 0;
    position:relative;
    // overflow: hidden;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    height: 22ipx;
    font-size: 0px;

    .number{
        font-size: @itv-font-size-small;
    }
    .itv-input{
        line-height: normal;
        font-size: 14ipx;
        box-sizing: border-box;
        width: 100%;
        background-color: rgba(0,0,0,0);
        padding: 0;
        margin: 0;
        border-width: 0;
        height: 22ipx;
        font-size: 14ipx;
            font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
    }
    .itv-textarea{
        height: 22ipx;
        outline: none;
        width: 100%;
        top: 0;
        padding: 0;
        background-color: rgba(0,0,0,0);
        border:none;
        font-size: 14ipx;
        resize: none;
        margin: 0;
            font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
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
