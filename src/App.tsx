
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
      
    },
    render() {
        return (
          <>
          <RouterView />
          </>
        )
    }
})

