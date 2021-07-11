<template lang="html">
    
        <svg viewBox="0 0 100 100"  v-if="value!==false">
            <path :d="bgRadius"
           
            :stroke-linecap="strokeLinecap"
            :stroke="bgStrokeColor"
            :stroke-width="bgStrokeWidth" fill-opacity="0"
            style="transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"
            :style="{'stroke-dashoffset': bgPercent+'px', 'stroke-dasharray':bgLineLong+'px,'+bgLineLong+'px'}"
            ></path>

            <path :d="radius"
            class="progress-line"
            :stroke-linecap="strokeLinecap"
            :stroke="strokeColor"
            :stroke-width="strokeWidth" fill-opacity="0"
            style="transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"
            :style="{'stroke-dashoffset': percent+'px', 'stroke-dasharray':lineLong+'px,'+lineLong+'px'}"
            ></path>
        </svg>
       
    
</template>

<script>
export default {
    name: "itv-progress",
    props: {
        value: {
            type: Number || Boolean,
            default: 0
        },
        bgValue: {
            type: Number || Boolean,
            default: 100
        },
        bgStrokeWidth: {
            type: Number,
            default: 10
        },
        strokeWidth: {
            type: Number,
            default: 10
        },
        bgStrokeColor:{
           type: String,
           default:"rgba(145, 156, 163, 1)" 
        },
        strokeColor:{
           type: String,
           default:"rgba(255, 255, 255, 1)" 
        },
        strokeLinecap: {
            type: String,
            default: 'round' //	butt | round | square | inherit
        },
        anticlockwise: {
            type: Boolean,
            default: false
        }

    },
    computed: {
        percent() {
            let w = 100-this.strokeWidth;
            let line = Math.PI * w;
            if(this.anticlockwise) {
                return -(line - (line / 100) * this.value);
            }
            return line - (line / 100) * this.value;
            // 298.451
        },

        bgPercent() {
            let w = 100-this.bgStrokeWidth;
            let line = Math.PI * w;
            if(this.anticlockwise) {
                return -(line - (line / 100) * this.bgValue);
            }
            return line - (line / 100) * this.bgValue;
        },
        bgRadius() {
            let p = 50-this.bgStrokeWidth/2;
            let w = 100-this.bgStrokeWidth;
            return  `M 50,50 m 0,-${p} a ${p},${p} 0 1 1 0,${w} a ${p},${p} 0 1 1 0,-${w}`
        },
        radius() {
            let p = 50-this.strokeWidth/2;
            let w = 100-this.strokeWidth;
            return  `M 50,50 m 0,-${p} a ${p},${p} 0 1 1 0,${w} a ${p},${p} 0 1 1 0,-${w}`
            // return  `M 50,50 m 0,-${p} a ${p},${p} 0 1 1 0,${w} a ${p},${p} 0 1 1 0,-${w}`
        },
        lineLong() {
            let w = 100-this.strokeWidth;
            let line = Math.PI * w;
            return line
            // return `stroke-dasharray: ${line}px, ${line}px`
        },
        bgLineLong() {
            let w = 100-this.bgStrokeWidth;
            let line = Math.PI * w;
            return line
            // return `stroke-dasharray: ${line}px, ${line}px`
        }
    },
    methods: {
        send() {
            if (this.value === false) {
                this.$emit("input", 0);
                this.$nextTick(() => {
                    this.$emit("restart");
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
.bg-line{
    position: relative;
    z-index: 10;
}

</style>



