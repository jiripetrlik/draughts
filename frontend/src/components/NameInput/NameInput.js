import React from 'react';
import TextField from '@material-ui/core/TextField';
import { sendMessage } from '../../api/index'

class NameInput extends React.Component {

    keyPress(e) {
        if(e.keyCode === 13){
            let command = {
                Name: "login",
                Parameters: e.target.value
            }

            sendMessage(JSON.stringify(command))
         }
    }
    
    render() {
        return (
            <TextField id="name-input" label="Your name" onKeyDown={this.keyPress}/>
        );
    }
}

export default NameInput
