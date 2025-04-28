(() => {
// Declarations
var container	= document.getElementById("container"),
    content     = document.getElementById("content"),
    is_mobile	= ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent)),
    is_chrome   = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    z0          = is_chrome ? 0 : 0.01,
    array       = [],
    count       = 2,

INIT = (data) => {
    ADD_HEADLINE(data.headline);
    array = SHUFFLE(data.options);

    for (let i=0; i < count; i++) {
        ADD_CARD(i, array[0].image, array[0].name);
        array.shift();
        if (i !== count - 1) ADD_OR();
    }
    ANIMATE();
},

ADD_HEADLINE = (data) => {
    let headline = document.createElement("div");
    headline.textContent = data;
    headline.id = "headline";
    container.prepend(headline);
},

SHUFFLE = (arr) => {
    arr.forEach((data, i) => {
        const n = Math.floor(Math.random() * arr.length);
        [arr[i], arr[n]] = [arr[n], arr[i]];
    });
    return arr;
},

ADD_CARD = (num,img,txt) => {
    let card    = document.createElement("div"),
        desc    = document.createElement("div");

    card.id = `card_${num}`;
    card.className = "card";
    card.style.backgroundImage = `url(${img})`;
    card.style.cursor = "pointer";

    desc.className = "desc";
    desc.innerHTML = txt;

    PRELOADIMAGE(img);

    card.append(desc);

    card.addEventListener("click", ()=> {
        switch(card.id){
            case "card_0":
                gsap.to("#card_1", {duration:0.5, rotateY:90, scale:0.8, skewY:6, z:z0, ease:"power1.out", onComplete: ()=> SWAP_CARD("card_1")});
                break;
            case "card_1": 
                gsap.to("#card_0", {duration:0.5, rotateY:90, scale:0.8, skewY:6, z:z0, ease:"power1.out", onComplete: ()=> SWAP_CARD("card_0")});
                break;
        }
    });

    content.append(card);
},

PRELOADIMAGE = (src) => {
    const img = new Image();
    img.src = src;
},

SWAP_CARD = (id) => {
    let card    = document.getElementById(id),
        cards   = content.querySelector(".card"),
        desc    = card.querySelector(".desc"),
        or    = content.querySelector(".or")

    /* console.log(array.length, array); */
    if(array.length === 0) {
        card.style.display = "none";
        or.style.display = "none";
        cards.style.cursor = "auto";
        cards.removeEventListener("click");
    } else {   
        card.style.backgroundImage = `url(${array[0].image})`;
        desc.innerHTML = array[0].name;
        array.shift();
        gsap.fromTo(card, {skewY:-6},{duration:0.5, delay:0.1, scale:1, rotateY:0, skewY:0, z:z0, ease:"power1.inOut"});
        PRELOADIMAGE(array[0].image);
    }
},

ADD_OR = () => {
    let or    = document.createElement("div");

    or.className = "or";
    or.innerHTML = "or";
    
    content.append(or);
},

ANIMATE = () => {
    let tl = gsap.timeline();
    CSSPlugin.defaultTransformPerspective = 1000;
    /*gsap.ticker.lagSmoothing(false); //continue animation on switch tab*/
    tl
    .set(container, {visibility:"visible"},"+=0.5")
    .fromTo('#content > div', { opacity:0, y:300}, {duration:1, opacity:1, y:0, stagger:0.05, ease:"power2.inOut"},"<")
    .seek(0);
    window.duration = tl.totalDuration();
};

fetch('src/categories/Sports/Basketball/NBA_001.json')
.then(response => {
    if (!response.ok) throw new Error('Network Response Error');
    return response.json();
})
.then(data => {
    INIT(data);
})
.catch(error => console.error('Error loading JSON data:', error));

})();