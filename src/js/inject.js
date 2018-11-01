function addPlayerEventListeners() {
    jwplayer().on('adResponse', () => {
        window.performance.mark('adResponse');
    });

    jwplayer().on('adError', () => {
        window.performance.mark('adError');
    });

    jwplayer().on('firstFrame', () => {
        console.log('Ad Request to Ad Impression: ', performance.measure("adRequest", "adResponse"));
        console.log('Ad Request to Ad Error :', performance.measure("adRequest", "adError"));
    });
}

jwplayer().on('ready', addPlayerEventListeners);

