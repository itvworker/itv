import ItvContainer from "./container.vue";
import ItvMain from "./main.vue";
import ItvHeader from "./header.vue";
import ItvFlexRow from "./flexRow.vue";
const Layout = {
  ItvContainer,
  ItvMain,
  ItvHeader,
  ItvFlexRow
};

export default {
    install: function(app, opts) {
        Object.keys(Layout).forEach(item=>{
            app.component(item,Layout[item])
        })
    }
};



