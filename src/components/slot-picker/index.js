Component({
    properties: {
        listData: {
            type: Array,
            required: true
        },
        defaultValue: {
            type: String | Number
        },

        keyIndex: {
            type: Number,
            value: 0
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
    
    methods: {
        onLoad: function() {
            this.setData({
                reload: this.data.reload+1
            })
        },
        sendEvent(obj) {
            console.log('----------------------------------------');
            obj.keyIndex = this.properties.keyIndex;
            console.log(this.properties.keyIndex);
            this.triggerEvent('chooseItem', {}, obj)
        }
    }
  
})