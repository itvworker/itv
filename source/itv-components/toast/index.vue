<template lang="html">
    <div class="itv-ui">

        <div class="itv-bg" v-show="showBg" >

        </div>
        <transition :name="currentTransition">
            <div class="itv-toast" :class="toastClass" v-show="show">
                <!-- <i></i> -->
                <img class="icon" v-show="type!=='text'" :src="icon">

                <p v-if="text">{{text}}</p>
            </div>
        </transition>

    </div>
</template>

<script>
import icons from "./icon.js";
export default {
    name:"toast",
    props: {
        transition: String,
        itvclass: "itv-center",
        position: "middle",
        type: "text",
        text: "默认内容",
        iconColor: {
            type: String,
            default: "rgba(255,255,255,1)"
        },
        showBg: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            show: false
        };
    },
    computed: {
        icon() {
            if (this.type !== "text" && icons[this.type]) {
                return icons[this.type].replace(/iconColor/gi, this.iconColor);
            }
            return "";
        },
        currentTransition() {
            if (this.transition) {
                return this.transition;
            }
            if (this.position === "top") {
                return "itv-slide-from-top";
            }
            if (this.position === "bottom") {
                return "itv-slide-from-bottom";
            }
            return "itv-fade";
        },
        toastClass() {
            return {
                "itvui-toast-forbidden": this.type === "warn",
                "itvui-toast-cancel": this.type === "cancel",
                "itvui-toast-success": this.type === "success",
                "itvui-toast-text": this.type === "text",
                "itv-toast-top": this.position === "top",
                "itv-toast-bottom": this.position === "bottom",
                "itv-toast-middle": this.position === "middle"
            };
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.$emit("input", true);
                this.$emit("show");
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.show = false;
                    this.showBg = false;
                    this.$emit("input", false);
                    this.$emit("hide");
                }, this.time);
            }
        },
        value(val) {
            console.log(val);
            this.show = val;
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-toast.less';
</style>
