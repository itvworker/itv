<template>
<div class="itv-radio">
    <label class="itv-label-radio" @click="setRadio(item.value, item)" v-for="(item,index) in options" :key="index" >
        <div class="radio" :class="{'radioed': currentValue === item.value}">

        </div>
        {{item.text}}
        <!-- <input type="radio" :value="item.value" v-model="currentValue" /> {{item.text}} -->
    </label>
</div>

    
</template>
<script>
export default {
    inject: {
        foo: { default: 'foo' }
    },
    props: {
        value: {
            type:[Number, String, Boolean],
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
        },
        index: {
            type: Number,
            default: null
        }
    },
    watch: {
        value(n) {
            this.currentValue = n;
        },
        currentValue(n, o) {
            this.$emit('input', n);
          
        }
    },
    data() {
        return {
            currentValue: this.value,

        }
    },
    methods: {
        setRadio(value, item) {
            if(this.value === value) return;
            this.$emit('input', value);
            this.$emit('onChange', this.index, item);
            
        }
    }
}
</script>
<style lang="less" scoped>
.itv-radio{
    font-size: 16pt;
    display:flex;
    height: 24pt;
    .radio{
        width: 20pt;
        height: 20pt;
        box-sizing: border-box;
        border-radius: 10pt;
        border:  rgba(0, 0, 0, 0.25) solid 1px;
        margin-right: 8pt;
        &.radioed{
            background-image: url('~@/assets/icon/Mask.svg');
            border: none;
            background-size: cover;
        }
    }
    .itv-label-radio{
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