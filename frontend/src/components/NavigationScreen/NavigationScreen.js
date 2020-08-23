import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function NavigationScreen() {
    return (
        <div className="navigation-screen">
            <Button>Wait for oponent</Button>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Waiting for oponent</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem button>Player 1</ListItem>
                        <ListItem button>Player 2</ListItem>
                        <ListItem button>Player 3</ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography >Now playing</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem button>Player 1 vs Player 2</ListItem>
                        <ListItem button>Player 3 vs Player 4</ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default NavigationScreen
