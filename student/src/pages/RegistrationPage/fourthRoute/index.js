import React from 'react';
import styles from './style.module.css';
import { TextField, makeStyles, Avatar } from '@material-ui/core';

const FourthRoute = () => {
    const useStyles = makeStyles({
        textField: {
            marginTop: 16,
        },
        imgStyle: {
            backgroundColor: '#EFECE8',
            color: '#2262c6',
        },
    });

    const styleObj = useStyles();

    return (
        <div className={styles.container}>
            <form className={styles.textContainer}>
                <TextField
                    className={styleObj.textField}
                    label='Certificate Name'
                    variant='outlined'
                />
                <TextField
                    className={styleObj.textField}
                    label='Course Completed Date'
                    variant='outlined'
                />
                <TextField
                    className={styleObj.textField}
                    label='Validity'
                    variant='outlined'
                />
                <TextField
                    className={styleObj.textField}
                    label='Issuing Authority'
                    variant='outlined'
                />
            </form>
            <img
                className={styles.img}
                src={require('../../../assets/images/uploadimg.svg')}
                alt='upload certificate'
            />
        </div>
    );
};

export default FourthRoute;
