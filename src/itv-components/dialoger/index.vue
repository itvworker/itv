<template lang="html">
    <div class="itv-model" @touchmove="preventDefault" >
        <slot name="outer"></slot>
        <transition :name="type==='none'?'none':'itv-fade'">
            <div class="itv-bg" @click.stop="close" v-show="value"  :style="{'z-index':zIndex }"></div>
        </transition>
        <transition :name="animate">
            <div ref="content" :class="className"   v-show="value && html" :style="{'z-index':zIndex+1}">
            </div>
        </transition>
        <transition :name="animate"  >
            <div @animationend="onEnd"   :class="[{'itv-opc': opc},className]"   v-show="value && !html" :style="{'z-index':zIndex+1}">
                <slot></slot>
            </div>
        </transition>
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
            type:String,
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
        }

    },
    computed: {
        animate() {
            switch (this.type) {
                case 'bottom':
                    return 'itv-slide-top'
                case 'top':
                    return 'itv-slide-bottom'
                case 'none':
                    return 'none';    
                case 'left':
                    return 'itv-slide-left';
                case 'right':
                    return 'itv-slide-right';        
                default:
                    return 'itv-dialog'
            }
        },
        className() {
            switch (this.type) {
                case 'center':
                    return 'itv-dialog'
                case 'bottom':
                    return 'itv-dialog-bottom'
                case 'top':
                    return 'itv-dialog-top' 
                case 'left':
                    return 'itv-dialog-left' 
                 case 'right':
                    return 'itv-dialog-right'             
                default:
                    return 'itv-dialog'
                    break;
            }
        },
        domShow() {
            if(typeof html === 'object') {
                return true
            }
            return  false
        }
    },
    data() {
        return {
            content: '',
            opc: true
        }
    },
    watch: {
        value(a,b) {
            if(!a) {
                this.$emit('onHide');
                return
            }else{
                
                setTimeout(()=>{
                    this.opc = false;   
                },10)
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
            this.$emit("hide", false);
        },
        state() {
            return this.value
        },
        preventDefault(e) {
            e.preventDefault()
        },
        onEnd() {
            if(!this.value) {
                this.opc = true;
            }
            
        }
    }

}
</script>


<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import '../../assets/css/animate.less';
@import 'itv-dialoger.less';
</style>
