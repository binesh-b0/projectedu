import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    makeStyles,
} from '@material-ui/core';
import styles from './style.module.css';

const ThirdRoute = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });
    const classes = useStyles();

    return (
        <div className={styles.container}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary>
                    <p>Enter your 10th Educational Details</p>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={styles.form}>
                        <TextField
                            className={classes.textField}
                            label='School Name'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='CGPA/Percentage'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='Board'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            variant='outlined'
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
            >
                <AccordionSummary>
                    <p>Enter your 12th Educational Details</p>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={styles.form}>
                        <TextField
                            className={classes.textField}
                            label='School Name'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='CGPA/Percentage'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='Board'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            variant='outlined'
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
            >
                <AccordionSummary>
                    <p>Enter your College Educational Details</p>
                </AccordionSummary>
                <AccordionDetails>
                    <form className={styles.form}>
                        <TextField
                            className={classes.textField}
                            label='College Name'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='CGPA/Percentage'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            variant='outlined'
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ThirdRoute;
