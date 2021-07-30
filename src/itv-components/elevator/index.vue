<template>
<transition name="slide-bottom">
    <page-container class="elevator-container" v-show="value">
        <div class="div" ref="search">
            <div class="select-title"  >
                {{type==='country'?'选择国籍':'选择区号'}}
            </div>
            <form class="search" action=""   @submit.stop="stopSubmit">
                <div class="iconsearch">

                </div>  
                <input type="text" class="search-input" v-model="searchText" @input="search"   @keyup.enter="search" :placeholder="lang.$t('inputKeySearh')" />
                <div class="btn" @click="$emit('input', false)">
                    {{cancelText}}
                </div>
            </form>
        </div>
        
        <page-main class="elevtor-main">
            <itv-scroller  
                ref="scroller" 
                pattern="vertical" 
                :speed="100"
                class="scroller"
                @scroll="scroll"
            >
                <itv-scroller-elevator  class="content-fix" :ref="item.id" v-for="(item, index) in fixList" :key="item.title+index" :title="item.text || item.title">
                    <div class="l1" v-for="(subItem, subIndex) in item.list" :key="subIndex" @click="onConfirm(subItem)">
                         <div class="left" v-html="subItem.text"></div>
                         <div class="right">{{subItem.value}}</div>
                    </div>
                </itv-scroller-elevator>

                <div slot="other" ref="elevator" class="elevator-bar" @touchstart="touchmove"  @touchmove="touchmove" @touchend="touchend" @touchcancel="touchend">
                    <div class="elevator-name" :class="{'active': elevatorIndex === index}" :key="index" v-for="(item, index) in fixList">
                        {{item.title}}
                        <div class="elevator-name-now" :class="{'elevator-name-min':  elevatorName!==null && elevatorName.length>=2}"  v-show="elevatorIndex === index && elevatorNameShow">{{elevatorName}}</div>
                    </div>
                </div>
            </itv-scroller>
            <itv-scroller  
                ref="searchlist" 
                pattern="vertical" 
                :speed="100"
                class="scroller-search"
                v-show="showSearch"
            >
            
            <div class="l1-search" v-for="(subItem, subIndex) in searchList" :key="subIndex" @click="onConfirm(subItem)">
                <div class="left" v-html="subItem.text"></div>
                <div class="right">{{subItem.value}}</div>
            </div>
            </itv-scroller>
           
        </page-main>
    </page-container>
 </transition>    
</template>
<script>
import manage from './manage'
import action from '@/store/api/actions'
import lang from "@/init/init.lang";

export default {
    name:'itv-elevator',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'code'
        },
        id: {
            type:  [String , Number],
            default: null
        },
        placeholder:{
            type: String,
            default:null
        },
        context:{
            type: String,
            default: ()=>{}
        },
        cancelText:{
            type: String,
            default: "取消"
        }
    },
    computed: {
        showSearch() {
            if(!this.searchText) return false;
           
            return this.searchText.replace(/(^\s*)|(\s*$)/g, "");
        }
    },
    watch: {
        searchText(n) {
            if(!n) return false;
            this.search();
        },
        value(n) {
            if(n) {
                this.fixList = [];
                this.getCountry();
            }
            
        }
    },
    data() {
        return  {
            fixList: [],
            barTop: 0,
            btnHeight:0,
            elevatorNameShow: false,
            elevatorName:null,
            elevatorIndex: 0,
            elevatorTops:[],
            scrollTimeout: false,
            searchText: '',
            list:[],
            searchList:[],
            timeout:null,//防抖搜索
            isNone: false,
            lang: lang
           
        }
    },
   
    methods: {
        stopSubmit(e) {
            e.stopPropagation();
            e.preventDefault();
        },
        touchstart(e) {
            e.stopPropagation();
            e.preventDefault();
        },
        touchmove(e) {
            e.stopPropagation();
            e.preventDefault();
           
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            let moveY = touches[0].pageY;
            let index = (moveY - this.barTop)/this.btnHeight;
          
            if(index<=0) {
                index = 0;
            }
            if(index >= this.fixList.length-1) {
                index = this.fixList.length - 1;
            }
           
            index = Math.floor(index);
            
            if(this.elevatorIndex === index) return;  //相同的要再往下走了
            this.elevatorIndex = index;
            this.elevatorNameShow = true;
            this.elevatorName = this.fixList[index].title;
            let top = this.$refs[this.fixList[index].id][0].top
            this.$refs.scroller.setPosition(0, top);
        },
        touchend() {
            this.elevatorNameShow = false;
            this.elevatorName = null;
        },  
        init() {
            this.showSearch = false;
            this.searchText = ""
            this.$refs.scroller.setPosition(0, 0);
            let dom = this.$refs.elevator;
            let top = dom.offsetTop;
            top = top - dom.clientHeight/2 
            let parentTop = this.$refs.search.clientHeight;
            this.barTop = top + parentTop;
            this.barBottom = this.barTop + dom.clientHeight;
            this.btnHeight = dom.clientHeight/this.fixList.length;
            this.elevatorTops = this.fixList.map((item)=>{
                return this.$refs[item.id][0].top
            })
            this.$refs.scroller.calcMax();
        },
        scroll(obj) {
            if(this.scrollTimeout) return;
            this.scrollTimeout = true;
            setTimeout(()=>{    
                this.scrollTimeout = false;
            },100)
            if(this.elevatorNameShow) return;
            if(this.elevatorTops.length <= 1) return;
            for(let i = 0, l = this.elevatorTops.length; i < l; i++) {
                if(this.elevatorTops[i+1]){
                    if(obj.y >= this.elevatorTops[i] && obj.y < this.elevatorTops[i+1]) {
                        this.elevatorIndex = i;
                        break
                    }
                }else{
                    this.elevatorIndex = i;
                }
            }
            
        },
        /**
         * 获取国家 或区号
         */
        async getCountry() {
            if(this.type==='country') {
                let res = await Promise.all([
                    action.getCountry({},{}),
                    action.getDict({},{dictCodes:["SCHOOL_COMMON_COUNTRY_ID"]})
                    // this.$store.dispatch('getCountry'),
                    // this.$store.dispatch('getDict', {dictCodes:["SCHOOL_COMMON_COUNTRY_ID"]})
                ]) 
                if(res[0].code == 0 && res[1].code == 0) {
                    let result = manage.mangeDictCountry(res[0].data, res[1].data[0].dict, this.context.useCountry);
                    this.fixList = result.list;
                    this.list = result.searchList;
                    this.$nextTick(()=>{
                        this.init()
                    })
                }
            }else{
                let res = await action.getDict({}, {
                    dictCodes:["RECRUIT_NATIONAL_AREA_CODE", "SCHOOL_COMMOM_NATIONAL_AREA_CODE"]
                })

                //整理字典
                let obj = {}
                if(res.code == 0) {
                    res.data.forEach(item => {
                        obj[item.dictName] = item.dict; 
                    });
                }

                //将字典变为可搜索，列表数据
                let result = manage.mangeCodeDict(obj['RECRUIT_NATIONAL_AREA_CODE'], obj['SCHOOL_COMMOM_NATIONAL_AREA_CODE'], this.context.useCountry,this.context.useCuntryArea);
                this.fixList = result.list;
                this.list = result.searchList;
                this.$nextTick(()=>{
                    this.init()
                })
                
            }

            // let res = this.$store.dispatch('getDict', {
            //     dictCodes:["RECRUIT_NATIONAL_AREA_CODE"]
            // })

            // let res = await this.$store.dispatch('getCountry');

            
        },
        onConfirm(item) {
            this.$emit('onConfirm', {
                item: item,
                key: this.id
            });
        },
        search(){
            clearTimeout(this.timeout)
            this.timeout = setTimeout(()=>{
                let key = this.searchText.replace(/(^\s*)|(\s*$)/g, "");
                key = key.toLowerCase();
                let reg = new RegExp(key, 'ig');
                let list = [];
                this.list.forEach(item=>{
                    //判断名称，拼音，首字母
                    let result = item.text.indexOf(key)>=0 || item.all.indexOf(key)===0 || item.initial.indexOf(key)===0;
                    if(result) {
                        let obj = JSON.parse(JSON.stringify(item))
                        obj.text = item.text.replace(reg, (a)=>{
                            return `<span class="text-primary">${a}</span>`
                        })
                        list.push(obj);
                    }
                })
                this.searchList = list;
                this.$refs.searchList.setPosition(0,0);
                this.$refs.searchList.refresh();
            },500)
            
            
        },
        elevator() {
            
            
        }
    }
}
</script>
<style lang="less" scoped>
@import "index.less";
</style>
