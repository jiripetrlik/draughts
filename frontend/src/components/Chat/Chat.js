import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function Chat(props) {
    let messages = props.messages.map((message, index) =>
        <Typography key={index}>{message.name}: {message.text}</Typography>)

    return (
        <div id="chat">
            <div>
                {messages}
            </div>
            <TextField label="Message"/>
        </div>
    )
}

export default Chat
