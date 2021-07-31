export function calcStep(distance) {
   
    let dis = Math.abs(distance);

    if(dis===0) {
        return 0
    }
    let step = 0.5; 
    let numDis = 0;
    while(numDis<dis) {
        numDis+= step/0.9
        step = step/0.9
    }
    step = step/0.9
    if(distance < 0) {
        return -step;
    }
    return step
}






export default function(el) {
    let stepY = null;
    let nowY = null;
    let scrollY = null;
    
    function step() {  
        nowY = el.scrollTop+stepY;
        el.scrollTop = nowY;
     
        if(stepY>0 && nowY >=scrollY) {
            return
        }
        if(stepY<0 && nowY<=scrollY) {
            return
        }
        stepY*=0.9;
        window.requestAnimationFrame(step)
    }

    // scrollHeight-offsetHeight
    return function(scrollHeight) {
        scrollY = Math.min(el.scrollHeight - el.offsetHeight, scrollHeight) 
        nowY = el.scrollTop;
        stepY = calcStep(scrollY-nowY);
        window.requestAnimationFrame(step);  
    }
}