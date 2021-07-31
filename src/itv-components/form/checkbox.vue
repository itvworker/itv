<template>
<div class="itv-checkbox">
    <label class="itv-label-checkbox" @click="setRadio(item.value)" v-for="(item,index) in options" :key="index" >
        <div class="checkbox" :class="{'checkboxed': value && value.indexOf(item.value) >= 0}">
        </div>
        {{item.text}}
    </label>
</div>

    
</template>
<script>
export default {
    // inject:['itvFormItem'],
    inject: {
        "itvFormItem": { default: null }
    },
    props: {
        value: {
            type: Array,
            default: null
        },
        options:{
            type:Array,
            default:null
        },
        text: {
            type: String,
            default:null
        },
        name: {
            type: String,
            default:null
        }
    },
    watch: {
        value(n) {
            this.currentValue = n;
        },
        currentValue(n, o) {
            this.$emit('input', n)
        }
    },
    data() {
        return {
            currentValue: this.value,

        }
    },
    methods: {
        setRadio(value) {
            
            let result = [];
            if(this.value) {
                result = JSON.parse(JSON.stringify(this.value));
            }
            let index = result.indexOf(value);
           
            if(index>=0) {
                result.splice(index,1);
            }else{
                result.push(value)
            }
            console.log(result);
            this.$emit('input', result)
        }
    }
}
</script>
<style lang="less" scoped>
.itv-checkbox{
    font-size: 16pt;
    display:flex;
    height: 24pt;
    .checkbox{
        width: 20pt;
        height: 20pt;
        box-sizing: border-box;
        border-radius: 10pt;
        border:  rgba(0, 0, 0, 0.25) solid 1px;
        margin-right: 8pt;
        &.checkboxed{
            background-image: url('~@/assets/icon/Mask.svg');
            border: none;
            background-size: cover;
        }
    }
    .itv-label-checkbox{
        height: 24pt;
        font-size: 16pt;
        display: inline-flex;
        align-items: center;
        margin-right: 41pt;
        &:last-child{
            margin-right: 0;
        }
        
    }
}
</style>