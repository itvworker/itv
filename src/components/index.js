import Vue from 'vue'
import ItvCell from './cell'
import ItvToast from './toast/plugin.js'
import ItvElevator from './elevator/index.js'
import ItvSlider from './slider/index.js'
import ItvDialog from './dialog/index.js'
import PluginDialog from './dialog/plugin.js'
import PluginPopup from './popup/plugin.js'

// import './cell/cell.less'
Vue.use(ItvCell);
Vue.use(ItvToast);
Vue.use(ItvElevator);
Vue.use(ItvSlider);
Vue.use(ItvDialog)
Vue.use(PluginDialog);
Vue.use(PluginPopup);
