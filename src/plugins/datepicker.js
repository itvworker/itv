import PluginComponent from "../itv-components/datepicker/index.vue"
import merge from '../libs/merge'

let $vm
const plugin = {
    install (vue, options = {}) {
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
                $vm.value = true;
                let conform = options.onConfirm;
                let cancel = options.onCancel;
                let hide = options.onHide;
                delete options.onConfirm;
                delete options.onCancel;
                if (typeof options === 'object') {
                    merge($vm, options)
                }
                $vm.init();
                $vm.$off('onHide')
                $vm.$off('onConfirm')
                $vm.$off('onCancel')
                $vm.$off('input')
                $vm.$on('input',(msg)=>{
                    $vm.value = msg;
                })
                $vm.$on('onHide', (msg) => {
                    hide && hide(msg)
                })

                $vm.$on('onConfirm', (msg) => {
                    conform && conform(msg);
                    $vm.value = false;
                })

                $vm.$on('onCancel', (msg) => {
                    cancel && cancel(msg);
                    $vm.value = false;
                })

            },
            hide () {
                $vm.value = false
            },
            isVisible () {
                return $vm.value
            }
        }

        if (!vue.prototype.$itv) {
            vue.prototype.$itv = {}
        }
        vue.prototype.$itv.datepicker = opts;
      
    }
}

export default plugin
export const install = plugin.install
