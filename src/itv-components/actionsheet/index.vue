<template lang="html">
    <div class="itv-ui" @touchstart="clickStatus">
         <transition name="itv-fade">
            <div class="itv-bg" @click.stop="close"  v-show="value"  :style="{'z-index':zIndex}"></div>
        </transition>
        <transition name="itv-slide-top" >
            <div class="itv-acitonsheet" :class="{'ios-safe-area':iosSafeArea}"  v-show="value" :style="{'z-index':zIndex+1}">
                <div class="itv-item" :class="{'itv-active': current === index}" v-for="(item, index) in items" :key="index" @click="confirm(item)">
                    {{item.text}}
                </div>
                <div class="itv-item itv-cancel" @click.stop="close" v-show="!hideBtnCancel">
                    {{cancelText}}
                </div>
            </div>
        </transition>
    </div>
   
</template>

<script>
export default {
    name: "actionsheet",
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
            }
        }
    },
    methods: {
        cancel() {
            if(!this.status) return
            this.$emit("hide");
            this.$emit("cancel");
            this.$emit("input",false);
        },
        confirm(item) {
            if(!this.status) return
            this.$emit("hide");
            this.$emit("confirm", item);
            this.$emit("input",false);
        },
        close() {
            if(!this.status) return;
            if(!this.hideOnClick) return;
            this.$emit("hide");
            this.$emit("input",false);
        },
        clickStatus() {
           this.status = true;
        }
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

