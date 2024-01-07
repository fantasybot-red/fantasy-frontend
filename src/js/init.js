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



async function clearload() {
    let load = document.getElementById("loading")
    let root = document.getElementById("root")
    let loadcss = document.getElementById("loadingcss")
    root.classList.add("rootloading")
    load.style.opacity = "0";
    await new Promise(r => setTimeout(r, 1000));
    loadcss.remove();
    load.remove();
    await new Promise(r => setTimeout(r, 100));
    root.style.opacity = "1";
    await new Promise(r => setTimeout(r, 1000));
    root.removeAttribute("style")
    root.removeAttribute("class")
}


export function init() {
    window.ison_mobile = false;
    let icon = document.getElementById("mobiicon");
    icon.addEventListener("click", opendev, true);
    if (document.readyState != "complete") {
        window.addEventListener("load", clearload);
    } else {
        clearload();
    }
}