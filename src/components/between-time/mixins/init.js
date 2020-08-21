export default {
    created() {
        
       this.init(this.currentValue)
    },
    mounted() {
        
        this.resize();
        
    },
    methods: {
        resize() {
            this.elWidth = this.$el.clientWidth;
            this.screenWidth = document.body.clientWidth;
            this.calendarX = -this.elWidth
            this.weekX = -this.elWidth
            this.x = -this.elWidth
        },
        init(value) {
            let date = new Date(value)
            let year = date.getFullYear(); //获取年份
            let month = date.getMonth()+1
            this.year = year;
            this.month = month
            this.calcInit(year, month);
            this.currentValue = value;
        },

    
     
        calcInit(year, month) {
            this.nowMonth = this.calcMonth(year, month);
            switch (month) {
                case 1:
                    this.prevMonth =  this.calcMonth(year-1, 12)
                    this.nextMonth =  this.calcMonth(year, month + 1)
                    break;
                case 12:
                    this.prevMonth =  this.calcMonth(year, month-1)
                    this.nextMonth =  this.calcMonth(year+1,  1)
                    break;
                default:
                    this.prevMonth =  this.calcMonth(year, month-1)
                    this.nextMonth =  this.calcMonth(year, month+1)
                    break;    
            }
            
        }
    }
}