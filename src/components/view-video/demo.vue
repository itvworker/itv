<template>
  <itv-container>
        <itv-header>playVideo</itv-header>
        <itv-main>
            <view-video :videos="videos" class="box-video" ref="center" />
        </itv-main>
  </itv-container>
</template>

<script lang="ts">
import ViewVideo from './index';
import {defineComponent} from 'vue';
let arr =[
    {

        url:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        name:"3D动画兔子"
    },
    {
        url:"http://www.w3school.com.cn/example/html5/mov_bbb.mp4",
        name:"3D动画兔子2"
    },
    {
      url:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
      name:"3D动画兔子2"
    },{
      url:"http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4",
      name:"大电影"
    }
]
export default defineComponent({
  components: {
    ViewVideo
  },
  data() {
    return {
        videos:arr
    };
  },
  methods: {
      choose(value,index) {
          console.log(index);
      }
  },
  mounted() {
      this.$refs.center.skipChapter(0)
      
      this.$refs.center.play();
  }
});
</script>
<style lang="less" scoped>
.box-video{
  height: 212ipx;
}
</style>
