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

class NavigationScreen extends React.Component<Readonly<any>, Readonly<any>> {

    constructor(props: any) {
        super(props)
        this.waitForOponent = this.waitForOponent.bind(this)
    }

    waitForOponent() {
        let command = {
            Name: "wait",
            Parameters: ""
        }

        sendMessage(JSON.stringify(command))
    }

    joinOponent(oponentID: number) {
        let command = {
            Name: "join",
            Parameters: oponentID.toString()
        }

        sendMessage(JSON.stringify(command))
    }

    render() {
        let waitingPlayers = this.props.players.Waiting.map((player: any) =>
            <ListItem button key={player.ID} onClick={this.joinOponent.bind(this, player.ID)}>{player.Name}</ListItem>
        )
        let playingPlayers = this.props.players.Playing.map((players: any) =>
            <ListItem button key={players.ID}>{players.Names[0]} vs {players.Names[1]}</ListItem>
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
