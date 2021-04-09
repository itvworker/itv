<template lang="html">
    <itv-dialog v-model="value" :hideOnClick="hideOnClick">
        <div class="itv-popup">
            <div class="itv-popup-content">
                <slot>
                    <h2 v-html="title" v-show="title"></h2>
                    <div class="itv-popup-msg" v-html="content" v-show="content">
                        {{content}}
                    </div>
                </slot>
            </div>
            <div class="itv-group-btn">
                <div @click="cancel" :class="{'forbid-click': this.closeType === 'click' && this.sec > 0}" :style="{'color': this.cancelTextColor}" v-show="!hideBtnCancel" class="itv-popup-cancel">
                    {{cancelText}}
                </div>
                <div @click="confirm" :class="{'forbid-click': this.closeType === 'click' && this.sec > 0}" :style="{'color': this.confirmTextColor}" class="itv-popup-confirm">
                    {{confirmText}}<span v-if="closeType!=='none'&& sec >0">({{sec}}s)</span>
                </div>
            </div>
        </div>
    </itv-dialog>
</template>

<script>
import ItvDialog from "../dialoger/index.vue";
export default {
    name: "itv-popup",
    props: {
        //是否显示
        value: {
            type: Boolean,
            default: false
        },
        //点击遮罩层是否关闭
        hideOnClick: {
            type: Boolean,
            default: false
        },
        //是否取显示取消按钮
        hideBtnCancel: {
            type: Boolean,
            default: false
        },
        confirmText: {
            type: String,
            default: "确认"
        },
        confirmTextColor: {
            type: String,
            default: null
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        cancelTextColor: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        seconds:{
            type: Number,
            default: 3
        },
        closeType: {
            type: String,
            default: 'none' //click关闭  auto自动关闭
        },
        isTop: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ItvDialog
    },
    data() {
        return {
            sec: 0,
            timeinter: null
        }
    },
    watch: {
        value(a, b) {
            if(this.timeinter) {
                clearInterval(this.timeinter)
            }
            if (!a) {
                this.$emit("onHide");
                this.sec = 0;
               
            }else{
                this.sec = this.seconds;
                if(this.closeType !== 'none') {
                   this.timeinter = setInterval(() => {
                        if(this.sec>0) {
                            this.sec--;
                        }
                        if(this.sec===0) {
                            clearInterval(this.timeinter)
                            if(this.closeType === 'auto') {
                                this.$emit('onHide')
                            }
                        }
                    }, 1000);
                }
            }
        }
    },
    methods: {
        cancel() {
            if(this.closeType === 'click' && this.sec > 0) {
                return
            }
            this.$emit("onCancel");
            this.$emit("onHide");

        },
        confirm() {
            if(this.closeType === 'click' && this.sec > 0) {
                return
            }
            this.$emit("onConfirm");
            this.$emit("onHide");
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import "../../assets/css/animate.less";
@import 'itv-popup.less';
</style>
