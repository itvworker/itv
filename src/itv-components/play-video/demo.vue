<template>
  <itv-container>
        <itv-header>playVideo</itv-header>
        <itv-main>
            <play-video :videos="videos" ref="center" />
        </itv-main>
  </itv-container>
</template>

<script>

let arr =[
    {

        url:"https://vd4.bdstatic.com/mda-idjp0airqugk02s7/1080p/mda-idjp0airqugk02s7.mp4?v_from_s=gz_videoui_4135&auth_key=1613477661-0-0-f5ee6be70f9d4994cfe9d2a9df186e85&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=8_1"
    },
    {
        url:"http://ugcws.video.gtimg.com/uwMROfz2r57AoaQXGdGnC2dePkZ-vrEzrP3V58KNfh1xTd-l/szg_9473_50001_0b6bjqaayaaalqabegraurqfctgdbrgaadca.f622.mp4?vkey=1F9F97E2B02E2E0B9825D2EBEBA9A9DAD53270753A44D93721C7F93FEA6DB1BE436335667EBCA31178AFA3C63A7ABDE5EA6DC1BCA9CB351A49E93DE05EE287A62615F955CECBF7E966A3ACA0338164D0A605EFE88D5BA82CCC345C7D85FDD590DABF04014D401952D0395F7FF82C892AAFDA61711D5E639ACAF1274486C454C0&br=110&platform=2&fmt=auto&level=0&sdtfrom=v1010&guid=fc528261e56b43af4f987553a4493f15"
    }
]
export default {
  data() {
    return {
      videos:arr
     
    };
  },
  created() {
   
  },
  methods: {
      choose(value,index) {
          console.log(index);
      }
  },
  mounted() {

      this.$refs.center.skipChapter(0)
  }
};
</script>
<style lang="less" scoped>

</style>
