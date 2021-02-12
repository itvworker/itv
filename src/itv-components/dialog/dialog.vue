<template lang="html">

    <div class="itv-model" >
        <transition name="itv-fade">
            <div class="itv-bg" @click.stop="close" v-show="value"  :style="{'z-index':zIndex}"></div>
        </transition>
        <transition :name="animate">
            <div ref="content" :class="className"   v-show="value && html" :style="{'z-index':zIndex+1}">
                
            </div>
        </transition>
        <transition :name="animate"  >
            <div :class="className"   v-show="value && !html" :style="{'z-index':zIndex+1}">
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
        type: {
            type:String,
            default: 'center'
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
                default:
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
            cache: false
        }
    },
    watch: {
        value(a,b) {
            if(!a) {
                this.$emit('onHide');
                return
            }
            this.cache = true;
            setTimeout(()=>{
                this.cache = false;
            },500)

            this.$emit('onShow')
        },
        html(a, b) {
            debugger
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
            if(this.cache)return;
            this.$emit('input', false);
            
        },
        state() {
            return this.value
        }
    }

}
</script>


<style lang="less" scoped>
@import '../../assets/css/animate.less';
.itv-bg {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}
.itv-dialog-bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    left: 0;
    right: 0;
}

.itv-dialog-top {
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    left: 0;
    right: 0;
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
