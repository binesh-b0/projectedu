import React, { useState } from 'react';
import styles from './style.module.css';
import Button from '../../components/CTAButton';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import First from './firstRoute';
import Second from './secondRoute';
import Snackbar from '@material-ui/core/Snackbar';
import Third from './thirdRoute';
import Fourth from './fourthRoute';
import MuiAlert from '@material-ui/lab/Alert';
import { submitUserData } from '../../actions/userActions';

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Registration = ({ submitData, userProfile }) => {
    const [snk, setSnk] = useState('');
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(3);
    const [nextButtonText, setNextButtonText] = useState('Continue');
    const steps = [
        'Personal Information',
        'Contact Details',
        'Educational Information',
        'Certifications',
    ];

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleSubmit = () => {
        submitData();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnk('');
        setOpen(false);
    };

    const showSnackbar = () => {
        return (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={'error'}>
                    {snk}
                </Alert>
            </Snackbar>
        );
    };

    const handleNext = () => {
        if (activeStep >= 0) {
            setActiveStep(activeStep + 1);
        }
    };

    const checkIfDataIsNull = () => {
        const {
            userInfo,
            profilePic,
            addressInfo,
            academics,
            degree,
            certifications,
            certificationPic,
        } = userProfile;
        const {
            fullName,
            gender,
            dob,
            guardianName,
            relationToGuardian,
        } = userInfo;

        const { residence, permanent } = addressInfo;

        const {
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            phoneNo,
        } = residence;

        const {
            schoolName10,
            cgpa10,
            board10,
            location10,
            schoolName12,
            cgpa12,
            board12,
            location12,
        } = academics;

        if (
            fullName === '' &&
            guardianName === '' &&
            relationToGuardian === '' &&
            profilePic === ''
        ) {
            return 'Personal information';
        }
        if (
            !permanent.addressLine1 &&
            !permanent.addressLine2 &&
            !permanent.city &&
            !permanent.state &&
            !permanent.zipcode &&
            !permanent.phoneNo
        ) {
            return 'Contact Details';
        }
        if (
            !addressLine1 &&
            !addressLine2 &&
            !city &&
            !state &&
            !zipcode &&
            !phoneNo
        )
            return 'Contact Details';

        if (
            !schoolName10 &&
            !cgpa10 &&
            !board10 &&
            !location10 &&
            !schoolName12 &&
            !cgpa12 &&
            !board12 &&
            !location12
        )
            return 'Education Information';

        return false;
    };

    return (
        <div className={styles.container}>
            {showSnackbar()}
            <h2 className={styles.heading}>HSST Portal</h2>
            <div className={styles.subContainer}>
                <div className={styles.firstDiv}>
                    <h4 className={styles.firstDivText}>
                        Complete your profile to access your dashboard
                    </h4>
                </div>
                <div className={styles.secondDiv}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label} </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 ? (
                        <First
                            handleNext={() => handleNext()}
                            handlePrev={() => handlePrev()}
                        />
                    ) : activeStep === 1 ? (
                        <Second
                            handleNext={() => handleNext()}
                            handlePrev={() => handlePrev()}
                        />
                    ) : activeStep === 2 ? (
                        <Third
                            handleNext={() => handleNext()}
                            handlePrev={() => handlePrev()}
                        />
                    ) : (
                        <Fourth
                            handlePrev={() => handlePrev()}
                            handleSubmit={() => handleSubmit()}
                        />
                    )}
                    {/* <div> */}
                    {/* <div className={styles.buttonDiv}>
                        {activeStep !== 0 ? (
                            <Button heading='Previous' onPress={handlePrev} />
                        ) : null}
                        <Button
                            heading={nextButtonText}
                            onPress={handleNext}
                            style={styles.btn}
                        />
                    </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitData: () => dispatch(submitUserData()),
    };
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
