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
        isUpdate: {
            type: Boolean,
            value: false
        },
        lastChange: {
            type: Boolean,
            value: false
        },
        word: {
            type: String,
            value: '{value}'
        },
        //是否取整
        isInteger: {
           type: Boolean,
           value: false 
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
        onChooseItem(obj) {
            console.log('------------');
            console.log(obj);
        }
       
    },
   
  
})