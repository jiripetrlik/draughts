import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function NavigationScreen() {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography >Waiting for oponent</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Player 1
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default NavigationScreen
