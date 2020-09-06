import React, { useState } from 'react';
import {
    TextField,
    Radio,
    RadioGroup,
    makeStyles,
    FormControlLabel,
} from '@material-ui/core';
import styles from './style.module.css';
import Button from '../../../components/CTAButton';

const FirstRoute = () => {
    const [gender, setGender] = useState('male');

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });

    const classes = useStyles();

    return (
        <div className={styles.container}>
            <form className={styles.formStyle}>
                <img className={styles.img} />
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
