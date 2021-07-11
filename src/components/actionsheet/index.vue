<template lang="html">
    <itv-dialog v-model="currentValue" :hideOnClick="hideOnClick" type='bottom'>
        <div class="itv-acitonsheet" :class="{'ios-safe-area':iosSafeArea}"   :style="{'z-index':zIndex+1}">
            <div class="itv-item" :class="{'itv-active': current === index}" v-for="(item, index) in items" v-show="!item.hideMeun" :key="index" @click="confirm(item)">
                {{item.text}}
            </div>
            <div class="itv-item itv-cancel" @click.stop="close" v-show="!hideBtnCancel">
                {{cancelText}}
            </div>
        </div>
    </div>
    </itv-dialog>
</template>

<script>
import ItvDialog from "../dialoger/index.vue";
export default {
    name: "itv-actionsheet",
    components: {
        ItvDialog
    },
    props: {
        items: {
            type: Array,
            default: () => []
        },
        zIndex: {
            type: Number,
            default: 999
        },
        //是否显示
        value: {
            type: Boolean,
            default: false
        },
        //点击遮罩层是否关闭
        hideOnClick: {
            type: Boolean,
            default: true
        },
        //是否取显示取消按钮
        hideBtnCancel: {
            type: Boolean,
            default: false
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        current: {
            type: Number,
            default: null
        },
        iosSafeArea:{
            type:Boolean,
            default: false
        },
        teleport:{
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            status: false,
            currentValue: this.value,
            nextTarget:null,
            parentTarget:null
        }
    },
    watch: {
        value(a, b) {
          
            if (!a) {
                if(this.teleport) {
                    if(this.nextTarget) {
                        this.parentTarget.insertBefore(this.$el, this.nextTarget)
                    }else{
                        this.parentTarget.appendChild(this.$el)
                    }
                }
             
            }else{
                this.status = false;
                if(this.teleport) {
                    document.body.appendChild(this.$el);
                }
                this.currentValue = true; 
                 
            }
            
            
        },
        currentValue(n) {
            if(!n) {
                this.$emit("onHide");
                this.$emit("input", false);
            }
        }
    },
    methods: {
        cancel() {
            //不过目前不支持阿拉
            this.$emit("onHide");
            this.$emit("onCancel");
            this.$emit("input",false);
            this.currentValue = false;
        },
        confirm(item) {
            
            this.$emit("onHide");
            this.$emit("onConfirm", item);
            this.$emit("input",false);
            this.currentValue = false;
        },
        close() {
           
            if(!this.hideOnClick) return;
            this.$emit("onHide");
            this.$emit("input",false);
            this.currentValue = false;
        },
     
    },
    mounted() {
        if(this.teleport) {
            this.nextTarget = this.$el.nextSibling;
            this.parentTarget = this.$el.parentNode;
        }
    }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-actionsheet.less';
</style>

