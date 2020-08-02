<template lang="html">
    <div class="itv-model" :class="className">
        <transition name="itv-fade">
            <div class="itv-bg" @click.stop="close" v-show="value"  :style="{'z-index':zIndex}"></div>
        </transition>
        <transition name="itv-dialog">
            <div class="itv-dialog"   v-show="value" :style="{'z-index':zIndex+1}">
                <div v-show="content"  v-html="content"></div>
                <div v-show="domShow" ref="content"></div>
                <slot></slot>
            </div>
        </transition>
    </div>

</template>

<script>
export default {
    name:'itv-dialog',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default:99
        },
        className: {
            type: String,
            default: ''
        },
        hideOnClick: {
            type: Boolean,
            default: false
        },
        html: {
            type: String,
            default: ''
        }

    },
    computed: {
        domShow() {
            if(typeof html === 'object') {
                return true
            }
            return  false
        }
    },
    data() {
        return {
            content: ''
        }
    },
    watch: {
        value(a,b) {
            if(!a) {
                this.$emit('onHide');
                return
            }
            this.$emit('onShow')
        },
        html(a, b) {
            this.$refs.content.innerHTML= ''
            if(!a){
                this.content = ''
                return
            }

            if(typeof a === 'string') {
                this.content = a;
                this.$refs.content.style.display = 'none'
                return
            }
            this.content = ''
            this.$refs.content.appendChild(a)
            this.$refs.content.style.display = '';

        }
    },
    methods: {
        close() {
            if(!this.hideOnClick) return
            this.$emit('input', false);
        },
        state() {
            return this.value
        }
    }

}
</script>


<style lang="less" scoped>
.itv-bg {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}
.itv-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%,-50%);
}
</style>
