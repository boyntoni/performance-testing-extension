chrome.webRequest.onCompleted.addListener(() => {
    window.performance.mark("adRequest");
}, {
    urls: ["https://pubads.g.doubleclick.net/*"],
});

