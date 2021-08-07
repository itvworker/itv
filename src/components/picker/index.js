Component({
    properties: {
        value: {
            type: Boolean,
            value: false,
        },
        hideOnClick:{
            type: Boolean,
            value: true
        },
        items: {
            type: Array,
            value: []
        },
        lastChange: {
            type: Boolean,
            value: false
        },
        rows: {
            type: Number, 
            value: 5
        },
        isLoop: {
            type: Boolean,
            value: false
        },
        titleBar: {
            type: Boolean,
            value: true
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        confirmText: {
            type: String,
            value: "确认"
        },
        titleText: {
            type: String,
            value:"请选择"
        },
        className: {
            type: String,
            default: ''
        },
        pickerClassName: {
            type: String,
            default: ''
        },
        defaultValue:{
            type: Array,
            default: []
        },
        clearMask:{
            type: Boolean,
            value: false
        }
    },
    data: {
        reload: 0,
        list: [],
        selceted:[]
    },
    methods: {
        init() {
            let list = [];
            let selceted = [];
            list[0] = this.properties.items.map(item=>{
                return item;
            })
            this.setData({
                selceted: selceted,
                list: list
            })
        },   
        chooseItem(res) {
           
            let list = this.data.list;
            
            if(this.properties.items[res.detail.keyIndex]) {
                list[res.detail.keyIndex+1] = this.properties.items[res.detail.keyIndex].children;
                this.setData({
                    list: list
                })
            }
            
        },
        closePicker() {
            this.$emit('input', false);
        },
        confirm() {
            if(this.isForbidConfirm) return;
            setTimeout(()=>{
                this.$emit('onConfirm', this.selceted);
            },200)
        }
    }
  
})