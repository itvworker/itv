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
    
    methods: {
       
    }
  
})