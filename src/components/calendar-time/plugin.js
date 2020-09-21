import PluginComponent from './index.vue'
import merge from '../../libs/merge'

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
                if (typeof options === 'object') {
                    merge($vm, options)
                }
                $vm.init();    
                $vm.isVisible = true;
                $vm.$nextTick(()=>{
                    $vm.resize()
                })
                
                $vm.$off('hide')
                $vm.$off('confirm')

               
                $vm.$on('confirm', (msg) => {
                    if(options.confrim) {
                        options.confirm(msg)
                    }
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
        vue.prototype.$itv.calendarTime = opts
      
    }
}

export default plugin
export const install = plugin.install
