<template>
    <div class="itv-drag-outer">
        <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    provide() {
        return {
            itvDrag: this
        }
    },
    methods: {
        restart() {
            this.$emit("start");
        },
        drag(x, y) {
            this.$emit('onDrag', x, y)
        }
    }
}
</script>
<style scoped>
.itv-drag-outer{
    position: relative;
}    
</style>