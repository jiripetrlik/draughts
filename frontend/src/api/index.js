var socket = new WebSocket("ws://localhost:8080/ws");

let connect = () => {
    socket.onmessage = msg => {
        console.log(msg.data);
    };
}

let sendMessage = msg => {
    socket.send(msg)
}

export {connect, sendMessage}
