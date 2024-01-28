for (let i of document.scripts) {
    if (!i.src) {
        continue;
    }
    i.onerror = function () {
        let n_script = document.createElement("script");
        for (let i of n_script.attributes) {
            n_script.setAttribute(i.name, i.value);
        }
        n_script.src = `/proxy/script?u=${encodeURIComponent(i.src)}`;
        i.parentNode.insertBefore(n_script, i);
        i.remove();
    }
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-YS5RWDRN7N", {
    transport_url: location.origin + "/proxy/",
});