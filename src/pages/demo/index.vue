<template>
    <router-view />
</template>
<style lang="less">
@font-face {
  font-family: 'itvdemo';  /* project id 1994629 */
  src: url('//at.alicdn.com/t/font_1994629_9fmxwantwcp.eot');
  src: url('//at.alicdn.com/t/font_1994629_9fmxwantwcp.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1994629_9fmxwantwcp.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1994629_9fmxwantwcp.woff') format('woff'),
  url('//at.alicdn.com/t/font_1994629_9fmxwantwcp.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1994629_9fmxwantwcp.svg#itvdemo') format('svg');
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
</style>