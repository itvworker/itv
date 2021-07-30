<template>
    <itv-container>
        <itv-header>Form表单</itv-header>
        <itv-main>
            <form-scroller>
               
                <itv-form :rules="schema" ref="form">
                    <itv-label :label="item.name" :rule="item.schema" :id="item.key" :key="item.key" v-for="(item, index) in inputList">
                        <itv-input placeholder="请输入你的名字" :type="item.type" v-model="model[item.key]" inputType="positive" />
                    </itv-label>

                    <itv-label label="身份证号码" flexDirection>
                        <itv-input placeholder="请输入你的名字" type="textarea" v-model="model.id" inputType="positive" />
                        <div class="iconright"></div>
                    </itv-label>
                </itv-form>
            </form-scroller>
           
        </itv-main>
         <div class="btn" @click="submit">submit</div>
    </itv-container>
</template>
<script>
import ItvForm from './form';
import ItvLabel from './form-item';
import ItvInput from './input'
import FormScroller from './form-scroller.vue';
    let schema = {
        phone: [
            { required: true, rule:'phone', message: '请输入活动名称', trigger: 'blur' }
        ],
        text:{
            required: true, rule:/^[0-9]{6,16}$/, message:"请输入6-16位数字"
        },
        info:{
             required: true, rule:/^[0-9]{6,16}$/, message:"请输入6-16位数字"
        },
        id: {
            equired: true, rule:/^[0-9]{6,16}$/, message:"请输入正确的18位身份证号码"
        }
    }
    export default {
        components: {
            ItvForm,
            ItvLabel,
            ItvInput,
            FormScroller
       
               },
        
        data(){
            return{
                schema: schema,
                inputList: [
                    {   
                        id:1,
                        name: "手机号码",
                        type: "number",
                        key:"phone",
                        schema: "phone"
                    },
                    {   
                        id:2,
                        name: "名字",
                        type: "text",
                        key:'name',
                        schema: "phone"
                    },
                     {   
                        id:3,
                        name: "文字",
                        type: "text",
                        key:'text',
                        schema: "phone"
                    },
                     {   
                        id:4,
                        name: "简介",
                        type: "text",
                        key:'info',
                        schema: "phone"
                    }
                ],
                model:{
                    name:null,
                    phone:null,
                    text:null,
                    info:null,
                    sex:null,
                    id: null
                },
                value:"11010119900307627x"
            }
        },
        methods:{
            add() {
                this.inputList.push({   
                        id:4,
                        name: "性别",
                        type: "text",
                        key:'sex'
                    })
            },
            del() {
                this.inputList.splice(2,2)
            },
            submit() {
                let res = this.$refs.form.vaildataAll()
                if(res) {
                    console.log(res[0].component);
                    res[0].component.scrollTop();
                    res[0].component.focus();
                } 
            }
        },
        mounted() {
           
        }
    }
</script>

<style lang="less">
.btn{
    height: 44ipx;
    background-color: @itv-page-main;
    font-size: 16ipx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
</style>
