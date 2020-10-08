/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import styles from './style.module.css';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { connect } from 'react-redux';
import {
    changeProfileSchoolInfo,
    removeDegreeDetail,
} from '../../../actions/userActions';
import MYButton from '../../../components/CTAButton';
import Degree from '../../../components/Degree';

import * as yup from 'yup';

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
    const [markType, setMarkType] = useState('C');
    const [markType2, setMarkType2] = useState('C');

    const [error, setError] = useState({
        sn: false,
        cg: false,
        board: false,
        location: false,
        sn1: false,
        cg1: false,
        board1: false,
        location1: false,
    });
    const validate = () => {
        console.log(error);

        if (schoolInfo.schoolName10.length < 1) {
            console.log('School 10');
            setError((prevState) => ({ ...prevState, sn: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, sn: false }));
        }
        if (
            markType === 'C' &&
            (schoolInfo.cgpa10 > 10 || schoolInfo.cgpa10 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg: true }));
            return false;
        } else if (
            markType === 'P' &&
            (schoolInfo.cgpa10 > 100 || schoolInfo.cgpa10 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg: false }));
        }
        if (schoolInfo.cgpa10.length < 1) {
            console.log('cgpa 10');
            setError((prevState) => ({ ...prevState, cg: true }));

            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg: false }));
        }
        if (schoolInfo.board10.length < 1) {
            console.log('board 10');
            setError((prevState) => ({ ...prevState, board: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, board: false }));
        }
        if (schoolInfo.location10.length < 1) {
            console.log('location 10');
            setError((prevState) => ({ ...prevState, location: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, location: false }));
        }
        if (schoolInfo.schoolName12.length < 1) {
            console.log('school 12');
            setError((prevState) => ({ ...prevState, sn1: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, sn1: false }));
        }
        if (schoolInfo.cgpa12.length < 1) {
            console.log('cgpa 12');
            setError((prevState) => ({ ...prevState, cg1: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg1: false }));
        }
        if (
            markType2 === 'C' &&
            (schoolInfo.cgpa12 > 10 || schoolInfo.cgpa12 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg1: true }));
            return false;
        } else if (
            markType2 === 'P' &&
            (schoolInfo.cgpa12 > 100 || schoolInfo.cgpa12 < 1)
        ) {
            setError((prevState) => ({ ...prevState, cg1: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, cg1: false }));
        }
        if (schoolInfo.board12.length < 1) {
            console.log('board 12');
            setError((prevState) => ({ ...prevState, board1: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, board1: false }));
        }
        if (schoolInfo.location12.length < 1) {
            console.log('location 12');
            setError((prevState) => ({ ...prevState, location1: true }));
            return false;
        } else {
            setError((prevState) => ({ ...prevState, location1: false }));
        }
        console.log(error);
        return true;
    };

    useEffect(() => {
        const ids = Object.keys(degreeDetails);
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] === 'panel3') continue;
            else setDegrees([...degrees, { id: ids[i] }]);
        }
    }, []);

    // const validate=()=>{
    //     console.log("error",error,schoolInfo.schoolName10);
    //     (schoolInfo.schoolName10)? setError(prevState=>({...prevState,sn:true})):setError(prevState=>({...prevState,sn:true}))
    //     Object.entries(error).map(val=>{
    //         if(!val) return val;
    //     })
    //     return true;
    // }

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
                            required
                            autoFocus
                            error={!error.sn}
                            value={schoolInfo.schoolName10}
                            helperText={!error.sn ? 'Required' : ''}
                            error={error.sn}
                            onChange={(event) => {
                                validate();
                                onChangeSchoolData({
                                    schoolName10: event.target.value,
                                });
                            }}
                        />
                        <FormControl component='fieldset'>
                            <FormLabel component='legend'></FormLabel>
                            <RadioGroup
                                name='gender'
                                row
                                value={markType}
                                // value={formik.values.gender}
                                onChange={(event) =>
                                    setMarkType(event.target.value)
                                }
                                // onChange={formik.handleChange}
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
                        </FormControl>
                        <TextField
                            className={classes.textField}
                            label={markType === 'C' ? 'CGPA' : 'Percentage'}
                            variant='outlined'
                            type='number'
                            error={error.cg}
                            helperText={error.cg ? 'Required' : ''}
                            onChange={(event) => {
                                onChangeSchoolData({
                                    cgpa10: event.target.value,
                                });
                            }}
                            value={schoolInfo.cgpa10}
                        />
                        <TextField
                            className={classes.textField}
                            error={error.board}
                            helperText={error.board ? 'Required' : ''}
                            label='Board'
                            variant='outlined'
                            required
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
                            error={error.location}
                            helperText={error.location ? 'Required' : ''}
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
                            error={error.sn1}
                            helperText={error.sn1 ? 'Required' : ''}
                            onChange={(event) => {
                                onChangeSchoolData({
                                    schoolName12: event.target.value,
                                });
                            }}
                            value={schoolInfo.schoolName12}
                        />
                        <FormControl
                            component='fieldset'
                            // error={
                            //     !!formik.errors.gender && formik.touched.gender
                            // }
                        >
                            <FormLabel component='legend'></FormLabel>
                            <RadioGroup
                                name='gender'
                                row
                                value={markType2}
                                // value={formik.values.gender}
                                onChange={(event) =>
                                    setMarkType2(event.target.value)
                                }
                                // onChange={formik.handleChange}
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
                        </FormControl>
                        <TextField
                            className={classes.textField}
                            label={markType2 === 'C' ? 'CGPA' : 'Percentage'}
                            error={error.cg1}
                            helperText={error.cg1 ? 'Required' : ''}
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
                            error={error.board1}
                            helperText={error.board1 ? 'Required' : ''}
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
                            error={error.location1}
                            helperText={error.location1 ? 'Required' : ''}
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
                <MYButton
                    heading={'Add more degree'}
                    style={styles.btn}
                    onPress={() => addMoreDegreeButton()}
                />
                <MYButton
                    heading={'Remove last degree'}
                    style={styles.btn}
                    onPress={() => removeLastDegree()}
                />
            </div>
            <div className={styles.btnDiv}>
                <Button onClick={handlePrev}>Previous</Button>
                <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={() => {
                        if (validate()) handleNext();
                    }}
                >
                    Continue
                </Button>
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
    console.log(state);
    return {
        schoolInfo: state.userProfile.academics,
        degreeDetails: state.userProfile.degree,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThirdRoute);
