export default {
    /**
     * IOS 健盘不回弹的兼容问题
     */
    focusInit() {
        document.addEventListener('focusin', (e)=>{
            setTimeout(()=>{
                e.target.scrollIntoViewIfNeeded(true);
            },300)
            
        })

        document.addEventListener('focusout', ()=>{
            let u = navigator.userAgent;
            // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isIos) {
                setTimeout(()=>{
                    window.scrollTo(0,0)
                },300)
            }
            window.scrollTo(0,0);
        })
    }
}