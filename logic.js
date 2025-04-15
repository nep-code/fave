(() => {
// Declarations
var container	= document.getElementById("container"),
    content     = document.getElementById("content"),
    is_mobile	= ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent)),
    is_chrome   = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    z0          = is_chrome ? 0 : 0.01,

INIT = (data) => {
    ADD_HEADLINE(data.surveyDescription);

    const options = data.cards.options;
    options.forEach((opt, index) => {
        ADD_CARD(opt.optionId, opt.imageUrl, opt.description);
        if (index !== options.length - 1) ADD_OR();
    });

    ANIMATE();
},

ADD_HEADLINE = (data) => {
    let headline = document.createElement("div");
    headline.textContent = data;
    headline.id = "headline";
    container.prepend(headline);
},

ADD_CARD = (id,img,txt) => {
    let card   = document.createElement("div"),
        desc    = document.createElement("div");

    card.id = id;
    card.className = "card";
    card.style.backgroundImage = `url(${img})`;

    desc.className = "desc";
    desc.innerHTML = txt;

    card.append(desc);
    
    content.append(card);
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

fetch('answers.json')
.then(response => {
    if (!response.ok) throw new Error('Network Response Error');
    return response.json();
})
.then(data => {
    INIT(data);
})
.catch(error => console.error('Error loading JSON data:', error));

})();