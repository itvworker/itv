import Component from '../itv-components/cascader/index.vue'
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
                options.isLast = false;
                $vm.currentSelect = [];
                merge($vm, options) 
                $vm.currentSelect = $vm.selected;
                $vm.value = true;
                $vm.$off('hide')
                $vm.$off('confirm');
                $vm.$off('select')
                $vm.init();
                $vm.$on('select', (msg)=>{
                    if(options.onSelect) {
                        options.onSelect(msg)
                    }
                })

                $vm.$on('confirm', (msg) => {
                    if(options.onConfirm) {
                        options.onConfirm(msg)
                    }
                    $vm.value = false;
                })
                $vm.$on('input', (msg) => {
                    $vm.value = msg;
                })

                
            },
            
            hide () {
                $vm.value = false
            },
            isVisible () {
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

