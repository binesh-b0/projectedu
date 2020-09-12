import React, { useState } from 'react';
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

const FirstRoute = ({ userProfile, changeProfileRegInfo }) => {
    const { fullName, gender, dob, guardianName } = userProfile;

    // const [gender, setGender] = useState('male');

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });

    const [picture, setPicture] = useState();

    const onDrop = (picture) => {
        console.log(picture);
        setPicture(picture);
    };

    const classes = useStyles();

    return (
        <div className={styles.container}>
            <form className={styles.formStyle}>
                <img
                    className={styles.img}
                    src={require('../../../assets/images/user.svg')}
                    alt='Upload imgage'
                />
                <ImageUploader
                    withIcon={false}
                    onChange={onDrop}
                    withLabel={false}
                    imgExtension={['.jpg', '.png']}
                    singleImage={true}
                ></ImageUploader>

                {/* <img
                    className={styles.img}
                    src={require('../../../assets/images/user.svg')}
                    alt='Upload imgage'
                /> */}
                {/* <Button heading='Upload' style={styles.btn} /> */}
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
                    label='DOB'
                    variant='outlined'
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
        userProfile: state.userProfile,
    };
};

export default connect(
    mapStateToProp,
    { changeProfileRegInfo }
)(FirstRoute);
