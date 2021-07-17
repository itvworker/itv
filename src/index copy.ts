import Actionsheet from './components/actionsheet';
import CalendarTime from './components/calendar-time';
import Cascader from './components/cascader';
import Cell from './components/cell';
import TouchCircle from './components/touch-circle';
import Cliper from './components/cliper';
import Cialoger from './components/dialoger';
import Drawer from './components/drawer';
import Elevator from './components/elevator'
import Loading from './components/loading';
import Picker from './components/picker';
import Popup from './components/popup';
import Schedule from './components/schedule';
import Scroller from './components/scroller';
import ScrcollerElevator from './components/scroller-elevator';
import Slidebutton from './components/slidebutton';
import Slideitem from './components/slideitem';
import Slideout from './components/slideout';
import Sliver from './components/sliver';
import SliverContainer from './components/sliver-container';
import Swiper from './components/swiper';
import SwiperItem from './components/swiper-item';
import Toast from './components/toast';
import Video from './components/video'
import ScrollerCalendar from './components/scroller-calendar'
import Progress from './components/progress'
import Flow from './components/flow'
import Timepicker from './components/timepicker'
import DragBar from './components/drag-bar';
import DragOuter from './components/drag-outer'
import ExpansionTile from './components/expansion-tile'
import Datepicker from './components/datepicker';

import PluginActionsheet from './plugins/actionsheet.js';
import PluginCalendarTime from './plugins/calendarTime.js';
import PluginCascader from './plugins/cascader.js';
import PluginDialoger from './plugins/dialoger.js';
import PluginLoading from './plugins/loading.js';
import PluginPopup from './plugins/popup.js';
import PluginToast from './plugins/toast.js';
import PluginPicker from './plugins/picker.js';
import PluginDatepicker from './plugins/datepicker.js'
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
    Scroller,
    ScrcollerElevator,
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
    Datepicker,
    ExpansionTile,
    
    PluginActionsheet,
    PluginCalendarTime,
    PluginCascader,
    PluginDialoger,
    PluginLoading,
    PluginPopup,
    PluginToast,
    PluginPicker,
    PluginDatepicker
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
    Scroller,
    ScrcollerElevator,
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
    Datepicker,
    
    PluginActionsheet,
    PluginCalendarTime,
    PluginCascader,
    PluginDialoger,
    PluginLoading,
    PluginPopup,
    PluginToast,
    PluginPicker,
    PluginDatepicker
]

export default {
    install: function(app:any, options: any) {
        Components.forEach((item)=>{
            item.install(app, options)
        })
    }
};