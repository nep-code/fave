(() => {
// Declarations
var container		= document.getElementById("container"),
    animation	= gsap.timeline(),
    is_mobile	= ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent)),
    is_chrome   = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    z0          = is_chrome ? 0 : 0.01,

INIT = (data) => {
    // CANVAS
    ADDHEADLINE(data.headline);
    ADD_TXT(data);

/* 
    // TITLE
    document.title = `${data.name}_${data.canvas.width}x${data.canvas.height}`;

    // META
    var metaTag = document.querySelector('meta[name="ad.size"]');
    metaTag.setAttribute('content', `width=${data.canvas.width},height=${data.canvas.height}`);

    

    // CONTENT
    
    RENDER(data.content);
    RENDER(data.button);

    // GUIDE
    if(data.guide.visible) {
        const newDiv = document.createElement("div");
        newDiv.style.backgroundImage = `url(${data.guide.url})`; 
        newDiv.style.opacity = "0.3";
        newDiv.classList.add("full", "unclick");
        const canvas = document.getElementById("canvas");
        canvas.appendChild(newDiv);
    } */

    ANIMATE();
},
ADDHEADLINE = (data) => {
    let headline = document.createElement("h1");
    headline.textContent = data;
    headline.id = "headline";
    container.prepend(headline);
};

ADD_TXT = (data) => {
    let card_left = document.querySelector('#card_left'),
        card_right = document.querySelector('#card_right'),
        txt_left = document.querySelector('#card_left p'),
        txt_right = document.querySelector('#card_right p');
    
    console.log(data);

    txt_left.innerHTML = data.options[0].name;
    card_left.style.backgroundImage = `url(${data.options[0].image})`


    txt_right.innerHTML = data.options[1].name;
    card_right.style.backgroundImage = `url(${data.options[1].image})`

};
ANIMATE = () => {
    let tl = gsap.timeline();
    CSSPlugin.defaultTransformPerspective = 1000;
    /*gsap.ticker.lagSmoothing(false); //continue animation on switch tab*/
    tl
    .set(container, {visibility:"visible"})
    .fromTo('#card_left', { x:-1000},{duration:1, x:0, ease:"power2.out"})
    .fromTo('#card_right', { x:1000},{duration:1, x:0, ease:"power2.out"},"<")
    .fromTo('#txt_or', { opacity:0, scale:3, z:z0}, {duration:1, opacity:1, scale:1, ease:"power2.inOut"},"<")
    .seek(0);
    window.duration = tl.totalDuration();
};

fetch('data.json')
.then(response => {
    if (!response.ok) throw new Error('Network Response Error');
    return response.json();
})
.then(data => {
    INIT(data);
})
.catch(error => console.error('Error loading JSON data:', error));

})();