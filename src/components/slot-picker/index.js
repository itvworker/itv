Component({
    externalClasses:['el-class'],
    properties: {
        listData: {
            type: Array,
            value:[]
        },
        defaultValue: {
            type: String | Number
        },

        keyIndex: {
            type: Number,
            value: null
        },
        
        isLoop: {
            type: Boolean,
            value: false
        },
        rows: {
            type: Number,
            value: 5
        },
        pickerIndex: {
            type: Number,
            value: null
        },
        clearMask: {
            type: Boolean,
            value: false
        }
    },
    data: {
        reload: 0,
    },
    ready() {
        this.onLoad();
    },
    methods: {
        onLoad: function() {
            this.setData({
                reload: this.data.reload+1
            })
        },
        onClick() {
            console.log(this.properties.keyIndex);
            
        }
    }
  
})