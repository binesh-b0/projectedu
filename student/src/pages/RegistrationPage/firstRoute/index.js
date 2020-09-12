import React, { useState, useRef } from 'react';
import {
    TextField,
    Radio,
    RadioGroup,
    makeStyles,
    FormControlLabel,
} from '@material-ui/core';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { changeProfileRegInfo } from '../../../actions/userActions';
import Button from '../../../components/CTAButton';
import ImageUploader from 'react-images-upload';
import { findByLabelText } from '@testing-library/react';

const FirstRoute = ({ userProfile, changeProfileRegInfo }) => {
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
        });
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.container}>
            <form className={styles.formStyle}>
                <img
                    onClick={() => inputFile.current.click()}
                    className={styles.img}
                    src={picture}
                    alt='Upload imgage'
                />
                <input
                    type='file'
                    ref={inputFile}
                    accept='image/*'
                    className={styles.hideImg}
                    onChange={onDrop}
                />

                <TextField
                    className={classes.textField}
                    label='Full Name'
                    variant='outlined'
                    onChange={(event) => {
                        changeProfileRegInfo({ fullName: event.target.value });
                    }}
                    value={fullName}
                />
                <RadioGroup
                    value={gender}
                    className={styles.textField}
                    row
                    onChange={(event) =>
                        changeProfileRegInfo({ gender: event.target.value })
                    }
                >
                    <FormControlLabel
                        value='M'
                        label='Male'
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value='F'
                        label='Female'
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value='O'
                        label='Other'
                        control={<Radio />}
                    />
                </RadioGroup>

                <TextField
                    className={classes.textField}
                    label='Date Of Birth'
                    type='date'
                    variant='outlined'
                    value={dob}
                    onChange={(event) => {
                        changeProfileRegInfo({
                            dob: event.target.value,
                        });
                    }}
                />
                <TextField
                    className={classes.textField}
                    label="Father's Name"
                    variant='outlined'
                    onChange={(event) => {
                        changeProfileRegInfo({
                            guardianName: event.target.value,
                        });
                    }}
                    value={guardianName}
                />
            </form>
        </div>
    );
};

const mapStateToProp = (state) => {
    console.log(state);
    return {
        userProfile: state.userProfile.userInfo,
    };
};

export default connect(
    mapStateToProp,
    { changeProfileRegInfo }
)(FirstRoute);
