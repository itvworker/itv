
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Calendar',
    data() {
      return {
        list:[
            {
                name:"小子"
            },
            {
                name:"小哥"
            }
        ]
      }
    },
    props:{
        setDay:{
            type: Function,
            default:()=>{}
        }
    },
    render() {
        return (
          <div class="calnedar">
            {
                this.list.map(item=>{
                    return (<div class="item">
                        {this.setDay(item)}
                    </div>)
                })
            }
          </div>
        )
    }
})
  

