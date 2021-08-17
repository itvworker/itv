Component({
    properties: {
        topBounce: { //顶部是否弹起
            type: Boolean,
            value: false
        },
        bottomBounce: { //底部是否弹起
            type: Boolean,
            value: false
        },
        leftBounce: { //左部是否弹起
            type: Boolean,
            value: false
        },
        rightBounce: { //右部是否弹起
            type: Boolean,
            value: false
        },
        pullDown: { //开启此功能必须要开启topBounce
            type: Boolean,
            value: false
        },
        pullDis: {
            type: Number,
            value: 60
        },
        
        /**
         * 滑动模式
         * freedom x轴，y轴可自由滚动, 
         * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
         * vertical竖向滚动，
         * horizontal横向滚动
         */
        pattern: { 
            type: String,
            value: 'vertical' 
        },
        /**
         * 触屏方式
         * self自我滚动， 
         * custom自定义 touchstart,touchmove,touchend,touchcancel事件
         */
        touchType: { 
            type: String,
            value: 'self' 
        },
        tier: { //层级
            type: String,
            value: "none" //none不分层 ,parent父层，child为子层
        },
        percent: {
            type: Number,
            value: 0.96
        },
        speed: {
            type: Number,
            value: 200
        },
        //是否显示滚动条
        showScrollBar: {
            type: Boolean,
            value: false
        },

        refreshLayerColor: {
            type: String,
            value: "#AAA"
        },
        loadingLayerColor: {
            type: String,
            value: "#AAA"
        },
        pullText: {
            type: String,
            value: '下拉刷新'
        },
        loseenText: {
            type: String,
            value: '松开刷新'
        },
        refreshText: {
            type: String,
            value: '更新中'
        },
        loadingText: {
            type:String,
            value: "加载中…"
        },
        noDataText:{
            type:String,
            value: "没有更多数据"
        },
        maxSpeed:{
            type: Number,
            value: 300
        },
        /**除数，控制计算速度 */
        divisor:{
            type: Number,
            value: 5
        },
        isMore: {
            type: Boolean,
            value: false
        },
        minScrollHeihgt:{
            type: Number,
            value: 0
        }
    },
    data: {
        initStatus: 1,
        text: '',
        status: '',
        pullReload: 1,
        noneMore:1,
        stopLoading: 1,
    },
    created() {
        this.setData({
            initStatus: this.data.initStatus++
        })
        
    },
    methods: {
        refresh() {
            this.setData({
                pullReload: this.data.pullReload++
            })
         
        },
       
       
        //是否触发上拉加载
        loadingData(value) {
            if(this.isMore && value >= this.maxY && this.moreStatus ==='loadingStop') {
                this.moreStatus = 'loading';
                this.$emit('infinite')
                this.$emit('onInfinite')
                this.$nextTick(()=>{
                    this.calcMax()
                })
            }
        },
        infinite(value) {
            console.log('infinite-------------');
            if(value) {
                this.setData({
                    noneMore: this.data.noneMore++
                })
            }else{
                this.setData({
                    stopLoading: this.data.stopLoading++
                })
            }
        },
        setCache() {
            this.x = this.scrollX;
            this.y = this.scrollY;
        },
        setPosition(x, y) {
            this.x = x;
            this.y = y;
            this.scrollX =x;
            this.scrollY = y;
            this.scrollTo(this.scrollX, this.scrollY, 0)
        },
        getPosition() {
            return {
                x: this.scrollX,
                y: this.scrollY
            }
        }
        
    }
  
})