import React, { useState, useRef } from 'react';
import styles from './style.module.css';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Certificate from '../../../components/Certificate';
import Button from '../../../components/CTAButton';

const FourthRoute = () => {
    // const [certificationName, setcertificationName] = useState('');
    // const [completionDate, setcompletionDate] = useState('2000-12-10');
    // const [validityDate, setvalidityDate] = useState('2000-12-10');
    // const [institute, setinstitute] = useState('');
    // const [picture, setPicture] = useState(
    //     require('../../../assets/images/uploadimg.svg')
    // );

    const [certificates, setCertificateds] = useState([{ id: 1 }, { id: 2 }]);
    const [expanded, setExpanded] = useState(false);
    // const inputFile = useRef(null);

    // const useStyles = makeStyles({
    //     textField: {
    //         marginTop: 16,
    //     },
    //     imgStyle: {
    //         backgroundColor: '#EFECE8',
    //         color: '#2262c6',
    //     },
    // });
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        console.log(expanded);
    };

    const addMoreCertificates = () => {
        const len = certificates.length + 1;
        setCertificateds([...certificates, { id: len }]);
    };
    // const selectImage = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.addEventListener('load', (data) => {
    //         setPicture(data.target.result);
    //     });
    //     reader.readAsDataURL(file);
    // };

    // const styleObj = useStyles();

    return (
        <div className={styles.container}>
            {certificates.map((certificate) => {
                return (
                    <Certificate
                        expanded={expanded}
                        id={certificate.id}
                        onChange={(id) => handleChange(id)}
                    />
                );
            })}
            <Button
                heading='Add more'
                style={styles.btn}
                onPress={() => addMoreCertificates()}
            />
            {/* <form className={styles.textContainer}>
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
                    type='date'
                    value={completionDate}
                    onChange={(event) => setcompletionDate(event.target.value)}
                    variant='outlined'
                />
                <TextField
                    className={styleObj.textField}
                    label='Validity'
                    type='date'
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
                <Button style={styles.btn} heading='Add more' />
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
            /> */}
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
