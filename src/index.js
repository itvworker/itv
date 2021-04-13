import Actionsheet from './itv-components/actionsheet';
import CalendarTime from './itv-components/calendar-time';
import Cascader from './itv-components/cascader';
import Cell from './itv-components/cell';
import TouchCircle from './itv-components/touch-circle';
import Cliper from './itv-components/cliper';
import Cialoger from './itv-components/dialoger';
import Drawer from './itv-components/drawer';
import Elevator from './itv-components/elevator'
import Loading from './itv-components/loading';
import Picker from './itv-components/picker';
import Popup from './itv-components/popup';
import Schedule from './itv-components/schedule';
import Srcoller from './itv-components/scroller';
import SrcollerElevator from './itv-components/scroller-elevator';
import Slidebutton from './itv-components/slidebutton';
import Slideitem from './itv-components/slideitem';
import Slideout from './itv-components/slideout';
import Sliver from './itv-components/sliver';
import SliverContainer from './itv-components/sliver-container';
import Swiper from './itv-components/swiper';
import SwiperItem from './itv-components/swiper-item';
import Toast from './itv-components/toast';
import Video from './itv-components/video'
import ScrollerCalendar from './itv-components/scroller-calendar'
import Progress from './itv-components/progress'
import Flow from './itv-components/flow'
import Timepicker from './itv-components/timepicker'
import DragBar from './itv-components/drag-bar';
import DragOuter from './itv-components/drag-outer'
import ExpansionTile from './itv-components/expansion-tile'

import PluginActionsheet from './plugins/actionsheet.js';
import PluginCalendarTime from './plugins/calendarTime.js';
import PluginCascader from './plugins/cascader.js';
import PluginDialoger from './plugins/dialoger.js';
import PluginLoading from './plugins/loading.js';
import PluginPopup from './plugins/popup.js';
import PluginToast from './plugins/toast.js';
import PluginPicker from './plugins/picker.js';
export {
    Actionsheet,
    CalendarTime,
    Cascader,
    Cell,
    TouchCircle,
    Cliper,
    Cialoger,
    Drawer,
    Elevator,
    Loading,
    Picker,
    Popup,
    Schedule,
    Srcoller,
    SrcollerElevator,
    Slidebutton,
    Slideitem,
    Slideout,
    Sliver,
    SliverContainer,
    Swiper,
    SwiperItem,
    Toast,
    Video,
    ScrollerCalendar,
    Progress,
    Flow,
    Timepicker,
    DragOuter,
    DragBar,
    ExpansionTile,
    PluginActionsheet,
    PluginCalendarTime,
    PluginCascader,
    PluginDialoger,
    PluginLoading,
    PluginPopup,
    PluginToast,
    PluginPicker
}

let Components = [
    Actionsheet,
    CalendarTime,
    Cascader,
    Cell,
    TouchCircle,
    Cliper,
    Cialoger,
    Drawer,
    Elevator,
    Loading,
    Picker,
    Popup,
    Schedule,
    Srcoller,
    SrcollerElevator,
    Slidebutton,
    Slideitem,
    Slideout,
    Sliver,
    SliverContainer,
    Swiper,
    SwiperItem,
    Toast,
    Video,
    ScrollerCalendar,
    Progress,
    Flow,
    Timepicker,
    DragOuter,
    DragBar,
    ExpansionTile,
    
    PluginActionsheet,
    PluginCalendarTime,
    PluginCascader,
    PluginDialoger,
    PluginLoading,
    PluginPopup,
    PluginToast,
    PluginPicker
]

export default {
    install: function(Vue) {
        Components.forEach((item, index)=>{
            item.install(Vue)
        })
    }
};