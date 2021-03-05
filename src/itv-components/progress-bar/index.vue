<template lang="html">
    <div class="progress-bar" @click="send">
        <svg viewBox="0 0 100 100"  v-if="value!==false">
            <path
            d="M 50,50 m 0,-45
        a 45,45 0 1 1 0,90
        a 45,45 0 1 1 0,-90"
            :stroke="bgStrokeColor"
            :stroke-width="bgStrokeWidth" fill-opacity="0"
            ></path>

            <path d="M 50,50 m 0,-45
            a 45,45 0 1 1 0,90
            a 45,45 0 1 1 0,-90"
            stroke-linecap="round"
            :stroke="strokeColor"
            :stroke-width="strokeWidth" fill-opacity="0"
            style="stroke-dasharray: 298.451px, 298.451px;  transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"
            :style="{'stroke-dashoffset': percent+'px'}"
            ></path>
        </svg>
        <slot />
    </div>
</template>

<script>
export default {
    name: "progress-bar",
    props: {
        value: {
            type: Number || Boolean,
            default: 0
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
        }
    },
    computed: {
        percent() {
            return 298.451 - (298.451 / 100) * this.value;
            // 298.451
        },
        bgRadius() {
            
            return  `M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90`
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


