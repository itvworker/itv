(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1222:function(t,e,n){"use strict";var i=n(962);n.n(i).a},1274:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("itv-container",{staticClass:"page-dialog"},[n("itv-header",[t._v("Actionsheet")]),t._v(" "),n("itv-main",[n("div",{staticClass:"h10"}),t._v(" "),n("cell",{attrs:{title:"插件模式",isLink:"",desc:t.text,showIcon:""},on:{click:t.open}}),t._v(" "),n("cell",{attrs:{title:"组件模式调用",isLink:"",desc:t.text1,showIcon:""},on:{click:t.open1}})],1),t._v(" "),n("actionsheet",{attrs:{items:t.items,teleport:""},on:{confirm:t.confirm},model:{value:t.actionState,callback:function(e){t.actionState=e},expression:"actionState"}})],1)},o=[]},887:function(t,e,n){"use strict";n.r(e);var i=n(1274),o=n(960);for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n(1222);var a=n(0),s=Object(a.a)(o.default,i.a,i.b,!1,null,"5649e488",null);e.default=s.exports},960:function(t,e,n){"use strict";n.r(e);var i=n(961),o=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e.default=o.a},961:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={data:function(){return{show:!1,actionState:!1,text:"选项一",text1:"组件选项一",items:[{text:"组件选项一"},{text:"组件选项二"},{text:"组件选项三"}]}},methods:{open:function(){var t=this;this.$itv.actionsheet.show({iosSafeArea:!1,items:[{text:"选项一"},{text:"选项二"},{text:"选项三"}],onConfirm:function(e){t.text=e.text}})},open1:function(){this.actionState=!0},confirm:function(t){this.text1=t.text}},mounted:function(){}}},962:function(t,e,n){}}]);