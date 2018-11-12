function injectScript() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL("inject.bundle.js");
    document.head.append(s);
}

chrome.extension.onMessage.addListener((message) => {
    if (message.type === "adRequest") {
        console.log("[JW Performance Measurement] Adding Ad Request Mark");
        window.performance.mark("adRequest");
    }
});

injectScript();
