import React, { useState } from 'react';
import styles from './style.module.css';
import { TextField, makeStyles, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { changeProfileSchoolInfo } from '../../../actions/userActions';

const FourthRoute = () => {
    const [certificationName, setcertificationName] = useState('');
    const [completionDate, setcompletionDate] = useState('');
    const [validityDate, setvalidityDate] = useState('');
    const [institute, setinstitute] = useState('');

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
                    value={certificationName}
                    onChange={(event) =>
                        setcertificationName(event.target.value)
                    }
                />
                <TextField
                    className={styleObj.textField}
                    label='Course Completed Date'
                    value={completionDate}
                    onChange={(event) => setcompletionDate(event.target.value)}
                    variant='outlined'
                />
                <TextField
                    className={styleObj.textField}
                    label='Validity'
                    value={validityDate}
                    onChange={(event) => setvalidityDate(event.target.value)}
                    variant='outlined'
                />
                <TextField
                    className={styleObj.textField}
                    label='Issuing Authority'
                    value={institute}
                    onChange={(event) => setinstitute(event.target.value)}
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

const mapDispatchToProps = (disptch) => {
    return {
        onChange: (data) => {
            disptch();
        },
    };
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FourthRoute);
