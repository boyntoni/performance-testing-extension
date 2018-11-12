chrome.webRequest.onCompleted.addListener((info) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "adRequest" });
    });
}, {
    urls: ["https://pubads.g.doubleclick.net/*"],
});

