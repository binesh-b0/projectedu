import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import styles from './style.module.css';

const FirstRoute = () => {
    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });
    const classes = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.subDiv}>
                <p className={styles.subDivHeading}>Permanent Address</p>
                <form className={styles.firstForm}>
                    <TextField
                        className={classes.textField}
                        label='Addressline 1'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='Addressline 2'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='City/Town'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='State'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='Zip-Code'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='Phone Number'
                        variant='outlined'
                    />
                </form>
            </div>
            <div className={styles.subDiv}>
                <p className={styles.subDivHeading}>Residential Address</p>
                <form className={styles.secondForm}>
                    <TextField
                        className={classes.textField}
                        label='Addressline 1'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='Addressline 2'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='City/Town'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='State'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='Zip-Code'
                        variant='outlined'
                    />
                    <TextField
                        className={classes.textField}
                        label='Phone Number'
                        variant='outlined'
                    />
                </form>
            </div>
        </div>
    );
};

export default FirstRoute;
