<template>
    <itv-container class="page-dialog">
        <itv-header>Progress</itv-header>
        <itv-main>
            <div class="h10"></div>
            <progress-bar class="progress" v-model="percent" strokeColor="rgba(255,15,16,1)"/>

           
        </itv-main>
    </itv-container>

</template>

<script>
export default {
  data() {
    return {
        percent: 50,
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
