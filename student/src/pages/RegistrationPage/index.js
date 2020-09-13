import React, { useState } from 'react';
import styles from './style.module.css';
import Button from '../../components/CTAButton';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import First from './firstRoute';
import Second from './secondRoute';
import Third from './thirdRoute';
import Fourth from './fourthRoute';
import { submitUserData } from '../../actions/userActions';

const Registration = ({ submitData }) => {
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
            setNextButtonText('Continue');
        }
    };
    const handleNext = () => {
        if (activeStep >= 0) {
            setActiveStep(activeStep + 1);
        }
        if (activeStep >= 2) {
            setNextButtonText('Submit');
        }
        if (activeStep === 3) {
            console.log('Finished');
            submitData();
        }
    };

    return (
        <div className={styles.container}>
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
                        <First />
                    ) : activeStep === 1 ? (
                        <Second />
                    ) : activeStep === 2 ? (
                        <Third />
                    ) : (
                        <Fourth />
                    )}
                    <div>
                        <div className={styles.buttonDiv}>
                            {activeStep !== 0 ? (
                                <Button
                                    heading='Previous'
                                    onPress={handlePrev}
                                />
                            ) : null}
                            <Button
                                heading={nextButtonText}
                                onPress={handleNext}
                                style={styles.btn}
                            />
                        </div>
                    </div>
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

export default connect(
    null,
    mapDispatchToProps
)(Registration);
