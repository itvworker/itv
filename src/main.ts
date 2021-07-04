import { createApp } from 'vue'
import App from './App.tsx'
import routers from './router/index.tsx';
import layout from './layout';
import '@/assets/css/index.less';
import 'lib-flexible'

const app = createApp(App)


app.use(routers);
app.config.globalProperties.$itv = {
    name:'itv-content'
}
app.use(layout)
app.mount('#app')

