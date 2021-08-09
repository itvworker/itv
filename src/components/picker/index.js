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
        },
        pickerType: {
            type: String,
            value: 'normal'
        }
    },
    data: {
        reload: 0,
        list: [],
        selceted:[]
    },
    created() {
        
    },
    methods: {
        init() {
            if (this.properties.pickerType === 'parent'){
                this.setData({
                    list: []
                })
                setTimeout(()=>{
                    let list = [];
                    let selceted = [];
                    if (this.properties.defaultValue) {
                        selceted = JSON.parse(JSON.stringify(this.properties.defaultValue));
                    }
                    list[0] = this.properties.items.map(item=>{
                        return item;
                    })
                    this.setData({
                        selceted: selceted,
                        list: list
                    })
                })
            }

            if (this.properties.pickerType === 'normal') {
                this.selectComponent('.picker').init();
            }
            
        },   
        chooseItem(res) {
            //
            if (this.properties.pickerType === 'parent') {
                let list = this.data.list;
                if(res.detail.value && res.detail.value.children) {
                    list[res.detail.keyIndex+1] = res.detail.value.children;
                    this.setData({
                        list: list
                    })
                }
                this.data.selceted[res.detail.keyIndex] = res.detail.value;
            }
       
            //
            if (this.properties.pickerType === 'normal') {
                this.triggerEvent('chooseItem', res.detail,  res.detail);
                this.data.selceted[res.detail.keyIndex] = res.detail.value;
            }
            
        },
        onConfirm() {
            setTimeout(()=>{
                this.triggerEvent('confirm', this.data.selceted,  this.data.selceted);
            },100)
        },
        onClose() {
            this.triggerEvent('close', {},  {});
        }
    }
  
})