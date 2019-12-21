document.querySelector("#code").addEventListener("submit", e => {
    console.log('!!!!');
    e.preventDefault();
    main(new FormData(e.currentTarget).get("eventKey"));
});

const main = eventKey => {
    const ws = connect(eventKey);
};

const connect = eventKey => {
    const url = `${location.origin.replace(/^http/, "ws")}?eventKey=${eventKey}`;
    return new WebSocket(url);
};