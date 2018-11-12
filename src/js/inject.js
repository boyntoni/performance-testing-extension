function addPlayerEventListeners() {
    console.log("[JW Performance Measurement] Adding Listeners");
    jwplayer().on("adResponse", () => {
        window.performance.mark("adResponse");
    });

    jwplayer().on("adImpression", () => {
        window.performance.mark("adImpression");
    });

    jwplayer().on("adError", () => {
        window.performance.mark("adError");
    });

    jwplayer().on("firstFrame", () => {
        const [requestMark] = window.performance.getEntriesByName("adRequest");
        const [impressionMark] = window.performance.getEntriesByName("adImpression");
        const timeBetweenRequestAndImpression = impressionMark ? impressionMark.startTime - requestMark.startTime : "N/A";
        const timeBetweenRequestAndNavStart = requestMark ? requestMark.startTime : "N/A";
        const timeBetweenImpressionAndNavStart = impressionMark ? impressionMark.startTime : "N/A";
        console.log("[JW Performance Measurement] Time Between Initial Ad Request and Ad Impression: ", timeBetweenRequestAndImpression);
        console.log("[JW Performance Measurement] Time Between Nav. Start and Iniitial Ad Request: ", timeBetweenRequestAndNavStart);
        console.log("[JW Performance Measurement] Time Between Nav. Start and Ad Impression: ", timeBetweenImpressionAndNavStart);
    });
}

function checkForJw() {
    if (!!window.jwplayer && typeof window.jwplayer === "function") {
        addPlayerEventListeners();
    } else {
        setTimeout(checkForJw, 100);
    }
}

checkForJw();
