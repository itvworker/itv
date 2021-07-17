import Actionsheet from './components/actionsheet';

import PluginActionsheet from './plugins/actionsheet.js';

export {
    Actionsheet,
    PluginActionsheet,
}

let Components = [
    Actionsheet,
    PluginActionsheet
]

export default {
    install: function(app:any, options: any) {
        Components.forEach((item)=>{
            item.install(app, options)
        })
    }
};