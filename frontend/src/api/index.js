let wsURL = window.location.href
wsURL = wsURL.replace("http://", "ws://")
wsURL = wsURL.replace("https://", "wss://")
wsURL = wsURL + "ws"

if (process.env.NODE_ENV === "development") {
    wsURL = "ws://localhost:8080/ws"
}

let socket = null;
let onerror = null;

let connect = (changeState, errorFunction) => {
    socket = new WebSocket(wsURL)
    onerror = errorFunction

    socket.onmessage = msg => {
        changeState(msg);
    };
    socket.onerror = error => {
        errorFunction(error)
    }
}

let sendMessage = msg => {
    if (socket.readyState === 1) {
        socket.send(msg)
    } else {
        onerror()
    }
}

export {connect, sendMessage}
