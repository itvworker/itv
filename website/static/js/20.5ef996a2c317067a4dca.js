(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1e3:function(n,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var t={data:function(){return{rowIndex:2,columnIndex:2}},methods:{open:function(){console.log("link----------")},row:function(n){console.log(n)},change:function(n){this.rowIndex=n}},mounted:function(){console.log(this.$children)}};i.default=t},1001:function(n,i,e){},1235:function(n,i,e){"use strict";var t=e(1001);e.n(t).a},1287:function(n,i,e){"use strict";e.d(i,"a",(function(){return t})),e.d(i,"b",(function(){return a}));var t=function(){var n=this,i=n.$createElement,e=n._self._c||i;return e("itv-container",[e("itv-header",[n._v("itv-mini-swiper")]),n._v(" "),e("itv-main",[e("h2",[n._v("横向")]),n._v(" "),e("mini-swiper",{attrs:{loop:!0},on:{change:n.row},model:{value:n.rowIndex,callback:function(i){n.rowIndex=i},expression:"rowIndex"}},[e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-1"},[n._v("1")])]),n._v(" "),e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-2"},[n._v("2")])]),n._v(" "),e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-1"},[n._v("3")])]),n._v(" "),e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-2"},[n._v("4")])]),n._v(" "),e("div",{staticClass:"dot-bar",attrs:{slot:"dot"},slot:"dot"},[e("div",{staticClass:"dot",class:{active:0===n.rowIndex},on:{click:function(i){return n.change(0)}}},[n._v("1")]),n._v(" "),e("div",{staticClass:"dot",class:{active:1===n.rowIndex},on:{click:function(i){return n.change(1)}}},[n._v("2")]),n._v(" "),e("div",{staticClass:"dot",class:{active:2===n.rowIndex},on:{click:function(i){return n.change(2)}}},[n._v("3")]),n._v(" "),e("div",{staticClass:"dot",class:{active:3===n.rowIndex},on:{click:function(i){return n.change(3)}}},[n._v("4")])])],1),n._v(" "),e("h2",[n._v("纵向")]),n._v(" "),e("mini-swiper",{staticClass:"itv-swpier-height",attrs:{direction:"column",loop:!1},model:{value:n.columnIndex,callback:function(i){n.columnIndex=i},expression:"columnIndex"}},[e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-1"},[n._v("1")])]),n._v(" "),e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-2"},[n._v("2")])]),n._v(" "),e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-1"},[n._v("3")])]),n._v(" "),e("mini-swiper-item",[e("div",{staticClass:"demo-banner banner-2"},[n._v("4")])])],1)],1)],1)},a=[]},898:function(n,i,e){"use strict";e.r(i);var t=e(1287),a=e(999);for(var o in a)"default"!==o&&function(n){e.d(i,n,(function(){return a[n]}))}(o);e(1235);var s=e(0),r=Object(s.a)(a.default,t.a,t.b,!1,null,"5f80eccb",null);i.default=r.exports},999:function(n,i,e){"use strict";e.r(i);var t=e(1e3),a=e.n(t);for(var o in t)"default"!==o&&function(n){e.d(i,n,(function(){return t[n]}))}(o);i.default=a.a}}]);