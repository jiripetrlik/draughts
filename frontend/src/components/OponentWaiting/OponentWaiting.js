import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class OponentWaiting extends React.Component {

    render() {
        return (
            <div className="oponent-waiting">
                <Typography>Waiting for oponent</Typography>
                <Button>Cancel</Button>
            </div>
        )
    }
}

export default OponentWaiting
