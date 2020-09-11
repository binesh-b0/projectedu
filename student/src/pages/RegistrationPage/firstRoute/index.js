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
import Button from '../../../components/CTAButton';

const FirstRoute = ({ userInfo }) => {
    const [gender, setGender] = useState('male');

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });

    const classes = useStyles();

    return (
        <div className={styles.container}>
            <form className={styles.formStyle}>
                <img
                    className={styles.img}
                    src={require('../../../assets/images/user.svg')}
                    alt='Upload imgage'
                />
                <Button heading='Upload' style={styles.btn} />
                <TextField
                    className={classes.textField}
                    label='Full Name'
                    variant='outlined'
                />
                <RadioGroup
                    value={gender}
                    className={styles.textField}
                    row
                    onChange={(event) => setGender(event.target.value)}
                >
                    <FormControlLabel
                        value='male'
                        label='Male'
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value='female'
                        label='Female'
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value='others'
                        label='Other'
                        control={<Radio />}
                    />
                </RadioGroup>

                <TextField
                    className={classes.textField}
                    label='Full Name'
                    value={userInfo.fullName}
                    variant='outlined'
                />
                <TextField
                    className={classes.textField}
                    label="Father's Name"
                    variant='outlined'
                />
            </form>
        </div>
    );
};

export default FirstRoute;
