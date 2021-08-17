// logs.js


Page({
    data: {
        logs: []
    },
    onLoad() {
        
    },
    click() {
        console.log("click----------");
    },
    refresh() {
        setTimeout(()=>{
            this.selectComponent('.scroller').refresh();
        },3000)
        
       
    }
})
