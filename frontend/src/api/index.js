var socket = new WebSocket("ws://localhost:8080/ws");

let connect = changeState => {
    socket.onmessage = msg => {
        changeState(msg);
    };
}

let sendMessage = msg => {
    socket.send(msg)
}

export {connect, sendMessage}
