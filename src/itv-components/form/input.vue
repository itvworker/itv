<template>
<div class="itv-input-box" :style="{height: autoHeight?'auto':null}" >
    <input v-if="type!=='textarea'" class="itv-input" ref="value" 
           :type="type" 
           :maxlength="maxlength" :minlength="minlength"
           :placeholder="placeholder"
           @input="input" @change="change"  @blur="blur"
           @focus="focus"
           @keydown="keydown"
           v-model="currentValue"
           :readonly="readonly"
          
    />
    <textarea v-if="type=='textarea'" class="itv-textarea" 
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        @input="input" @change="change"  @blur="blur"
        @keydown="keydown"
        @focus="focus"
        v-model="currentValue"
    ref="value" ></textarea>
    <div class="iconclose-circle1" @click.stop="clear" v-show="!readonly && isFocus && currentLength"></div>
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
        autoHeight:{
            type: Boolean,
            default: false
        },
        inputType: {
            type:String,
            default:'text' // text int float positive
        },
        inputReg:{
            type:String,
            default:''
        },
        number: {
            type: Boolean,
            default: false
        },
        readonly:{
            type: Boolean,
            default: false
        },
        minHeight:{
            type: Number,
            default: 44
        }
    },
    
    watch: {
        value(n,o) {
            this.currentValue = n;
            this.itvFormItem.value = n;
            this.itvFormItem.vaildata('change', n)
        
        },
        height(n) {
            this.itvFormItem.lineHeight = n
        },
        fs(n) {
            this.itvFormItem.fs = n
            
        },
        $route(n,o) {
            this.$nextTick(() => {
                this.initHeigt();
            }) 
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
            fs: null,
            isFocus: false,
            timeout:''
        }
    },
    
    methods:{
        vaildate(value, type) {
            
        },
        focus(){
            this.isFocus = true;
        },
        keydown(e) {
            //当type ===number 只能输入数字
            if(this.numberStr.indexOf(e.key) >-1&& this.type==='number') {
                e.preventDefault()   
            }
        },
        input(e) {
            let reg = /[\u200D\u2700-\u27BF\u2B00-\u2BFF\uD800-\uF8FF\uFE00-\uFE0F]/ig;
            this.inputValue = this.$refs.value.value;
            if(this.inputValue && reg.test(this.inputValue)) {
                this.inputValue = this.inputValue.replace(reg,'');
                this.currentValue = this.inputValue;
            }
            if(this.inputReg==='eng') {
                this.inputValue = this.inputValue.replace(/[^a-zA-Z\.\s\/]/ig,'');
                this.currentValue = this.inputValue;
            }
            this.$emit('input', this.currentValue);
            if(this.type == 'textarea') {
                this.$refs.value.style.height = this.startHeight+'px';
                this.$refs.value.style.height = (this.$refs.value.scrollHeight || this.startHeight || this.minHeight)+'px';
            }
            // this.itvFormItem.vaildata('input', this.inputValue)
           
        },
        blur() {
            if(this.inputValue) {
                this.inputValue = this.inputValue.replace(/(^\s*)|(\s*$)/g, "");  
                this.currentValue = this.inputValue;
                this.$emit('input', this.currentValue)
            }    
            if(this.type == 'textarea') {
                this.$nextTick(()=>{
                    this.$refs.value.style.height = this.startHeight+'px';
                    this.$refs.value.style.height = (this.$refs.value.scrollHeight || this.startHeight || this.minHeight)+'px';
                })
                
            }
            this.itvFormItem.vaildata('blur', this.inputValue);
            this.$emit("onBlur")
            this.timeout = setTimeout(()=>{
                this.isFocus = false;
            },200)
        },
        change() {
            this.itvFormItem.vaildata('change', this.inputValue)
        },
        clear() {
            this.currentValue = null;
            this.inputValue = null;
            this.focusInput();
            this.$emit('input', null); 
              
            if(this.type == 'textarea') {
                this.$nextTick(()=>{
                    this.$refs.value.style.height = this.startHeight+'px';
                    this.$refs.value.style.height = (this.$refs.value.scrollHeight || this.startHeight || this.minHeight)+'px';
                })
                
            }
        },
        initHeigt(){
            if(this.type == 'textarea') {
                this.$refs.value.style.height = this.startHeight+'px';
                this.$refs.value.style.height = (this.$refs.value.scrollHeight || this.startHeight || this.minHeight)+'px';
            }
        },
        focusInput(){
            if(this.readonly) return;
            clearTimeout(this.timeout)
            this.$refs.value.focus();
        }
    },
    mounted() {
        this.itvFormItem.$on('del', ()=>{
            this.currentValue = null;
            this.$emit('input', this.currentValue);
        })
        this.itvFormItem.value = this.value;
        this.startHeight = this.$refs.value.clientHeight;
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
        setTimeout(()=>{
            this.initHeigt()
        },300)
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
    height: 24ipx;
    font-size: 0px;
    padding-right: 52pt;
    
    .number{
        font-size: @itv-font-size-small;
    }
    .itv-input{
        line-height: normal;
        box-sizing: border-box;
        width: 100%;
        background-color: rgba(0,0,0,0);
        padding: 0;
        margin: 0;
        border-width: 0;
        height: 22ipx;
       
        font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
        outline: none;
        font-size: 16ipx;
    }
    .itv-textarea{
        height: 22ipx;
        outline: none;
        width: 100%;
        top: 0;
        padding: 0;
        background-color: rgba(0,0,0,0);
        border:none;
        font-size: 16ipx;
        resize: none;
        margin: 0;
        margin-bottom: 3pt;
            font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
    }
   
    .error-text {
        position: absolute;
        top: 100%;
        left: 0;
        color: red;
        font-size: 12ipx;
    }
    .iconclose-circle1{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
