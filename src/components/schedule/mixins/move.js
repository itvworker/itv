export default {
    methods: {
        //竖向移动日历
        verticalMoveCalendar(value) {
          
            this.y += Math.round(value)
            if (this.y <= this.rowHeight) {
                this.y = this.rowHeight
              
                this.calendarStatus = 0
            }
            if (this.y >= this.maxHeight) {
                this.y = this.maxHeight
                this.calendarStatus = 1
            }
           
            this.hdom(this.y);
            this.setShowTop();
          
        }
    }
}