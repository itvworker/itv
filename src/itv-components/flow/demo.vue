<template>
    <itv-container class="page-dialog">
        <itv-header>dialog</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <itv-flow>
                    容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容
                     容 容 容 容
                      容

                       容
                        容
                </itv-flow>
                <itv-flow>
                    容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容
                     容 容 容 容
                      容

                       容
                        容
                </itv-flow>
                <itv-flow>
                    容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容 容
                     容 容 容 容
                      容

                       容
                        容
                </itv-flow>
              
            
            </section>
        </itv-main>
        
       
    </itv-container>

</template>

<script>
export default {
  data() {
    return {
        show:false,
        bottomShow: false,
        topshow: false
    };
  },
  methods: {
      open() {
          this.show = true
      },
      plugin(value) {
          if(value){
              this.$itv.dialog.show({
                  html: 'weg'
              })
          }else{
              this.$itv.dialog.show({
                  html: this.$refs.page
              })
          }

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
.slide-bottom{
    background-color: #fff;
    height: 400ipx;
    width: 100%;
}
.dialog-center{
    width: 200ipx;
    height: 200ipx;
    background-color: #fff;
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>
