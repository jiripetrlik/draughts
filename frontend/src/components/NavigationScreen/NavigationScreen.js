import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { sendMessage } from '../../api/index'

class NavigationScreen extends React.Component {
    waitForOponent() {
        let command = {
            Name: "wait",
            Parameters: ""
        }

        sendMessage(JSON.stringify(command))
    }

    render() {
        let waitingPlayers = this.props.players.Waiting.map((player) =>
            <ListItem button key={player.Id}>{player.Name}</ListItem>
        )
        let playingPlayers = this.props.players.Playing.map((players) =>
            <ListItem button key={players.id}>{players.names[0]} vs {players.names[1]}</ListItem>
        )

        return (
            <div className="navigation-screen">
                <Button onClick={this.waitForOponent}>Wait for oponent</Button>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Waiting for oponent</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {waitingPlayers}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography >Now playing</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {playingPlayers}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

export default NavigationScreen
