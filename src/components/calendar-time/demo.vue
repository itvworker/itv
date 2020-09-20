<template>
    <itv-container class="page-dialog">
        <itv-header>calendar-time</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <itv-cell :isLink="true" @click="confirm('html')" :showIcon="true" title="选择日期时间">
                </itv-cell>

                <itv-cell :isLink="true" @click="alert('html')" :showIcon="true" title="日历类型">
                </itv-cell>
            </section>
        </itv-main>
    </itv-container>

</template>

<script>
export default {
  data() {
    return {
        show:false
    };
  },
  methods: {
      open() {
          this.show = true
      },
      confirm(value) {
          this.$itv.calendarTime.show({
               value: '2020-09-12 10:15'
          })
      },
      alert() {
            this.$itv.calendarTime.show({
                value: '2020-09-12 10:15',
                dateType: 'calendar'
            })
      },
      page() {
          console.log('page------');
      }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
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
