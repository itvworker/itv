<template>
    <itv-container class="page-dialog">
        <itv-header>Progress</itv-header>
        <itv-main>
            <div class="h10"></div>
            <itv-progress class="progress" v-model="percent" strokeColor="rgba(0, 0, 0, 0.45)"/>

            <itv-progress class="progress" v-model="percent" anticlockwise :bgPercent="90"  :strokeWidth="10" :bgStrokeWidth="50" strokeLinecap="butt"  strokeColor="rgba(255,15,16,1)"/>
        </itv-main>
    </itv-container>

</template>

<script>
export default {
  data() {
    return {
        percent: 30,
        show:false
    };
  },
  methods: {
      
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
.progress{
  width: 200ipx;
  height: 200ipx;
}
.page-dialog {
    .page-content{
        display: none;
    }
}
.demo {
  padding-left: 0;
  padding-right: 0;
}
h4 {
  padding: 0 10px;
}
</style>
