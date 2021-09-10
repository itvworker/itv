<template lang="html">
    <itv-dialog v-model="isVisible" type="bottom" :hideOnClick="hideOnClick">
        <div class="level-select-box" >
            <div class="level-select-title">
                <div class="btn-cancel" v-show="type==='confirm'"  @click.stop="cancel">{{cancelText}}</div>    
                {{titleText}}
                <div class="btn-confirm" v-show="type==='confirm'" :class="{'forbid-btn':isLastConfirm && !isLast}" @click.stop="confirmBtn">{{confirmText}}</div>
                <div class="icon-close" v-show="type==='close'" @click.stop="cancel"></div>
            </div>
            <itv-scroll ref="header"  :percent="0.7" :speed="40"  pattern="horizontal" class="case-box">
                <div class="level-select-bar">
                    <template v-for="(item,index) in currentItems">
                         <div class="select" :class="{'active': currentHeader===index||(isLast && index === currentItems.length-1 && currentHeader===null)}"  @click.stop="changeNow(index)">
                            {{item[textKey]}}
                        </div>
                        <div class="icon-gengduox arrow-icon" v-if="!(index===currentItems.length-1 && isLast)"></div>
                    </template>
                   
                   <div class="select placeholder" v-if="!isLast" :class="{'active': currentHeader===null}" @click="changeNow(null)">{{placehoder}}</div>
                </div>
            </itv-scroll>
            <itv-scroll ref="body" class="body-scroll"  :percent="0.7" pattern="vertical" >
                <div ref="item" class="level-item height-opt">
                    
                </div>
                <div  class="level-item" :class="{'active': activeIndex === index}" v-for="(item, index) in nowItems" :key="item[idKey]" @click="selectItem(index)">
                    {{item[textKey]}}
                </div>
            </itv-scroll>
        </div>
    </itv-dialog>
</template>

<script>
import ItvDialog from '../dialoger/index.vue';
import ItvScroll from '../scroller/index.vue'
export default {
    name: "itv-cascader",
    components: {
        ItvDialog,
        ItvScroll
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        hideOnClick: { //点击背景隐藏
            type: Boolean,
            default: true
        },
        titleText: { //标题
            type: String,
            default:'请选择分类'
        },
        placehoder: { //请选择的文字
            type: String,
            default: '请选择'
        },
        items: { //数据选项
            type: Array,
            default: ()=>[]
        },
        pidKey: { //父id的健名
            type: String,
            default: 'pid'
        },
        idKey: { //id的健名
            type: String,
            default: 'id'
        },
        selected:{
            type: Array,
            default: ()=>[]
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        textKey: {
            type: String,
            default: 'name'
        },
        isLastConfirm: {
            type: Boolean,
            default: true
        },
        teleport:{
            type: Boolean,
            default: false
        },
        type:{
            type: String,
            close: 'close'
        },
        level:{
            type: Number,
            default: 0
        },
        isAsyn:{
            type: Boolean,
            default: false
        },
        asynFun:{
            type: Function,
            default: ()=>{}
        }
        
    },
    data() {
        return {
            isVisible: this.value,
            currentSelect: JSON.parse(JSON.stringify(this.selected)),
            currentIndex: [],
            currentItems:[],
             //当前头部高亮
            currentHeader:null, //当选择级数，即头部点击显示的active
            nowItems:[],
            isLast: false,
            itemHeight: 0,
            cacheNumber:0,
            nextTarget:null,
            parentTarget:null,
            asyncArr:[], //异步存储的数组
        }
    },
    computed: {
        //当前选项
        currented() {
            return null
        },
        activeIndex() {    
            if(this.currentHeader === null && this.isLast) {
                return  this.currentIndex[this.currentIndex.length-1]
            } 
            if(this.currentHeader === null) {
                return  null
            }
            return this.currentIndex[this.currentHeader]
        }
        //选项
    },
    watch: {
        value(a, b) {
            this.isVisible = a;
            if (!a) {
                this.$emit("close");
                this.$emit("hide");
                if(this.teleport) {
                        if(this.nextTarget) {
                            this.parentTarget.insertBefore(this.$el, this.nextTarget)
                        }else{
                            this.parentTarget.appendChild(this.$el)
                        }
                    }
            }
            if(a) {
               this.init();
               if(this.teleport) {
                    document.body.appendChild(this.$el);
                }
            }
        },
        isVisible(n,o) {
            this.$emit('input', n)
        },
        currentHeader(n,o) {
            this.$nextTick(()=>{
               this.$refs.body.calcMax();
               this.$refs.header.calcMax();
              
               if(n !== null) {
                    this.$refs.body.scrollToNow(0, this.currentIndex[this.currentHeader]*this.itemHeight)
                    return
               }
                if(n === null && this.isLast === false) {
                    this.$refs.body.scrollToNow(0, 0)
                }
            })
            
        },
        currentItems(n,o) {
            this.$nextTick(()=>{
                let vm = this.$refs.header;
                vm.calcMax();
                vm.scrollToNow(vm.maxX, 0);
            })
        }
       
       
    },
    mounted() {
        if(this.teleport) {
            this.nextTarget = this.$el.nextSibling;
            this.parentTarget = this.$el.parentNode;
        }
    },
    methods: {
        async init() {
            this.currentItems = [];
            this.currentIndex = [];
            this.currentHeader = null;
            this.asyncArr = [];
            this.isLast = false;
            this.currentSelect = JSON.parse(JSON.stringify(this.selected));
            this.$refs.body.scrollToNow(0,0);
            let itemArr = this.items;
            if(this.isAsyn && this.currentSelect.length >0 ) {
                for(let i = 0, l = this.currentSelect.length;  i < l; i++) {
                   this.asyncArr = this.asyncArr.concat(await this.asynFun(this.currentSelect[i]))
                }
                itemArr = this.asyncArr;
            }
             if(this.isAsyn && this.currentSelect.length <= 0 ) {
                this.asyncArr = this.asyncArr.concat(await this.asynFun(null))
            }
           
            
            if(this.selected.length>0) {
                this.selected.forEach((item, index)=>{
                    if(index===0) {
                        let arr = [];
                        itemArr.forEach(ele=>{
                            if(ele[this.pidKey]===0) {
                                arr.push(ele);
                            }
                            if(ele[this.idKey] === item){
                                this.currentIndex[index] = arr.length - 1;
                                this.currentItems[index] = JSON.parse(JSON.stringify(ele))
                            }
                        })   
                    }else{
                        let arr = [];
                        itemArr.forEach(ele=>{
                            if(ele[this.pidKey]===this.selected[index-1]) {
                                arr.push(ele);
                            }
                            if(ele[this.idKey] === item){
                                this.currentIndex[index] = arr.length - 1;
                                this.currentItems[index] = JSON.parse(JSON.stringify(ele))
                            }
                        })    
                    }
                })
                let arr = []    
                this.currentItems[this.currentItems.length]
                
            }
            this.calcNowItems(true)
            this.$nextTick(()=>{
                this.calcHeight();
                this.$refs.body.calcMax();
            })
            
        },


        calcHeight() {
           
            this.itemHeight = this.$refs.item.offsetHeight
        },
        changeNow(index) {
            this.currentHeader = index;
            this.calcNowItems()
        },
        async selectItem(index) {
            if(this.currentHeader === null) {
                if(this.isLast) {
                    let i = this.currentItems.length -1; 
                    this.$set(this.currentItems,i,JSON.parse(JSON.stringify(this.nowItems[index])));
                    this.$set(this.currentSelect,i,this.nowItems[index][this.idKey]);
                    this.$set(this.currentIndex,i,index);
                }else{
                    this.currentItems.push(JSON.parse(JSON.stringify(this.nowItems[index])))
                    this.currentSelect.push(this.nowItems[index][this.idKey])
                    this.currentIndex.push(index)
                }

            }else{
                let len = this.currentItems.length;
                this.currentItems = this.currentItems.splice(0, this.currentHeader+1)
                this.currentSelect = this.currentSelect.splice(0, this.currentHeader+1)
                this.currentIndex = this.currentIndex.splice(0, this.currentHeader+1)
                this.currentItems[this.currentHeader] = JSON.parse(JSON.stringify(this.nowItems[index]))
                this.currentSelect[this.currentHeader] = this.nowItems[index][this.idKey]
                this.currentIndex[this.currentHeader]=index
                this.currentHeader = null;
               
            }
            

            if(this.isAsyn) {
                this.asyncArr = this.asyncArr.concat(await this.asynFun(this.nowItems[index]))
            }

            this.calcNowItems()
            this.$nextTick(()=>{
               
               if(!this.isLast) {
                   this.$refs.body.scrollToNow(0, 0)
               }else{
                   this.confirmBtn();
               }
               this.$refs.body.calcMax();
            })
            this.$emit('select', this.currentItems)
        },
        calcNowItems(isInit) {
            if(!this.currentSelect) return []
            let data = [];
            let itemArr = this.items;
            if(this.isAsyn) {
                itemArr = this.asyncArr;
            }
           
            //没有默认选择的时候
            if(this.currentSelect.length<=0) {
                itemArr.forEach(element => {
                    if(element[this.pidKey] === 0 || !element[this.pidKey]) {
                        data.push(element)
                    }   
                });
                 this.nowItems = data;
               
                this.$nextTick(()=>{
                    this.$refs.body.calcMax();
                })
                return
            }

            if(this.currentSelect.length > 0 && this.currentHeader === null) {
                let id = this.currentSelect[this.currentSelect.length-1];
                let len = this.currentSelect.length
                //查找子层的数组
                if(this.level>0 && len >= this.level ) {
                    data = []
                }else{
                    itemArr.forEach(element => {
                        if(element[this.pidKey] == id ) {
                            data.push( JSON.parse(JSON.stringify(element)))
                        }   
                    });
                }
                

                //如查还有子元素时，显示下级的选择
                if(data.length > 0) {
                    this.nowItems = data
                    this.isLast = false;
                    this.$nextTick(()=>{
                        this.$refs.body.calcMax();
                    })
                }else{
                    //如果没有下级直接接选择
                    this.isLast = true;
                    let obj = this.currentItems[this.currentItems.length-1];

                    //有没有下级选择把当兄递级显示出来即可
                    itemArr.forEach(element => {
                        if(element[this.pidKey] == obj[this.pidKey] ) {
                            data.push( JSON.parse(JSON.stringify(element)))
                        }   
                    });
                    this.nowItems = data;
                    this.$nextTick(()=>{
                        //判断是数据前后数据是否相等，不相等就重新计算
                         if(JSON.stringify(this.nowItems)!==JSON.stringify(data)) {
                            this.$refs.body.calcMax();
                            this.$refs.body.scrollToNow(0, this.currentIndex[this.currentIndex.length-1]*this.itemHeight)
                        }    
                    })

                    //是否要是初始化
                    if(isInit) {
                        this.$refs.body.scrollToNow(0, this.currentIndex[this.currentIndex.length-1]*this.itemHeight)
                    }
                }
               return
            }
            
            if(this.currentSelect.length > 0 && this.currentHeader !== null) {
                let pid = this.currentItems[this.currentHeader][this.pidKey] 
                itemArr.forEach(element => {
                    if(element[this.pidKey] == pid ) {
                        data.push( JSON.parse(JSON.stringify(element)))
                    }   
                });
                this.nowItems = data
                this.$nextTick(()=>{
                    this.$refs.body.calcMax();
                })
                 return
            }
        },
        cancel() {
            this.$emit('input', false)
            this.$emit("hide");
            this.$emit("cancel");
        },
        
        confirmBtn() {
            if(!this.isLast && this.isLastConfirm) {
                return;
            }
            this.$emit('input', false)
            this.$emit("hide");
            this.$emit("confirm", this.currentItems);
        },
        close() {
             this.$emit('input', false)
            this.$emit("hide");
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-cascader.less';
</style>
