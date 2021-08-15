module.exports = {
    touchmove: function(event, ownerInstance) {
        var instance = ownerInstance.selectComponent('.move-bar')
        var touch1 = event.touches[0]
        instance.setStyle({
            transform: "translate("+touch1.pageX+"px, "+touch1.pageY+"px)",
        })
        console.log(JSON.stringify(instance.getState()))
        return false;
    },
    loaded: function(event, ownerInstance){
        console.log(event)
    }  
}