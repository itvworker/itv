export default {
    data() {
        return {
            startHourData:[],
            startMinutesData:[],
            endHourData:[],
            endMinutesData:[],
            
            cacheStartHour: "",
            
            startHour: '12',
            startMinute:'00',
            endHour: '13',
            endMinute:'23'
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
                    // this.startHour = value
                    this.initHour()
                    break;
                case 1:
                    // this.startMinute = value
                    break;
                case 2:
                    // this.endHour = value
                    break;
                case 3:
                    // this.endMinute = value
                    break;
            }
        },
        cloneJSON(value) {
            return JSON.parse(JSON.stringify(value))
        },
        initHour() {
            let hour = this.cloneJSON(this.hour24)
            let minutes = this.cloneJSON(this.minutes);
             
            console.log(this.startHour);
            let startHour = parseInt(this.startHour)
            let endHour = parseInt(this.endHour)
            
            if(startHour > endHour) {
                this.endHourData= hour.slice(startHour,24)
                this.endHour = this.startHour
            }
            if(endHour > startHour ) {
                this.endHourData= hour.slice(startHour,24)
            }

            this.$refs['picker-2'].updateTransform(this.endHour)
            

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