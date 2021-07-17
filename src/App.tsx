
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import logo from '@/assets/logo.png';
import {RouterView} from 'vue-router';
export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
      RouterView
    },
    data() {
      return {
        logo:logo
      }
    },
    mounted(){
        setTimeout(()=>{
            this.$itv.actionsheet.show({
                items:[
                    {
                        text:'选项一'
                    },
                    {
                        text:'选项二'
                    },
                    {
                        text:"选项三"
                    }
                ],
                onConfirm:(item)=> {

                }
            })
        })
        
    },
    render() {
        return (
          <>
          <RouterView />
          </>
        )
    }
})

