import Typed from "typed.js";
import { Application } from "@splinetool/runtime";
import * as THREE from 'three'
import NET from "vanta/dist/vanta.net.min";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
let m_data = await fetch("/assets/scene.splinecode");
let m_raw = await m_data.arrayBuffer();
app.start(m_raw); 
let vanta = NET({
    el: ".head1",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    scale: 1.0,
    scaleMobile: 0.25,
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    showDots: false,
    THREE: THREE
});

let sting_list = [
    "Music",
    "Moderation",
    "Fun",
    "Temp Voice",
    "AI",
    "Utilitys",
    "Multipurpose",
];
const typed = new Typed(".typed", {
    strings: sting_list,
    typeSpeed: 200,
    backSpeed: 100,
    backDelay: 2000,
    cursorChar: "",
    loop: true,
});
let last_is_big = window.innerWidth >= 1010;
window.addEventListener("resize", () => {
    if (vanta.scene.children && window.innerWidth < 1010) {
        vanta.restart();
    }
    if ((window.innerWidth >= 1010) && !last_is_big) {
        app.play();
        app.start(m_raw);
        if (vanta.scene.children) {
            vanta.scene.clear();
        }
        last_is_big = true;
    } else if ((window.innerWidth < 1010) && last_is_big) {
        app.stop();
        vanta.restart();
        last_is_big = false;
    }
});
window.addEventListener("loaded", () => {
    vanta.resize();
    if (window.innerWidth >= 1010) {
        if (vanta.scene) {
            vanta.scene.clear();
        }
    } else {
        app.stop();
    }
})