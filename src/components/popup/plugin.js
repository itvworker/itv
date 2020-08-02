import PopupComponent from './popup.vue'
import merge from '../../libs/merge.js'

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
        }
        const popup = {
            alert (options = {}) {
                $vm.value = true
                $vm.hideBtnCancel = true
                $vm.$on('cancel', () => {
                    $vm.value = false
                    if (options.onHide) {
                        options.onHide()
                    }
                })

                $vm.$on('confirm', () => {
                    $vm.value = false
                    if (options.onHide) {
                        options.onHide()
                    }

                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })

                $vm.$on('close', () => {
                    $vm.$off('cancel')
                    $vm.$off('confirm')
                })
            },
            confirm (options = {}) {
                reset()
                init(options)
                $vm.value = true
                $vm.hideBtnCancel = false
                $vm.$on('cancel', () => {
                    $vm.value = false
                    if (options.onHide) {
                        options.onHide()
                    }
                })

                $vm.$on('confirm', () => {
                    $vm.value = false
                    if (options.onHide) {
                        options.onHide()
                    }

                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })

                $vm.$on('close', () => {
                    $vm.$off('cancel')
                    $vm.$off('confirm')
                })
            },
            hide () {
                $vm.value = false
            },
            state () {
                return $vm.value
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.$itv) {
            vue.$itv = {
                popup
            }
        } else {
            vue.$itv.popup = popup
        }

        vue.mixin({
            created: function () {
                this.$itv = vue.$itv
            }
        })
    }
}

export default plugin
export const install = plugin.install
