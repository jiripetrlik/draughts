let wsURL = window.location.href
wsURL = wsURL.replace("http://", "ws://")
wsURL = wsURL.replace("https://", "wss://")
wsURL = wsURL + "ws"

if (process.env.NODE_ENV === "development") {
    wsURL = "ws://localhost:8080/ws"
}

let socket = new WebSocket(wsURL);

let connect = changeState => {
    socket.onmessage = msg => {
        changeState(msg);
    };
}

let sendMessage = msg => {
    socket.send(msg)
}

export {connect, sendMessage}
