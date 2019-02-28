
import { Swarm } from "./Particle.js"

const fallout = document.querySelector("#fallout");
const explosion = document.querySelector("#explosion");
const spin = document.querySelector("#spin");
const amoeba = document.querySelector("#amoeba");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const particles = document.querySelector("#particles");
const slider = document.querySelector("#slider");

fallout.addEventListener("click", () => swarm.setPattern("fallout"));
explosion.addEventListener("click", () => swarm.setPattern("explosion"));
amoeba.addEventListener("click", () => swarm.setPattern("amoeba"));
spin.addEventListener("click", () => swarm.setPattern("spin"));

slider.addEventListener("input", () => {
    particles.innerHTML = slider.value;
});
slider.addEventListener("mouseup", () => {
    swarm.setParticles(slider.value);
});

red.addEventListener("click", () => swarm.setColor(0));
green.addEventListener("click", () => swarm.setColor(1));
blue.addEventListener("click", () => swarm.setColor(2));



// start
slider.value = 2000;
particles.innerHTML = slider.value;
let currentTime = Date.now();
let previousTime = Date.now();
let deltaTime = 0;

const swarm = new Swarm(canvas, slider.value);
swarm.init();

setInterval(() => {
    currentTime = Date.now();
    swarm.render(deltaTime);
    deltaTime = currentTime - previousTime;
    previousTime = currentTime;
}, 1000/48);