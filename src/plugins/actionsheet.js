import PluginComponent from "../itv-components/actionsheet/index.vue"
import merge from '../libs/merge'

let $vm
const plugin = {
    install (app, options = {}) {
        const Component = vue.extend(PluginComponent)

        if (!$vm) {
            $vm = new Component({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                }
            })
            document.body.appendChild($vm.$el)
        }

        const opts = {
            show (options) {
                $vm.title = ''
                $vm.codetype = ''
                $vm.params = []
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

        if (!vue.prototype.$itv) {
            app.config.globalProperties.$itv = {}
        }
        app.config.globalProperties.$itv.actionsheet = opts;
      
    }
}

export default plugin
export const install = plugin.install
