export default {
    data() {
        return {
            startHourData:[],
            startMinutesData:[],
            
        }
    },
    computed: {
        hour24() {
            let arr = []
            for(let i = 0; i < 24; i++) {
                arr.push(i>=10?i.toString():0+''+i)
            }
            return arr;
        },
        minutes() {
            let arr = []
            for(let i = 0; i < 60; i++) {
                arr.push(i>=10?i.toString():0+''+i)
            }
            return arr;
        }
    },
    mounted() {
        this.initTime()
    },
    methods: {
        chooseItem(value, index) {
            switch (index) {
                case 0:
                    this.currentHour = value
                    this.initHour()
                    break;
                case 1:
                     this.currentMin = value
                    break;
            }
        },
        cloneJSON(value) {
            return JSON.parse(JSON.stringify(value))
        },
        initHour() {
           
        },
        initTime() {
            let hour = this.cloneJSON(this.hour24)
            let minutes = this.cloneJSON(this.minutes);

            this.startHourData = this.hour24;
            this.startMinutesData = this.minutes;
            
            if(this.startMinute===59) {
                this.endHourData= hour.slice(parseInt(this.startHour)+1,23)
                this.endMinutesData = minutes;
                return
            }
            this.endHourData= hour.slice(parseInt(this.startHour),23)
            this.endMinutesData = minutes.slice(parseInt(this.startMinute+1),59);
            
        }
    }
}