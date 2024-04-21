import Hotjar from '@hotjar/browser';

if (!navigator.webdriver) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", "G-YS5RWDRN7N");
    const siteId = 3849480;
    const hotjarVersion = 6;
    Hotjar.init(siteId, hotjarVersion);
}

(async () => {
    if (!("serviceWorker" in navigator)) {
        return;
    }
    await navigator.serviceWorker.register(`/sw.js`)
})();