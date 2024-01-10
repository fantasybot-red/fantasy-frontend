function opendev() {
    let root = document.getElementById('main');
    let db = document.getElementById("mobidropbar");
    let ic = document.getElementById("mobiicon");
    if (window.ison_mobile) {
        db.classList.remove(`opun`);
        root.classList.remove(`blurroot`)
        ic.innerText = 'menu';
        window.ison_mobile = false;
    } else {
        db.classList.add(`opun`);
        root.classList.add(`blurroot`)
        ic.innerText = 'close';
        window.ison_mobile = true;
    }
}



async function end_load() {
    let load = document.getElementById("loading");
    let root = document.getElementById("root");
    load.style.opacity = "0";
    await new Promise(r => setTimeout(r, 1000));
    load.setAttribute("hidden", "");
    root.removeAttribute("hidden");
    await new Promise(r => setTimeout(r, 100));
    root.style.opacity = "1";
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

function init() {
    window.ison_mobile = false;
    let icon = document.getElementById("mobiicon");
    icon.addEventListener("click", opendev, true);
    if (document.readyState != "complete") {
        window.addEventListener("load", end_load);
    } else {
        end_load();
    }
}

init();