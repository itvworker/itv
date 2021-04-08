import PopupComponent from '../itv-components/popup/index.vue'
import merge from '../libs/merge.js'

let $vm

const plugin = {
    install (vue, pluginOptions = {}) {
        const Popup = vue.extend(PopupComponent)
        if (!$vm) {
            $vm = new Popup({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        function init () {
            let def = {
                value: false,
                hideOnClick: false,
                hideBtnCancel: false,
                confirmText: '确认',
                cancelText: '取消',
                title: '',
                content: '' }
                merge($vm, def)   
        }
        const popup = {
            alert (options = {}) {
                init()
                merge($vm, options) 
                $vm.value = true
                $vm.hideBtnCancel = true
               

                $vm.$on('onConfirm', () => {
                    $vm.value = false
                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })

                $vm.$on('onHide', () => {
                    if (options.onHide) {
                        options.onHide()
                    }
                    $vm.$off('onCancel')
                    $vm.$off('confirm')
                    $vm.$off('hide')
                })
            },
            confirm (options = {}) {
                init()
                merge($vm, options) 
                $vm.value = true
                $vm.hideBtnCancel = false
                $vm.$on('onCancel', () => {
                    $vm.value = false
                    if (options.onCancel) {
                        options.onCancel()
                    }
                })

                $vm.$on('onConfirm', () => {
                    $vm.value = false
                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })
                

                $vm.$on('onHide', () => {
                    if (options.onHide) {
                        options.onHide()
                    }
                    $vm.$off('onCancel')
                    $vm.$off('onConfirm')
                    $vm.$off('onHide')
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
                popup
            }
        } else {
            vue.prototype.$itv.popup = popup
        }

       
    }
}

export default plugin
export const install = plugin.install
