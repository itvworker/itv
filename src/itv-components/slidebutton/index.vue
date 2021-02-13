<template>
    <div
        class="slide-btn"
        @click="$emit('click')"
    >
        <slot />
    </div>
</template>
<script>
export default {
    name: "slideButton"
};
</script>
<style lang="less" scoped>
@import 'itv-slidebutton.less';
</style>
