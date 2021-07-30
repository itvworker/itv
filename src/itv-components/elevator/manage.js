import Pinyin from '@/util/pinyin'

let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export default {
    mangeDictCountry(arr, use, key, text) {
        let obj = {};
        let list = []; 
        let useArr =[]; //常用国家id
        obj[key]= new Array(use.length);

        
        //处理常用国家
        useArr = use.map(item =>{
            return item.value;
        })
        let result = arr.map(item => {
            item.all = Pinyin.GetQP(item.areaName).toLowerCase();//获取全拼
            item.initial = Pinyin.GetJP(item.areaName) //获取首页字母
            let itemKey = item.initial.substring(0,1);
            item.initial = item.initial.toLowerCase();
            item.id = item.areaId;
            item.text =item.areaName;
            //查找是否是常用国家
           
            let index = useArr.indexOf(item.areaId);
            if(index>=0) {
                obj[key][index] = item;
            }

            if(obj[itemKey]) {
                obj[itemKey].push(item)
            }else{
                obj[itemKey]=[item]
            }
            return item;
        });
        
        //删除为空的数组, 将常用的国家地区放到前面
        useArr = [];
        obj[key].forEach(item=>{
            if(item){
                useArr.push(item);
            }
        })
        list.push({
            title: key,
            id: "use",
            text: text,
            list: useArr
        })


        str.split('').forEach(item => {
            if(obj[item]) {
                list.push({
                    id: item,
                    title: item,
                    list: obj[item]
                })
            }
        })

       
        return {
            list: list,
            searchList: result
        }
    },
    /**
     * 处理区号
     */
    mangeCodeDict(arr, use, key, text) {
        try {
            let obj = {};
            let list = []; 
            let useArr =[];
            let useStr = use.map(item=>item.value); //常用的值
            obj[key]= new Array(use.length);

            let result = arr.map(item => {
                
                item.all = Pinyin.GetQP(item.name) //获取全拼
                item.all = item.all.toLowerCase();
                item.initial = Pinyin.GetJP(item.name) //获取首页字母
                let itemKey = item.initial.substring(0,1);
                item.initial = item.initial.toLowerCase();
                item.id = item.value;
                item.text =item.name;
                //查找是否是常用国家
                let index = useStr.indexOf(item.value);
                if(index>=0) {
                    obj[key][index] = item;
                }
                if(obj[itemKey]) {
                    obj[itemKey].push(item)
                }else{
                    obj[itemKey]=[item]
                }
                return item;
            });


            //删除为空的数组, 将常用的国家地区放到前面
        
            obj[key].forEach(item=>{
                if(item){
                    useArr.push(item);
                }
            })
            list.push({
                title: key,
                text: text,
                id: "use",
                list: useArr
            })

            str.split('').forEach(item => {
                if(obj[item]) {
                    list.push({
                        id: item,
                        title: item,
                        list: obj[item]
                    })
                }
            })
            return {
                list: list,
                searchList: result
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}