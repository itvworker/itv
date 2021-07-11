<template>
<itv-dialog v-model="currentValue" :hideOnClick="hideOnClick" type="bottom">
    <div class="itv-picker-ui" :class="className" :slot="soltName"> 
        <div class="title-bar" v-if="titleBar">
            <div class="left-btn" @click="closePicker">{{cancelText}}</div>
            {{title}}
            <div class="right-btn" :class="{'forbid': isForbidConfirm}" @click="confirm">{{confrimText}}</div>
        </div>
        <div class="itv-picker-panel">
            <picker-slot :class="pickerClassName"  v-for="(item, index) of list" :ref="`picer-slot-${(index)}`"
                :clearMask="clearMask"
                :default-value="chooseValue[index]"
                :is-update="isUpdate"
                :list-data="item"
                @chooseItem="chooseItem"
                :key="index"
                :key-index="index"
                :lastChange="lastChange"
                :rows="rows"
                :isLoop="isLoop"
            ></picker-slot>
        </div>
    </div>
</itv-dialog>    
</template>
<script>
import pickerSlot from "./picker-slot.vue";
import ItvDialog from "../dialoger/index.vue";
export default {
    name:'itv-picker',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        hideOnClick:{
            type: Boolean,
            default: true
        },
        items: {
            type: Array,
            default: () => []
        },
       
        lastChange: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number, 
            default: 5
        },
        isLoop: {
            type: Boolean,
            default: false
        },
        titleBar: {
            type: Boolean,
            default: true
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        confrimText: {
            type: String,
            default: "确认"
        },
        title: {
            type: String,
            default:"请选择"
        },
        soltName: {
            type:String,
            default:"outer"
        },
        className: {
            type: String,
            default: ''
        },
        pickerClassName: {
            type: String,
            default: ''
        },
        defaultValue:{
            type: Array,
            default: ()=>[]
        },
        clearMask:{
            type: Boolean,
            default: false
        }
    },
    components: {
        pickerSlot,
        ItvDialog
    },
    computed: {
        isForbidConfirm() {
            let isForbid = false;
            this.selceted.forEach(item=>{
                if(item.forbid){
                    isForbid = true;
                }
            })
            
            return isForbid
        }
    },
    data() {
        return {
            chooseValue: this.defaultValue,
            cacheValueData: [],
            isUpdate: false,
            currentValue: this.value,
            list:[],
            selceted:[]
        };
    },
    watch: {
        value(n) {
            this.currentValue = n;
        },
        currentValue(n) {
            this.$emit('input', n)
        },
        defaultValue(n) {
            this.chooseValue = n;
        }
    },
    mounted() {
        

    },
    methods: {
        init() {
            this.list = [];
            this.selceted = [];
            this.list[0] = this.items.map(item=>{
                return item;
            })
        },   
        chooseItem(res, index) {
            this.$set(this.selceted, index, res);
            if(res.value != this.chooseValue[index]){
                
                this.chooseValue[index] = res.value;
            }
            if(res && res.children&&res.children.length>0) {
                this.$set(this.list, index+1, res.children)
            }
        },
        closePicker() {
            this.$emit('input', false)
        },
        confirm() {
            if(this.isForbidConfirm) return;
            this.$emit('onConfirm', this.selceted);
        }
    },
    created() {
        
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-picker.less';
</style>