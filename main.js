// Traits that will become flowers. Feel free to edit text/colors/positions.
const TRAITS = [
    { text: "Your Kindness 💖", petal: "#ffb1d6", center: "#ffd96a", x: "10%" },
    { text: "Your Smile 😊", petal: "#ffd0a8", center: "#ffe780", x: "22%" },
    { text: "Your Confidence ✨", petal: "#a9c9ff", center: "#ffe06a", x: "34%" },
    { text: "Your Creativity 🎨", petal: "#c6b1ff", center: "#ffd86a", x: "46%" },
    { text: "Your Support 🤗", petal: "#b2f2bb", center: "#ffe27a", x: "58%" },
    { text: "Your Laughter 😄", petal: "#ffc3a0", center: "#ffdf6b", x: "70%" },
    { text: "Your Strength 🛡️", petal: "#ff9abb", center: "#ffd355", x: "82%" },
    { text: "Our Dreams 🌙", petal: "#9ee6ff", center: "#ffe06a", x: "90%" }
];

const garden = document.getElementById("garden");

/* Create petals with rotation index attribute i=0..7 */
function createPetal(i, color){
    const p = document.createElement("div");
    p.className = "petal";
    p.setAttribute("i", String(i));
    p.style.setProperty("--c", color);
    // helpful custom property to use in transforms if needed
    p.style.setProperty("--rot", `${i * 45}deg`);
    return p;
}

function createFlower({ text, petal, center, x }, idx){
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.style.left = x;

    // Randomize slight delay so flowers sway differently
    flower.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;

    const stem = document.createElement("div");
    stem.className = "stem";

    const leafL = document.createElement("div");
    leafL.className = "leaf l";
    const leafR = document.createElement("div");
    leafR.className = "leaf r";

    const bloom = document.createElement("div");
    bloom.className = "bloom";

    // 8 petals around
    for(let i = 0; i < 8; i++){
        bloom.appendChild(createPetal(i, petal));
    }

    const centerDot = document.createElement("div");
    centerDot.className = "center";
    centerDot.style.background = `radial-gradient(100% 100% at 30% 30%, #fff7c2 0%, ${center} 40%, #e3b73c 100%)`;

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = text;

    flower.appendChild(stem);
    flower.appendChild(leafL);
    flower.appendChild(leafR);
    flower.appendChild(bloom);
    bloom.appendChild(centerDot);
    flower.appendChild(label);

    // Touch support: tap to toggle bloom for 2.5s
    flower.addEventListener("click", () => {
        flower.classList.add("bloomed");
        setTimeout(() => flower.classList.remove("bloomed"), 2500);
    });

    // Keyboard focus support
    flower.tabIndex = 0;
    flower.setAttribute("role", "button");
    flower.setAttribute("aria-label", text);
    flower.addEventListener("keydown", (e) => {
        if(e.key === "Enter" || e.key === " "){
            e.preventDefault();
            flower.classList.add("bloomed");
            setTimeout(() => flower.classList.remove("bloomed"), 2500);
        }
    });

    return flower;
}

/* Populate the garden */
TRAITS.forEach((t, i) => {
    const f = createFlower(t, i);
    garden.appendChild(f);
});

/* Fireflies for night mode */
function addFireflies(count = 22){
    for(let i = 0; i < count; i++){
        const dot = document.createElement("div");
        dot.className = "firefly";
        dot.style.left = Math.random() * 100 + "%";
        dot.style.bottom = (Math.random() * 60 + 25) + "vh";
        dot.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
        dot.style.animationDuration = (5 + Math.random() * 4).toFixed(2) + "s";
        garden.appendChild(dot);
    }
}
addFireflies();

/* Day/Night toggle */
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
    const isNight = document.body.classList.toggle("day");
    if(isNight){
        // switched to day (class added): update label
        toggleBtn.textContent = "Day";
    }else{
        toggleBtn.textContent = "Night";
    }
});

/* Accessibility: prefer-reduced-motion */
const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
if(mediaReduce.matches){
    document.querySelectorAll(".flower").forEach(el => el.style.animation = "none");
    document.querySelectorAll(".firefly").forEach(el => el.style.animation = "none");
}
