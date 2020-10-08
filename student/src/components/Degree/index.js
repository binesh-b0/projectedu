import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    makeStyles,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    FormHelperText,
    Radio,
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
    const [markType, setMarkType] = useState('C');
    const [cgpaError, setCgpaError] = useState(false);

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
        addDegreeDetails({ id: id, ...data });
    };

    const checkValidMarks = () => {
        const value = details.cgpa;
        if (value) {
            if (markType === 'C' && (value > 10 || value < 0))
                setCgpaError(true);
            else if (markType === 'P' && (value > 100 || value < 0))
                setCgpaError(true);
            else setCgpaError(false);
        }
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
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'></FormLabel>
                        <RadioGroup
                            name='cgpa'
                            row
                            value={markType}
                            onChange={(event) =>
                                setMarkType(event.target.value)
                            }
                        >
                            <FormControlLabel
                                value='C'
                                label='CGPA'
                                control={<Radio />}
                            />
                            <FormControlLabel
                                value='P'
                                label='Percentage'
                                control={<Radio />}
                            />
                        </RadioGroup>
                        <FormHelperText style={{ marginTop: '-2px' }}>
                            {/* {!!formik.errors.gender && formik.touched.gender
                                    ? formik.errors.gender
                                    : false} */}
                        </FormHelperText>
                    </FormControl>{' '}
                    <TextField
                        className={classes.textField}
                        label='CGPA/Percentage'
                        variant='outlined'
                        type='number'
                        helperText='Invalid value'
                        error={cgpaError}
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
