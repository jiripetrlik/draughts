import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { sendMessage } from '../../api/index'
import './Chat.css'

class Chat extends React.Component<Readonly<any>, Readonly<any>> {

    keyPress(e: any) {
        if(e.keyCode === 13){
            let command = {
                Name: "message",
                Parameters: e.target.value
            }
            e.target.value = ""

            sendMessage(JSON.stringify(command))
         }
    }

    render() {
        let messages = this.props.messages.map((message: any, index: any) =>
            <Typography key={index}>{message.Name}: {message.Text}</Typography>)

        return (
            <div id="chat">
                <Typography variant="h6">Chat</Typography>
                <div id="chat-messages">
                    {messages}
                </div>
                <TextField label="Message" onKeyDown={this.keyPress}/>
            </div>
        )
    }
}

export default Chat
