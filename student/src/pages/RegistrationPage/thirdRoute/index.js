import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    makeStyles,
} from '@material-ui/core';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { changeProfileSchoolInfo } from '../../../actions/userActions';

const ThirdRoute = ({ schoolInfo, onChangeSchoolData }) => {
    const [expanded, setExpanded] = useState(false);

    // const [degrees, setDegrees] = useState([]);

    const [collegeName, setCollegeName] = useState('');
    const [degree, setDegree] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [location, setLocation] = useState('');

    // const changeDegree = (data) => {
    //     const len = degree.length - 1;
    //     setDegree()
    // };

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
                            value={collegeName}
                            onChange={(event) =>
                                setCollegeName(event.target.value)
                            }
                        />
                        <TextField
                            className={classes.textField}
                            label='Degree'
                            variant='outlined'
                            onChange={(event) => setDegree(event.target.value)}
                            value={degree}
                        />
                        <TextField
                            className={classes.textField}
                            label='CGPA/Percentage'
                            variant='outlined'
                            onChange={(event) => setCgpa(event.target.value)}
                            value={cgpa}
                        />
                        <TextField
                            className={classes.textField}
                            label='Location'
                            variant='outlined'
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            value={location}
                        />
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSchoolData: (data) => {
            dispatch(changeProfileSchoolInfo(data));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        schoolInfo: state.userProfile.academics,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThirdRoute);
