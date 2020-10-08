/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Certificate from '../../../components/Certificate';
import MYButton from '../../../components/CTAButton';
import Button from '@material-ui/core/Button';
import { removeCertificateDetail } from '../../../actions/userActions';

const FourthRoute = ({
    handlePrev,
    handleSubmit,
    certificateDetails,
    removeCertificateDetail,
}) => {
    const [certificates, setCertificates] = useState([{ id: 1 }]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const ids = Object.keys(certificateDetails);
        console.log(ids);
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] == 1) continue;
            else setCertificates([...certificates, { id: ids[i] }]);
        }
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(expanded);
    };

    const addMoreCertificates = () => {
        const len = certificates.length + 1;
        setCertificates([...certificates, { id: len }]);
    };

    const removeCertificate = () => {
        setCertificates(certificates.slice(0, -1));
        removeCertificateDetail(certificates.pop().id);
    };

    return (
        <div className={styles.container}>
            <p className={styles.notmandatorytext}>*Not mandatory</p>
            {certificates.map((certificate) => {
                return (
                    <Certificate
                        expanded={expanded}
                        id={certificate.id}
                        onChange={(id) => handleChange(id)}
                    />
                );
            })}
            <div className={styles.btnDiv}>
                <MYButton
                    heading='Add more certificates'
                    style={styles.btn}
                    onPress={() => addMoreCertificates()}
                />
                <MYButton
                    heading='Remove last certificate'
                    style={styles.btn}
                    onPress={() => removeCertificate()}
                />
            </div>
            <div className={styles.btnDiv}>
                <Button onClick={handlePrev}>Previous</Button>
                <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (disptch) => {
    return {
        onChange: (data) => {
            disptch();
        },
        removeCertificateDetail: (data) =>
            disptch(removeCertificateDetail(data)),
    };
};

const mapStateToProps = (state) => {
    console.log(state.userProfile);
    return {
        certificateDetails: state.userProfile.certifications,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FourthRoute);
