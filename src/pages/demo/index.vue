<template>
<transition :name="aniName">
     <router-view />
</transition>
   
</template>
<script>
export default {
    data() {
        return {
            aniName:''
        }
    },
    watch: {
        $route(to, from) {
            let totemp = to.query.itvtemp
            let fromtemp = from.query.itvtemp;
            if(totemp>fromtemp) {
                this.aniName =  'itv-demo-left'
                return
            }
                this.aniName =  'itv-demo-right'
        }
    }
}
</script>
<style lang="less">
@font-face {
  font-family: 'itvdemo';  /* project id 1994629 */
  src: url('//at.alicdn.com/t/font_1994629_o9boynnvnik.eot');
  src: url('//at.alicdn.com/t/font_1994629_o9boynnvnik.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1994629_o9boynnvnik.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1994629_o9boynnvnik.woff') format('woff'),
  url('//at.alicdn.com/t/font_1994629_o9boynnvnik.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1994629_o9boynnvnik.svg#itvdemo') format('svg');
}

*[class^="itv-demo-icon"] {
  font-family: "itvdemo" !important;
  font-size: 26ipx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.itv-demo-icon-cliper::before {
    content: '\e624';
}
.itv-demo-icon-swiper::before {
    content: '\e72c';
}
.itv-demo-icon-toast::before {
    content: '\e7e8';
}

.itv-demo-icon-dialog::before {
    content: '\e69f';
}

.itv-demo-icon-popup::before {
    content: '\e6c5';
}

.itv-demo-icon-circle::before {
    content: '\e600';
}

@ani-sec: .3s;
.itv-demo-left-enter-active,
.itv-demo-left-leave-active {
    transition: transform @ani-sec;
   
    top: 0;
    position: absolute;
    width: 100%;
    transform: translate3d(0,0,0);
}

.itv-demo-left-enter {

    transform: translate3d(100%,0,0);
}
.itv-demo-left-leave-to {
    transform: translate3d(-100%,0,0);
}

.itv-demo-right-enter-active,
.itv-demo-right-leave-active {
    transition: transform @ani-sec;
    top: 0;
    position: absolute;
    width: 100%;
    transform: translate3d(0,0,0);
}
.itv-demo-right-enter {
    transform: translate3d(-100%,0,0);
}
.itv-demo-right-leave-to {
    transform: translate3d(100%,0,0);
}

</style>