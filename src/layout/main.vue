<template>
    <div class="itv-page-content"><slot /></div>
</template>
<script lang="ts">

import {defineComponent } from 'vue'
export default defineComponent({
    name:"ItvMain"
})
</script>

<style lang="less" >
.itv-page-content{
    flex: 1;
    overflow-y: auto;
    
}
</style>
