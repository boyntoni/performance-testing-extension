function injectScript() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL("inject.bundle.js");
    document.head.append(s);
}