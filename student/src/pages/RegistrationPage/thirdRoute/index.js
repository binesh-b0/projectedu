/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    makeStyles,
} from '@material-ui/core';
import styles from './style.module.css';
import { connect } from 'react-redux';
import {
    changeProfileSchoolInfo,
    removeDegreeDetail,
} from '../../../actions/userActions';
import Button from '../../../components/CTAButton';
import Degree from '../../../components/Degree';

const ThirdRoute = ({
    schoolInfo,
    onChangeSchoolData,
    handleNext,
    handlePrev,
    degreeDetails,
    removeDegree,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [degrees, setDegrees] = useState([{ id: 'panel3' }]);

    useEffect(() => {
        const ids = Object.keys(degreeDetails);
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] === 'panel3') continue;
            else setDegrees([...degrees, { id: ids[i] }]);
        }
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });

    const classes = useStyles();
    const addMoreDegreeButton = () => {
        const len = degrees.length + 3;
        setDegrees([...degrees, { id: 'panel' + len }]);
        console.log(degrees);
    };

    const removeLastDegree = () => {
        setDegrees(degrees.slice(0, -1));
        removeDegree(degrees.pop().id);
    };

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
                            value={schoolInfo.schoolName10}
                            onChange={(event) => {
                                onChangeSchoolData({
                                    schoolName10: event.target.value,
                                });
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label='CGPA/Percentage'
                            variant='outlined'
                            type='number'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    cgpa10: event.target.value,
                                });
                            }}
                            value={schoolInfo.cgpa10}
                        />
                        <TextField
                            className={classes.textField}
                            label='Board'
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    board10: event.target.value,
                                });
                            }}
                            value={schoolInfo.board10}
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    location10: event.target.value,
                                });
                            }}
                            value={schoolInfo.location10}
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
                            onChange={(event) => {
                                onChangeSchoolData({
                                    schoolName12: event.target.value,
                                });
                            }}
                            value={schoolInfo.schoolName12}
                        />
                        <TextField
                            className={classes.textField}
                            label='CGPA/Percentage'
                            variant='outlined'
                            type='number'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    cgpa12: event.target.value,
                                });
                            }}
                            value={schoolInfo.cgpa12}
                        />
                        <TextField
                            className={classes.textField}
                            label='Board'
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    board12: event.target.value,
                                });
                            }}
                            value={schoolInfo.board12}
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            variant='outlined'
                            onChange={(event) => {
                                onChangeSchoolData({
                                    location12: event.target.value,
                                });
                            }}
                            value={schoolInfo.location12}
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
            {degrees.map((degree) => {
                return (
                    <Degree
                        expanded={expanded}
                        id={degree.id}
                        onChange={(id) => handleChange(id)}
                    />
                );
            })}
            <div className={styles.btnDiv}>
                <Button
                    heading={'Add more degree'}
                    style={styles.btn}
                    onPress={() => addMoreDegreeButton()}
                />
                <Button
                    heading={'Remove last degree'}
                    style={styles.btn}
                    onPress={() => removeLastDegree()}
                />
            </div>
            <div className={styles.btnDiv}>
                <Button heading='Previous' onPress={handlePrev} />
                <Button heading='Continue' onPress={handleNext} />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSchoolData: (data) => {
            dispatch(changeProfileSchoolInfo(data));
        },
        removeDegree: (data) => {
            dispatch(removeDegreeDetail(data));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        schoolInfo: state.userProfile.academics,
        degreeDetails: state.userProfile.degree,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThirdRoute);
