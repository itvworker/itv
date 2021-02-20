
import "@babel/polyfill";
import { mount } from "@vue/test-utils";
import calendarTime from '../../../src/itv-components/calendar-time/index.vue';

describe("src/itv-components/calendar-time组件测试", ()=>{
    test('验证日历格式由星期一至星期日时，日历是否正确',  async (done) => {
        const wrapper = mount(calendarTime,{
            propsData:{
                current:"2021-02-01 11:00",
                calendarFormat:1
            }
        })

        wrapper.vm.init();
        await wrapper.vm.$nextTick(); 
        expect(wrapper.vm.nowMonth[0].week).toBe(1);
        expect(wrapper.vm.nowMonth[0].msg).toBe('2021-02-01');
        
        wrapper.vm.init("2021-03-01");
        expect(wrapper.vm.nowMonth[0].week).toBe(1);
        expect(wrapper.vm.nowMonth[0].msg).toBe('2021-03-01');
        done();
        
    });


    test('验证日历格式由星期日至星期六时，日历是否正确',  async (done) => {
        const wrapper = mount(calendarTime,{
            propsData:{
                current:"2021-02-01 11:00",
                calendarFormat:0
            }
        })

        wrapper.vm.init();
        await wrapper.vm.$nextTick(); 
        expect(wrapper.vm.nowMonth[0].week).toBe(0);
        expect(wrapper.vm.nowMonth[1].msg).toBe('2021-02-01');
        
        wrapper.vm.init("2021-03-01");
        expect(wrapper.vm.nowMonth[0].week).toBe(0);
        expect(wrapper.vm.nowMonth[1].msg).toBe('2021-03-01');
        done();
        
    });
})