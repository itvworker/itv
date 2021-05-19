<template>
<itv-dialog v-model="currentValue" :hideOnClick="hideOnClick" type="bottom">
    <div class="itv-picker-ui" :class="className" :slot="soltName"> 
        <div class="title-bar" v-if="titleBar">
            <div class="left-btn" @click="closePicker">{{cancelText}}</div>
            {{title}}
            <div class="right-btn" @click="confirm">{{confrimText}}</div>
        </div>
        <div class="itv-picker-panel">
            <picker-slot :class="pickerClassName"  v-for="(item, index) of listData" :ref="`picer-slot-${(index)}`"
                :default-value="chooseValueData[index]"
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
        listData: {
            type: Array,
            default: () => []
        },
        defaultValueData: {
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
        }
    },
    components: {
        pickerSlot,
        ItvDialog
    },
    computed: {
        list() {
            
            return JSON.parse(JSON.stringify(this.listData))
        }
    },
    data() {
        return {
            chooseValueData: [],
            cacheValueData: [],
            isUpdate: false,
            currentValue: this.value
        };
    },
    watch: {
        'defaultValueData': function() {
            this.chooseValueData = [...this.defaultValueData];
            this.cacheValueData = [...this.defaultValueData];
            // this.$emit('onConfirm', this.cacheValueData);
        },
        value(n, o) {
          
            this.currentValue = n;
        },
        currentValue(n) {
          
            if(!n) {
                this.$emit('input', false);
                this.$emit('onCancel');
            }
            
        }
    },
    mounted() {
        

    },
    methods: {
        closePicker() {
            this.$emit('onCancel')
        },
        updateChooseValue(self, index, value) {
            self.cacheValueData.splice(index, 1, value);
            let ref = `picer-slot-${index}`;
            self.$refs[ref][0].updateTransform(value);
        },


        closeActionSheet() {
            this.isUpdate = !this.isUpdate;
            this.cacheValueData = [...this.chooseValueData];
            this.$emit('onCancel');
            this.$emit('onCancelUpdate', this, this.chooseValueData);
        },

        confirm() {
            this.$emit('onConfirm', this.cacheValueData);
            this.chooseValueData = [...this.cacheValueData];
            this.$emit('onCancel');
        },

        chooseItem(value, index) {
            if (this.cacheValueData[index] !== value) {
                this.cacheValueData[index] = value;
                this.$emit('onChoose', index, value, this.cacheValueData);
            }
        }
    },
    created() {
        if (this.defaultValueData && this.defaultValueData.length) {
            this.chooseValueData = [...this.defaultValueData];
        } else {
            let defaultValueData = [];
            this.listData.forEach((item, index) => {
                defaultValueData.push(item[0]);
            });
            this.chooseValueData = [...defaultValueData];
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-picker.less';
</style>