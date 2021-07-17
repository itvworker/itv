import { createApp } from 'vue'
import App from './App.tsx'
import routers from './router/index.tsx';
import layout from './layout';
import '@/assets/css/index.less';
import 'lib-flexible'
import itv from './index.ts';

const app = createApp(App)


app.use(routers);
app.use(itv);
app.use(layout)
app.mount('#app')

