import Component from '../components/cascader/index.vue'
import merge from '../libs/merge.js'

let $vm

const plugin = {
    install (vue, pluginOptions = {}) {
        const componet = vue.extend(Component)
        if (!$vm) {
            $vm = new componet({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
      



        const cascader = {
            show (options = {}) {
                merge($vm, options) 
                $vm.value = true;
            },
           
            hide () {
                $vm.value = false
            },
            state () {
                return $vm.value
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.prototype.$itv) {
            vue.prototype.$itv = {
                cascader
            }
        } else {
            vue.prototype.$itv.cascader = cascader
        }

       
    }
}

export default plugin
export const install = plugin.install

