function addPlayerEventListeners() {
    jwplayer().on('adResponse', () => {
        window.performance.mark('adResponse');
    });

    jwplayer().on('adImpression', () => {
        window.performance.mark('adImpression');
    });

    jwplayer().on('adError', () => {
        window.performance.mark('adError');
    });

    jwplayer().on('firstFrame', () => {
        const [requestMark] = window.performance.getEntriesByName("adRequest");
        const [responseMark] = window.performance.getEntriesByName("adResponse");
        const timeBetweenRequestAndResponse = responseMark.startTime - requestMark.startTime;
        console.log("JW Performance Measurement [Time Between Ad Request and Response]: ", timeBetweenRequestAndResponse);
    });
}

function checkForJw() {
    if (window.jwplayer && typeof window.jwplayer === "function") {
        addPlayerEventListeners();
    } else {
        setTimeout(checkForJw, 100);
    }
}


checkForJw();