import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { sendMessage } from '../../api/index'

class OponentWaiting extends React.Component {

    stopWaiting() {
        let command = {
            Name: "stop-waiting",
            Parameters: ""
        }

        sendMessage(JSON.stringify(command))
    }

    render() {
        return (
            <div className="oponent-waiting">
                <Typography>Waiting for oponent</Typography>
                <Button onClick={this.stopWaiting}>Cancel</Button>
            </div>
        )
    }
}

export default OponentWaiting
