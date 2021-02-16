export default [
    {
        path:'/demo',
        name:'itv_demo_index',
        component: () => import('@/pages/demo/index.vue'),
        redict:'itv_demo_enter',
        children:[
            {
                path: 'index',
                name: 'itv_demo_enter',
                component: () => import('@/pages/demo/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'iTV',
                },
            },
            {
                path: '/demo/picker',
                name: 'itv_picker',
                component: () => import('@/itv-components/picker/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'picker',
                },
            },
            {
                path: '/demo/actionsheet',
                name: 'itv_actionsheet',
                component: () => import('@/itv-components/actionsheet/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'picker',
                },
            },
            {
                path: 'cliper',
                name: 'itv_cliper',
                component: () => import('@/itv-components/cliper/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'cliper',
                },
            },
            {
                path: '/demo/toast',
                name: 'itv_toast',
                component: () => import('@/itv-components/toast/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'toast',
                },
            },
            {
                path: '/demo/cell',
                name: 'itv_cell',
                component: () => import('@/itv-components/cell/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'cliper',
                },
            },
            {
                path: '/demo/elevator',
                name: 'itv_elevator',
                component: () => import('@/itv-components/elevator/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'cliper',
                },
            },
            {
                path: '/demo/slider',
                name: 'itv_slider',
                component: () => import('@/itv-components/slider/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'slider',
                },
            },
            {
                path: '/demo/dialoger',
                name: 'itv_dialog',
                component: () => import('@/itv-components/dialoger/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'dialog',
                },
            },
            {
                path: '/demo/popup',
                name: 'itv_popup',
                component: () => import('@/itv-components/popup/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'popup',
                },
            },
            {
                path: '/demo/scroller',
                name: 'itv_scroller',
                component: () => import('@/itv-components/scroller/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            {
                path: '/demo/slideout',
                name: 'itv_slideout',
                component: () => import('@/itv-components/slideout/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            {
                path: '/demo/drawer',
                name: 'itv_drawer',
                component: () => import('@/itv-components/drawer/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'scroller',
                },
            },
            {
                path: '/demo/schedule',
                name: 'itv_slide_schedule',
                component: () => import('@/itv-components/schedule/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'schedule',
                },
            },
            {
                path: '/demo/touch-circle',
                name: 'itv_circle',
                component: () => import('@/itv-components/touch-circle/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'circle',
                },
            },
            {
                path: '/demo/swiper',
                name: 'itv_swiper',
                component: () => import('@/itv-components/mini-swiper/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'mini-swiper',
                },
            },
            {
                path: '/demo/popup',
                name: 'itv_popup',
                component: () => import('@/itv-components/popup/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'popup',
                },
            },
            {
                path: '/demo/datetime',
                name: 'itv_datetime',
                component: () => import('@/itv-components/datetime/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'datetime',
                },
            },
            {
                path: '/demo/datepicker',
                name: 'itv_datepicker',
                component: () => import('@/itv-components/datepicker/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'datepicker',
                },
            },
           
           
            {
                path: '/demo/calendar-time',
                name: 'itv_calendar-time',
                component: () => import('@/itv-components/calendar-time/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'calendar-time',
                },
            },

            {
                path: '/demo/schedule',
                name: 'itv_schedule',
                component: () => import('@/itv-components/schedule/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'schedule',
                }
            },
            {
                path: '/demo/slivers',
                name: 'itv_slivers',
                component: () => import('@/itv-components/sliver-container/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'slivers',
                }
            },
            {
                path: '/demo/text2img',
                name: 'itv_text2img',
                component: () => import('@/itv-components/text2img/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'text2img',
                }
            },
            {
                path: '/demo/cascader',
                name: 'itv_cascader',
                component: () => import('@/itv-components/cascader/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'Cascader',
                }
            },
            {
                path: '/demo/form',
                name: 'itv_form',
                component: () => import('@/itv-components/form/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'Cascader',
                }
            },
            {
                path: '/demo/playVideo',
                name: 'itv_playVideo',
                component: () => import('@/itv-components/play-video/demo.vue'),
                meta: {
                    keepAlive: false,
                    title: 'playVideo',
                }
            },

            
            

        ]
    },  
    

]
