import video from './video.vue'
import merge from './libs/merge.js'

export default class Video {
    constructor(vue, lang) {
        vue.component(video.name, video)

        let $el = document.getElementById('vuk-video')
        if ($el) {
            $el.parentNode.removeChild($el)
        }
        const Ctrl = vue.extend(video)
        let instance = new Ctrl().$mount()
        document.body.appendChild(instance.$el)

        let vukVideo = {
            //设置播放资源
            setVideos(videos) {
                instance.videos = videos
            },
            //打开并播放
            openPlay(opts) {
                instance.isShowNav = true
                instance.isShow = true
                instance.selectSpeed = instance.lang.speed
                instance.single = true
                instance.videoStatus = 0
                instance.isLoading = false

                setTimeout(() => {
                    instance.skipChapters(opts.index, opts.duration)
                }, 400)

                instance.$on('play', function(res) {
                    if (opts.play) {
                        opts.play(res)
                    }
                })

                instance.$on('end', function(res) {
                    if (opts.end) {
                        opts.end(res)
                    }
                })

                instance.$on('pause', function(res) {
                    if (opts.pause) {
                        opts.pause(res)
                    }
                })

                instance.$on('screen', function(res) {
                    if (opts.screen) {
                        opts.screen(res)
                    }
                })

                instance.$on('close', function(res) {
                    instance.$off('play')
                    instance.$off('end')
                    instance.$off('close')
                    instance.$off('pause')
                    instance.$off('screen')
                    instance.url = ''
                    instance.clearTime()
                    if (opts.quit) {
                        opts.quit(res, instance.isPause)
                    }
                })
            },
            //跳转时间
            setCurrentTime(value) {
                instance.setVideoCurrentTime(value)
            },
            //插件是否被打开
            isOpen() {
                return instance.isShow
            },
            //获取当前播放时间
            currentTime() {
                return instance.target.currentTime
            },
            //设置语言类型
            setLang(value) {
                instance.langType = value
            },
            getTime() {
                return {
                    currentTime: instance.target.currentTime,
                    duration: instance.target.duration,
                }
            },
            open(opts) {
                if (opts) {
                    instance = merge(instance, opts)
                }
                instance.isShowNav = true
                instance.isShow = true
                instance.skipChapters(opts.nowPlayIndex, opts.duration)
                instance.$once('play', function() {
                    instance.play()
                })
                instance.$once('close', function(res) {
                    instance.url = ''
                    instance.clearTime()
                    if (opts.quit) {
                        opts.quit(res)
                    }
                })
            },
            close() {
                instance.closeVideo()
            },
            //获取组件对象
            component() {
                return instance
            },
            setCategory(value) {
                for (let i in value) {
                    instance[i] = value[i]
                }
            },
        }

        if (vue.prototype.$vuk) {
            vue.prototype.$vuk.video = ukVideo
        } else {
            vue.prototype.$vuk = {
                video: vukVideo,
            }
        }

        return instance
    }
}
