<template lang="html">
    <div class="itv-model" @touchmove="preventDefault" >
        <slot name="outer"></slot>
        <transition :name="type==='none'?'none':'itv-fade'">
            <div class="itv-bg" @animationend="animateEnd" @click.stop="close" v-show="value"  :style="{'z-index':zIndex }"></div>
        </transition>
        <!-- <transition :name="animate">
            <div ref="content" :class="className"   v-show="value && html" :style="{'z-index':zIndex+1}">
            </div>
        </transition> -->
        <!-- <div v-show="!isIos">
            <transition :name="animate" v-show="!isIos" >
                <div @animationend="onEnd"   :class="[{'itv-opc': opc},className]"   v-show="value && !html" :style="{'z-index':zIndex+1}">
                    <slot></slot>
                </div>
            </transition>
        </div> -->
        <div v-show="iosShow && html" ref="content" v-html="content" :style="{'z-index':zIndex+1}" class="itv-ios-dialog" @transitionend="animateEnd" :class="[classNameIos, iosShowAnimate?animateIos:'']">
            <slot></slot>
        </div>

        <div v-show="iosShow && !html" :style="{'z-index':zIndex+1}"  class="itv-ios-dialog" @transitionend="animateEnd" :class="[classNameIos, iosShowAnimate?animateIos:'']">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'itv-dialoger',

    props: {
        value: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'center'
        },
         opacity:  {
            type: Number,
            default:1
        },  
        zIndex: {
            type: Number,
            default:200
        },  
        hideOnClick: {
            type: Boolean,
            default: false
        },
        html: {
            type: String,
            default: ''
        },
        isRoot:{
            type: Boolean,
            default: false
        }

    },
    computed: {
       
         animateIos() {
            switch (this.type) {
                case 'bottom':
                    return 'itv-ios-slide-bottom'
                case 'top':
                    return 'itv-ios-slide-top'
                case 'none':
                    return 'itv-ios-none';    
                case 'left':
                    return 'itv-ios-slide-left';
                case 'right':
                    return 'itv-ios-slide-right';        
                default:
                    return 'itv-ios-slide-center'
            }
        },
        classNameIos() {
            switch (this.type) {
                case 'center':
                    return 'itv-ios-dialog-center'
                case 'bottom':
                    return 'itv-ios-dialog-bottom'
                case 'top':
                    return 'itv-ios-dialog-top' 
                case 'left':
                    return 'itv-ios-dialog-left' 
                 case 'right':
                    return 'itv-ios-dialog-right'             
                default:
                    return 'itv-ios-dialog'
                    break;
            }
        },
        domShow() {
            if(typeof html === 'object') {
                return true
            }
            return  false
        },
        isIos() {
            return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        }
    },
    data() {
        return {
            content: '',
            iosShow: false,
            iosShowAnimate: false
        }
    },
    watch: {
        value(a,b) {
            if(!a) {
                this.iosShowAnimate = false;
                this.$emit('onHide');
                return
            }else{
                this.iosShow = true;
                setTimeout(()=>{
                    this.iosShowAnimate = true;
                },5)
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
            this.$nextTick(()=>{
                this.$refs.content.appendChild(a)
                this.$refs.content.style.display = '';
            })
          

        }
    },
    methods: {
        animateEnd() {
            if(!this.value){
                this.iosShow = false;
               
            }
        },
        close() {
           
            if(!this.hideOnClick) return
            this.$emit('input', false);
            this.$emit("hide", false);
        },
        preventDefault(e) {
            e.preventDefault()
        }
    },
    beforeDestroy() {
        if(this.isRoot) {
            document.body.removeChild(this.$el);
        }
    },
    mounted() {
        if(this.isRoot) {
            document.body.append(this.$el);
        }
    }

}
</script>


<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import '../../assets/css/animate.less';
@import 'itv-dialoger.less';
</style>
