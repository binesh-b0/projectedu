import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { addDegreeDetails } from '../../actions/userActions';

import styles from './degree.module.css';

const Degree = ({
    expanded,
    onChange,
    id,
    addDegreeDetails,
    degreeDetails,
}) => {
    const [details, setDetails] = useState({});

    useEffect(() => {
        if (degreeDetails.id) {
            setDetails({ ...degreeDetails.id });
        }
    }, [degreeDetails.id]);

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });
    const classes = useStyles();

    const addDataToStore = (data) => {
        console.log('The data in blah is ', data);
        addDegreeDetails({ id: id, ...data });
    };

    return (
        <Accordion expanded={expanded === id} onChange={onChange(id)}>
            <AccordionSummary>
                <p>Enter your College Educational Details</p>
            </AccordionSummary>
            <AccordionDetails>
                <form className={styles.form}>
                    <TextField
                        className={classes.textField}
                        label='College Name'
                        variant='outlined'
                        onChange={(event) =>
                            addDataToStore({
                                collegeName: event.target.value,
                            })
                        }
                        value={details ? details.collegeName : ''}
                    />
                    <TextField
                        className={classes.textField}
                        label='Degree'
                        variant='outlined'
                        onChange={(event) =>
                            addDataToStore({ degree: event.target.value })
                        }
                        value={details ? details.degree : ''}
                    />
                    <TextField
                        className={classes.textField}
                        label='CGPA/Percentage'
                        variant='outlined'
                        type='number'
                        onChange={(event) =>
                            addDataToStore({ cgpa: event.target.value })
                        }
                        value={details ? details.cgpa : ''}
                    />
                    <TextField
                        className={classes.textField}
                        label='Location'
                        variant='outlined'
                        onChange={(event) =>
                            addDataToStore({ location: event.target.value })
                        }
                        value={details ? details.location : ''}
                    />
                </form>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDegreeDetails: (data) => dispatch(addDegreeDetails(data)),
    };
};

const mapStateToProps = (state) => {
    console.log(state.userProfile.degree);
    return {
        degreeDetails: state.userProfile.degree,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Degree);
