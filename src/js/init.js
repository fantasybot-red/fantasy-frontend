import { get_user_status } from "../js/login_modun.js";

const event_loading = new Event("loaded")

async function end_load() {
    let load = document.getElementById("loading");
    let root = document.getElementById("root");
    load.style.opacity = "0";
    await new Promise(r => setTimeout(r, 1000));
    load.setAttribute("hidden", "");
    root.removeAttribute("hidden");
    await new Promise(r => setTimeout(r, 100));
    root.style.opacity = "1";
    window.dispatchEvent(event_loading);
    await new Promise(r => setTimeout(r, 1000));
    root.removeAttribute("style");
    root.removeAttribute("class");
}

async function start_load() {
    let load = document.getElementById("loading");
    let root = document.getElementById("root");
    load.style.opacity = "1";
    root.classList.add("rootloading");
    await new Promise(r => setTimeout(r, 1000));
    root.setAttribute("hidden", "");
    load.removeAttribute("hidden");
    await new Promise(r => setTimeout(r, 100));
    root.style.opacity = "0";
    await new Promise(r => setTimeout(r, 1000));
    load.removeAttribute("style");
}

window.start_load = start_load;
window.end_load = end_load;

async function init() {
    if (location.hostname == "localhost") location.replace("https://test.fantasybot.xyz/")
    await get_user_status();
    if (document.readyState != "complete") {
        window.addEventListener("load", end_load);
    } else {
        end_load();
    }
}

init();