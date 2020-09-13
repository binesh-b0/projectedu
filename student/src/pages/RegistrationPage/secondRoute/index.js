import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { string } from 'yup';
import {
    changeProfileRegAddressInfo,
    changeProfileRegInfo,
} from '../../../actions/userActions';
import Button from '../../../components/CTAButton';

const SecondRoute = ({ addressInfo, onChangeData, handleNext, handlePrev }) => {
    const { residence, permanent } = addressInfo;

    const useStyles = makeStyles({
        textField: { marginTop: 16 },
    });
    const classes = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.formDiv}>
                <div className={styles.subDiv}>
                    <p className={styles.subDivHeading}>Permanent Address</p>
                    <form className={styles.firstForm}>
                        <TextField
                            className={classes.textField}
                            label='Addressline 1'
                            variant='outlined'
                            value={permanent.addressLine1}
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
                            value={permanent.addressLine2}
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
                            value={permanent.city}
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
                            value={permanent.state}
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
                            value={permanent.zipcode}
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
                            value={permanent.phoneNo}
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
                            value={residence.addressLine1}
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
                            value={residence.addressLine2}
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
                            value={residence.town}
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
                            value={residence.state}
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
                            value={residence.zipcode}
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
                            value={residence.phoneNo}
                        />
                    </form>
                </div>
            </div>
            <div className={styles.btnDiv}>
                <Button heading='Previous' onPress={handlePrev} />
                <Button heading='Continue' onPress={handleNext} />
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
