import PluginComponent from "../components/actionsheet/index.vue"
import merge from '../libs/merge'
import { createApp, defineComponent } from 'vue';
let $vm
const plugin = {
    install (app, options = {}) {
        if (!$vm) {
            const Component = defineComponent(PluginComponent);
            debugger
        }
        

        const opts = {
            show (options) {
               
              
                console.log($vm);
                if (typeof options === 'object') {
                    
                    merge($vm, options)
                }

                $vm.$off('onHide')
                $vm.$off('onConfirm')
                $vm.$off('onCancel')

                $vm.$on('onHide', (msg) => {
                    options && options.onHide && options.onHide(msg)
                    $vm.value = false
                })

                
                $vm.$on('onConfirm', (msg) => {
                    options && options.onConfirm && options.onConfirm(msg);
                    $vm.value = false
                })
                $vm.value = true
            },
            hide () {
                $vm.value = false
            },
            isVisible () {
                return $vm.value
            }
        }

        if (!app.config.globalProperties.$itv) {
            app.config.globalProperties.$itv = {}
        }
        app.config.globalProperties.$itv.actionsheet = opts;
      
    }
}

export default plugin
export const install = plugin.install
