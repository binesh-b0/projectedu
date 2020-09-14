/* eslint-disable react-hooks/exhaustive-deps */
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
    removeCertificateDetail,
} from '../../actions/userActions';

const Certificate = ({
    expanded,
    onChange,
    id,
    addCertificateDetails,
    addCertificatePicture,
    certificateDetails,
}) => {
    const [picture, setPicture] = useState(
        require('../../assets/images/uploadimg.svg')
    );

    const [details, setDetails] = useState({});
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        if (certificateDetails.id) {
            setDetails({ ...certificateDetails.id });
        }
    }, [certificateDetails.id]);

    useEffect(() => {
        setDetails({ ...certificateDetails[id] });
    }, []);

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
            addCertificatePicture(file);
            setPicture(data.target.result);
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
                {/* <div className={styles.container}> */}
                <form className={styles.textContainer}>
                    <TextField
                        className={styleObj.textField}
                        label='Certificate Name'
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                        value={details ? details.certificationName : ''}
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
                        InputLabelProps={{ shrink: true }}
                        value={details ? details.completionDate : ''}
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
                        InputLabelProps={{ shrink: true }}
                        value={details ? details.validityDate : ''}
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
                        value={details ? details.institute : ''}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event) =>
                            addDataToStore({
                                institute: event.target.value,
                            })
                        }
                        variant='outlined'
                    />
                    <input
                        type='file'
                        id='file'
                        accept='image/*'
                        ref={inputFile}
                        onChange={selectImage}
                        style={{ marginTop: 16 }}
                    />
                </form>
                {/* <img
                        className={styles.img}
                        src={picture}
                        onClick={() => inputFile.current.click()}
                        alt='upload certificate'
                    /> */}
                {/* </div> */}
            </AccordionDetails>
        </Accordion>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCertificateDetails: (data) => dispatch(addCertificateDetails(data)),
        addCertificatePicture: (data) => dispatch(addCertificatePicture(data)),
        removeCertificateDetail: (data) =>
            dispatch(removeCertificateDetail(data)),
    };
};

const mapStateToProps = (state) => {
    console.log(state.userProfile.certifications);
    return {
        certificateDetails: state.userProfile.certifications,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Certificate);
