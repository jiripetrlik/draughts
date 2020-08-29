import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect, sendMessage } from '../../api/index'

class NameInput extends React.Component {

    constructor(props) {
        super(props)
        connect()
    }

    keyPress(e) {
        if(e.keyCode === 13){
            sendMessage(e.target.value)
         }
    }
    
    render() {
        return (
            <TextField id="name-input" label="Your name" onKeyDown={this.keyPress}/>
        );
    }
}

export default NameInput
