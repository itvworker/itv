<template>
    <div class="itv-drag-outer"  >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:"itv-drag-outer",
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
        percent(e) {
            e.preventDefault();
            
        },
        restart() {
            this.$emit("onRestart");
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