
import { defineComponent } from 'vue'
import Calendar from '@/components/calendar.tsx'
export default defineComponent({
    components:{
        Calendar
    },
    data() {
        return {
        }
    },
    
    methods:{
        setDay(item) {
            return (
                <div class="active">{item.name}</div>
            )
        }
    },
    render() {
        return (
            <>
                <div class="">
                    <Calendar setDay={this.setDay}  />
                </div>
            </>
        )
    }
})

