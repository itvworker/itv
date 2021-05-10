import Vue from 'vue'
import App from './App.vue'
// import watch from 'watch-vue-router'
import router from '@/router'
import store from '@/store'
import i18n from '@/lang'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'lib-flexible'
import './layout'
// import { cascader, cell, pluginCascader } from 'itv-ui';
import itv from 'itv-ui';
import './assets/css/index.less'

// import VConsole from 'vconsole'
// new VConsole()

Vue.use(itv)

Vue.prototype.hljs = function () {
    const preEl = document.querySelectorAll('pre')
    preEl.forEach((el) => {
        hljs.highlightBlock(el)
    })
}
// watch('itvtemp')
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')
