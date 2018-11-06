
document.addEventListener('DOMContentLoaded', () => {
    anime({
        targets: '.bg_img',
        translateX: (el,i)=>Math.pow(-1,i)*Math.random()*2000,
        translateY: (el,i)=>Math.pow(-1,i)*i*Math.random()*1000,
        loop: true,
        easing: 'linear',
        duration: 60000,
        rotate: {
            value: 6400,
            loop: true,
            duration : 120000,
            direction: 'alternate',
            
        }
    })
});