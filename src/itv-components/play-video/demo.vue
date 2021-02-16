<template>
  <itv-container>
        <!-- <itv-header>playVideo</itv-header> -->
        <itv-main>
            <play-video :videos="videos" ref="center" />
        </itv-main>
  </itv-container>

</template>

<script>

let arr =[
    {

        url:"http://ugccsy.qq.com/uwMROfz2r57CIaQXGdGnC2dePkZqjjlJK4UbWCf8jsE_RNpY/szg_3715_50001_0bf2taaagaaaliabaxi5v5qfdggdaomaaa2a.f622.mp4?vkey=22DBE15DF26339087B7BB8FC20375181291D7A33F498F02F4D8B9ED475146F2FB3A070C6BE6A2A600BC027683A0B3269149FA91555A2C0789EC8B6664FB41914359ED129070E73918AFB1120619E4C102DBEA9F9378CB658031C7FFDFC9A5CF7EFC5B162055BF95FF39ECA014CE6D419D58DD6758577A0D4467A18F0582EB0B5&br=175&platform=2&fmt=auto&level=0&sdtfrom=v1010&guid=fc528261e56b43af4f987553a4493f15"
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
