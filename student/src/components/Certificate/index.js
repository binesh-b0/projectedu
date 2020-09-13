import React, { useState, useRef, useEffect } from 'react';
import {
    TextField,
    makeStyles,
    Avatar,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@material-ui/core';
import styles from './certificate.module.css';
import { connect } from 'react-redux';
import {
    addCertificateDetails,
    addCertificatePicture,
} from '../../actions/userActions';

const Certificate = ({
    expanded,
    onChange,
    id,
    addCertificateDetails,
    certificateDetails,
}) => {
    const [picture, setPicture] = useState(
        require('../../assets/images/uploadimg.svg')
    );

    const [details, setDetails] = useState({});

    useEffect(() => {
        if (certificateDetails.id) {
            setDetails({ ...certificateDetails.id });
        }
    }, [certificateDetails.id]);

    const useStyles = makeStyles({
        textField: {
            marginTop: 16,
        },
        imgStyle: {
            backgroundColor: '#EFECE8',
            color: '#2262c6',
        },
    });

    const selectImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (data) => {
            setPicture(data.target.result);
            addCertificatePicture(data);
        });
        reader.readAsDataURL(file);
    };

    const inputFile = useRef(null);
    const styleObj = useStyles();

    const addDataToStore = (data) => {
        addCertificateDetails({ id: id, ...data });
    };

    return (
        <Accordion>
            <AccordionSummary>
                <p>Enter Certificate Details</p>
            </AccordionSummary>
            <AccordionDetails>
                <div className={styles.container}>
                    <form className={styles.textContainer}>
                        <TextField
                            className={styleObj.textField}
                            label='Certificate Name'
                            variant='outlined'
                            value={certificateDetails.certificationName}
                            onChange={(event) =>
                                addDataToStore({
                                    certificationName: event.target.value,
                                })
                            }
                        />
                        <TextField
                            className={styleObj.textField}
                            label='Course Completed Date'
                            type='date'
                            defaultValue='2000-01-01'
                            value={certificateDetails.completionDate}
                            onChange={(event) =>
                                addDataToStore({
                                    completionDate: event.target.value,
                                })
                            }
                            variant='outlined'
                        />
                        <TextField
                            className={styleObj.textField}
                            label='Validity'
                            type='date'
                            defaultValue='2000-01-01'
                            value={certificateDetails.validityDate}
                            onChange={(event) =>
                                addDataToStore({
                                    validityData: event.target.value,
                                })
                            }
                            variant='outlined'
                        />
                        <TextField
                            className={styleObj.textField}
                            label='Issuing Authority'
                            value={certificateDetails.institute}
                            onChange={(event) =>
                                addDataToStore({
                                    institute: event.target.value,
                                })
                            }
                            variant='outlined'
                        />
                    </form>
                    <img
                        className={styles.img}
                        src={picture}
                        onClick={() => inputFile.current.click()}
                        alt='upload certificate'
                    />
                    <input
                        type='file'
                        id='file'
                        accept='image/*'
                        ref={inputFile}
                        onChange={selectImage}
                        style={{ display: 'none' }}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCertificateDetails: (data) => dispatch(addCertificateDetails(data)),
        addCertificatePicture: (data) => dispatch(addCertificatePicture(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        certificateDetails: state.userProfile.certifications,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Certificate);
