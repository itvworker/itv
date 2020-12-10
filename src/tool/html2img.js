export default {
    compressHtml(str){
        
    },
    getStyle() {
        
        let styles = document.querySelectorAll('style');
        let str = "";
        styles.forEach(item=>{
            str+=item.outerHTML;
        })

             
        return styles 
    }
}