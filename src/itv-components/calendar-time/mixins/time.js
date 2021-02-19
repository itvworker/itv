export default {
    data() {
        return {
            startHourData:[],
            startMinutesData:[],
            startHour: 0,
            endHour: 23,
            startMin: 0,
            endMin: 59
        }
    },
    computed: {
        hour24() {
            let arr = []
            for(let i = this.startHour; i <= this.endHour ; i++) {
                arr.push(i>=10?i.toString():0+''+i)
            }
            return arr;
        },
        minutes() {
            let arr = []
            for(let i = this.startMin; i <= this.endMin; i++) {
                arr.push(i>=10?i.toString():0+''+i)
            }
           
            return arr;
        },
    },
    watch: {
        currentValue(n, o) {
            if(this.currentHour &&  this.currentMin) {
                this.initTime(this.currentHour, this.currentMin);
            }
            
        }
    },
    mounted() {
        // this.initTime();
    },
    methods: {
        chooseItem(value, index) {
            switch (index) {
                case 0:
                    this.currentHour = value
                    this.initHour()
                    break;
                case 1:
                    console.log(value);
                     this.currentMin = value
                    break;
            }
        },
        cloneJSON(value) {
            return JSON.parse(JSON.stringify(value))
        },
        initHour() {
           this.startMin = 0;
           this.endMin =59
           let current = this.currentValue;
           let max = this.maxDate.split(' ')
           let min = this.minDate.split(' ')
             
         
           if(current === max[0]) {
                let time = max[1].split(':')
                if(parseInt(this.currentHour) > this.endHour) {
                    this.endMin = parseInt(time[1]);
                    if(parseInt(this.currentMin) > this.endMin) {
                        this.currentMin = this.endMin>10?this.endMin.toString(): '0'+this.endMin
                    }
                }
            }
            
            if(current === min[0]) {
                let time = min[1].split(':')
                if(parseInt(this.currentHour) <= this.startHour) {
                    this.startMin = parseInt(time[1]);
                    if(parseInt(this.currentMin) <= this.endMin) {
                        
                        this.currentMin = this.startMin>10?this.startMin.toString(): '0'+this.startMin
                    }
                }
            }  
           
          
            this.$nextTick(()=>{
                if(!this.isVisible) return
                this.$refs['picker-1'].updateTransform(this.currentMin.toString());
               
            })
        },
        /**
         * 
         */
        initTime(currentHour, currentMin) {
          
           
            if(this.dateType === 'calendar-time' || this.dateType === "time") {
                let current = this.currentValue.split(' ');
                let max = this.maxDate.split(' ')
                let min = this.minDate.split(' ')
                this.endHour= 23;
                this.endMin = 59
                this.startMin = 0;
                this.startHour = 0;
                if(current[0] === max[0]) {
                    let time = max[1].split(':');
                  
                    this.endHour= parseInt(time[0]);
                    // this.endMin = parseInt(time[1]);
                    if(parseInt(this.currentHour) > this.endHour) {
                        this.currentHour = this.endHour;
                        if(parseInt(this.currentMin) > this.endMin) {
                            this.currentMin = this.endMin
                        }
                    }
                }
                
                if(current[0] === min[0]) {
                    let time = min[1].split(':');
                    this.startMin = 0;
                      
                    if(parseInt(this.currentHour) == parseInt(time[0])) {
                        this.startMin = parseInt(time[1]);
                    }
                    
                    this.startHour = parseInt(time[0]);
                    if(parseInt(this.currentHour) < this.startHour) {
                        this.currentHour = this.startHour;
                        if(parseInt(this.currentMin) < this.startMin) {
                            this.currentMin = this.startMin>=10?this.startMin.toString():'0'+this.startMin;
                        }
                    }
                }
               
                this.$nextTick(()=>{
                    if(!this.isVisible) return
                    this.$refs['picker-0'].updateTransform(this.currentHour.toString());
                    this.$refs['picker-1'].updateTransform(this.currentMin.toString());
                })
                
            }
            
        }
    }
}