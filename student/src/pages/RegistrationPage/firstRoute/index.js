import React, { useState, useRef, useEffect } from 'react';
import {
    TextField,
    Radio,
    RadioGroup,
    makeStyles,
    FormControlLabel,
} from '@material-ui/core';
import styles from './style.module.css';
import { connect } from 'react-redux';
import {
    changeProfileRegInfo,
    changeProfilePicture,
} from '../../../actions/userActions';

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import ImageUploader from 'react-images-upload';
import { findByLabelText } from '@testing-library/react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const FirstRoute = ({
    userProfile,
    changeProfileRegInfo,
    handleNext,
    handlePrev,
    profilePic,
    changeProfilePicture,
}) => {
    const { fullName, gender, dob, guardianName } = userProfile;

    const inputFile = useRef(null);

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
        btnStyle: {
            backgroundColor: 'rgb(39, 101, 195)',
            borderRadius: 10,
            borderWidth: 0,
            color: 'white',
            paddingRight: 32,
            paddingLeft: 32,
            paddingTop: 4,
            paddingBottom: 4,
        },
    });

    const [picture, setPicture] = useState(
        require('../../../assets/images/user.svg')
    );
    const classes = useStyles();

    const onDrop = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (data) => {
            console.log(data);
            setPicture(data.target.result);
            // changeProfilePicture(data.target.result);
            changeProfilePicture(file);
        });
        reader.readAsDataURL(file);
    };
    const formik = useFormik({
        initialValues: {
            fullName: '',
            guardianName: '',
            gender: '',
            profileP: null,
            relationToGuardian: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            guardianName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            gender: Yup.string().required('Select a gender'),
            dob: Yup.date().required('Enter date of birth'),
            profileP: Yup.mixed().required('Upload a profile picture'),
            relationToGuardian: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            changeProfileRegInfo({
                fullName: values.fullName,
                gender: values.gender,
                dob: values.dob,
                guardianName: values.guardianName,
                relationToGuardian: values.relationToGuardian,
            });
            handleNext();
        },
    });

    return (
        <div className={styles.container}>
            <form className={styles.formStyle} onSubmit={formik.handleSubmit}>
                <FormControl
                    component='fieldset'
                    error={!!formik.errors.gender}
                >
                    <img
                        onClick={() => inputFile.current.click()}
                        className={styles.img}
                        src={picture}
                        alt='Upload'
                        name=''
                    />

                    <input
                        type='file'
                        ref={inputFile}
                        accept='image/*'
                        className={styles.hideImg}
                        onChange={(event) => {
                            formik.setFieldValue(
                                'profileP',
                                event.currentTarget.files[0]
                            );
                            onDrop(event);
                        }}
                    />
                    <FormHelperText style={{ marginTop: '-2px' }}>
                        {formik.errors.profileP}
                    </FormHelperText>
                </FormControl>

                <TextField
                    className={classes.textField}
                    label='Full Name'
                    variant='outlined'
                    name='fullName'
                    autoFocus
                    error={!!formik.errors.fullName && formik.touched.fullName}
                    helperText={
                        !!formik.errors.fullName && formik.touched.fullName
                            ? formik.errors.fullName
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
                <FormControl
                    component='fieldset'
                    error={!!formik.errors.gender && formik.touched.gender}
                >
                    <RadioGroup
                        name='gender'
                        row
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    >
                        <FormControlLabel
                            value='F'
                            label='Female'
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value='M'
                            label='Male'
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value='O'
                            label='Other'
                            control={<Radio />}
                        />
                    </RadioGroup>
                    <FormHelperText style={{ marginTop: '-2px' }}>
                        {!!formik.errors.gender && formik.touched.gender
                            ? formik.errors.gender
                            : false}
                    </FormHelperText>
                </FormControl>

                <TextField
                    className={classes.textField}
                    label='Date Of Birth'
                    type='date'
                    variant='outlined'
                    name='dob'
                    error={!!formik.errors.dob && formik.touched.dob}
                    helperText={
                        !!formik.errors.dob && formik.touched.dob
                            ? formik.errors.dob
                            : ''
                    }
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.dob}
                    onChange={(event) => {
                        console.log('event', event.target.value);
                        formik.setFieldValue('dob', event.target.value);
                    }}
                />
                <TextField
                    className={classes.textField}
                    label="Guardian's Name"
                    variant='outlined'
                    name='guardianName'
                    error={
                        !!formik.errors.guardianName &&
                        formik.touched.guardianName
                    }
                    helperText={
                        !!formik.errors.guardianName &&
                        formik.touched.guardianName
                            ? formik.errors.guardianName
                            : ''
                    }
                    value={formik.values.guardianName}
                    onChange={formik.handleChange}
                />
                <TextField
                    className={classes.textField}
                    label='Relationship to guardian'
                    variant='outlined'
                    name='relationToGuardian'
                    error={
                        !!formik.errors.relationToGuardian &&
                        formik.touched.relationToGuardian
                    }
                    helperText={
                        !!formik.errors.relationToGuardian &&
                        formik.touched.relationToGuardian
                            ? formik.errors.relationToGuardian
                            : ''
                    }
                    value={formik.values.relationToGuardian}
                    onChange={formik.handleChange}
                />

                <Button
                    className={styles.btn}
                    variant='contained'
                    color='primary'
                    disableElevation
                    type='submit'
                >
                    Continue
                </Button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeProfilePicture: (data) => dispatch(changeProfilePicture(data)),
        changeProfileRegInfo: (data) => dispatch(changeProfileRegInfo(data)),
    };
};

const mapStateToProp = (state) => {
    console.log(state);
    return {
        userProfile: state.userProfile.userInfo,
        profilePic: state.userProfile.profilePic,
    };
};

export default connect(
    mapStateToProp,
    mapDispatchToProps
)(FirstRoute);
