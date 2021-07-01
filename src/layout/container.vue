<template>
      <section class="itv-main-page">
          <slot></slot>
      </section>
</template>

<script lang="ts">
import {defineComponent } from 'vue'
export default defineComponent({
    name:"ItvContainer"
})
</script>
<style lang="less" scoped>
.itv-main-page{
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
