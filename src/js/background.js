chrome.webRequest.onBeforeRequest.addListener((info) => {
    console.log(info);
    window.performance.mark("adRequest");
}, {
    urls: ["https://pubads.g.doubleclick.net/*"],
});

