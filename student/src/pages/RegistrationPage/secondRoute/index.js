import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import styles from './style.module.css';
import { connect } from 'react-redux';
import {
    changeProfileRegAddressInfo,
    changeProfileRegInfo,
} from '../../../actions/userActions';

const SecondRoute = ({ addressInfo, onChangeData }) => {
    const { res, perm } = addressInfo;

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
                        value={perm.addressLine1}
                        onChange={(event) => {
                            onChangeData('perm', {
                                addressLine1: event.target.value,
                            });
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        label='Addressline 2'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('perm', {
                                addressLine2: event.target.value,
                            });
                        }}
                        value={perm.addressLine2}
                    />
                    <TextField
                        className={classes.textField}
                        label='City/Town'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('perm', {
                                city: event.target.value,
                            });
                        }}
                        value={perm.city}
                    />
                    <TextField
                        className={classes.textField}
                        label='State'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('perm', {
                                state: event.target.value,
                            });
                        }}
                        value={perm.state}
                    />
                    <TextField
                        className={classes.textField}
                        label='Zip-Code'
                        type='number'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('perm', {
                                zipcode: event.target.value,
                            });
                        }}
                        value={perm.zipcode}
                    />
                    <TextField
                        className={classes.textField}
                        label='Phone Number'
                        variant='outlined'
                        type='tel'
                        onChange={(event) => {
                            onChangeData('perm', {
                                phoneNo: event.target.value,
                            });
                        }}
                        value={perm.phoneNo}
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
                        onChange={(event) => {
                            onChangeData('res', {
                                addressLine1: event.target.value,
                            });
                        }}
                        value={res.addressLine1}
                    />
                    <TextField
                        className={classes.textField}
                        label='Addressline 2'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('res', {
                                addressLine2: event.target.value,
                            });
                        }}
                        value={res.addressLine2}
                    />
                    <TextField
                        className={classes.textField}
                        label='City/Town'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('res', {
                                city: event.target.value,
                            });
                        }}
                        value={res.town}
                    />
                    <TextField
                        className={classes.textField}
                        label='State'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('res', {
                                state: event.target.value,
                            });
                        }}
                        value={res.state}
                    />
                    <TextField
                        className={classes.textField}
                        label='Zip-Code'
                        variant='outlined'
                        type='number'
                        onChange={(event) => {
                            onChangeData('res', {
                                zipcode: event.target.value,
                            });
                        }}
                        value={res.zipcode}
                    />
                    <TextField
                        className={classes.textField}
                        label='Phone Number'
                        type='tel'
                        variant='outlined'
                        onChange={(event) => {
                            onChangeData('res', {
                                phoneNo: event.target.value,
                            });
                        }}
                        value={res.phoneNo}
                    />
                </form>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeData: (typ, data) => {
            dispatch(changeProfileRegAddressInfo(typ, data));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        addressInfo: state.userProfile.addressInfo,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SecondRoute);
