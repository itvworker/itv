import PickerComponent from '../itv-components/picker/index.vue';
import merge from '../libs/merge.js'

let $vm
const plugin = {
    install(vue, pluginOptions = {}) {
        const Picker = vue.extend(PickerComponent);
        if (!$vm) {
            $vm = new Picker({
                el: document.createElement('div'),
                soltName:"default"
            })
            document.body.appendChild($vm.$el)
            $vm.soltName = 'default';
         
        }   
        
        const picker = {
            show(options= {}) {
                options.value =true;
                options.hideOnClick = true;
                options.soltName = 'default';
                merge($vm, options);
                $vm.value = true;
                $vm.init();
                $vm.$off('onHide')
                $vm.$off('onConfirm');
                $vm.$off('onCancel');
                $vm.$off('input');
                $vm.$off('onChoose');
              
                $vm.$on('input', (msg)=>{
                    $vm.value = msg;
                })

                $vm.$on('onConfirm', (msg) => {
                    if(options.onConfirm) {
                        options.onConfirm(msg)
                    }
                    
                    $vm.value = false;
                })

                $vm.$on('onCancel', (msg) => {
                    if(options.onCancel) {
                        options.onCancel(msg)
                    }
                    $vm.value = false;
                })

                $vm.$on('onHide', (msg) => {
                    if(options.onHide) {
                        options.onHide(msg)
                    }
                    $vm.value = false;
                })

                $vm.$on("onChoose", (index, value, cacheValueData)=>{
                    if(options.onChoose) {
                        options.onChoose(index, value, cacheValueData)
                    }
                  
                })
               
            },
            hide() {
                $vm.value = false
            },
            isVisible() {
                return $vm.value
            }
        }

       
    
        if (!vue.prototype.$itv) {
            vue.prototype.$itv = {
                picker
            }
        } else {
            vue.prototype.$itv.picker  = picker
        }
    }
}


export default plugin
export const install = plugin.install
