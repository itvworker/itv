<template>
    <itv-container class="page-dialog">
        <itv-header>popup</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <itv-cell :isLink="true" @click="confirm('html')" :showIcon="true" title="Confirm">
                </itv-cell>

                <itv-cell :isLink="true" @click="alert('html')" :showIcon="true" title="Alert">
                </itv-cell>

                <itv-cell :isLink="true" @click="alertShow()" :showIcon="true" title="定时关闭">
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
          this.$itv.popup.confirm({
              title:"你是谁",
              content:"我是提示的内容",
              hideOnClick: true
          })
      },
      alert() {
            this.$itv.popup.alert({
                title:"你是谁",
                content:"我是提示的内容",
                hideOnClick: true,
                
                onHide() {
                    console.log('hide---');
                },
                onConfirm() {
                    console.log('confirm---');
                }
            })
      },
      alertShow() {
          this.$itv.popup.alert({
                title:"你是谁",
                content:"我是最顶层内容",
                hideOnClick: false,
                closeType: 'click',   
                isTop: false, 
                onHide() {
                    console.log('hide---');
                },
                onConfirm() {
                    console.log('confirm---');
                }
            })
      },
      page() {
          console.log('page------');
      }
  },
  mounted() {
      this.alertShow();
      setTimeout(()=>{
           this.$itv.popup.alert({
                title:"你是谁",
                content:"我是人类",
                hideOnClick: false,
                closeType: 'click',   
                isTop: true, 
                onHide() {
                    console.log('hide---');
                },
                onConfirm() {
                    console.log('confirm---');
                }
            })
      }, 3000)
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
