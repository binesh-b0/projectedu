import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    MenuItem,
    InputLabel,
    makeStyles,
    Select,
    Grid, Card, CardContent, Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdTextField from '../AdTextField';
import api from '../../api/api';
import { getCredentials } from '../../services/authService';
import SnackBar from '../SnackBar';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        display: 'flex',
        flex: 1
    },
    form: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    heading: {
        fontSize: 14,
        fontWeight: 600
    },
    buttonZoneContainer: {
        marginTop: 18
    },
    dropdown: {
        marginTop: 24
    },
    img: {
        display: 'flex',
        flex: 1,
        width: '100%',
        maxHeight: 350
    },
    button: {
        marginLeft: 16
    }
}));

const AddPhotoAdComponent = () => {

    const styleClasses = useStyles();
    const [adZone, setAdZone] = useState('adZone1');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMesssage] = useState('');
    const [severity, setSeverity] = useState('');
    const [picture, setPicture] = useState(
        require('../../assets/images/uploadimg.svg')
    );

    const { selected } = useSelector((state) => state.selectedStudents);

    const formik = useFormik({
        initialValues: {
            adName: '',
            adZone: 'adZone3'
        },
        validationSchema: Yup.object({
            adName: Yup.string().required('This field is required'),
            adZone: Yup.string().required('This field is required')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const formRef = useRef(null);
    const inputFile = useRef(null);

    const selectImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (data) => {
            // addCertificatePicture(file);
            setPicture(data.target.result);
        });
        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        console.log("ENTERED RESET");
        formik.resetForm();
        formRef.current.reset();
    };

    return (
        <div className={styleClasses.container}>
            <form ref={formRef} noValidate className={styleClasses.form} onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid
                                direction="column"
                                item
                                xs
                            
                            >
                                <AdTextField
                                    error={!!formik.errors.adName && formik.touched.adName}
                                    helperText={
                                        !!formik.errors.adName && formik.touched.adName
                                            ? formik.errors.adName
                                            : ''
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.adName}
                                    name='adName'
                                    label='Ad Name'
                                />
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    className={styleClasses.dropdown}
                                >
                                    <Select

                                        labelId='demo-simple-select-label'
                                        id='adZone'
                                        variant='outlined'
                                        size="small"
                                        value={adZone}
                                        onChange={(event) => setAdZone(event.target.value)}
                                    >
                                        <MenuItem value='adZone1'>Ad Zone 1</MenuItem>
                                        <MenuItem value='adZone2'>Ad Zone 2</MenuItem>
                                    </Select>
                                    <div>
                                        <Button
                                            className={styleClasses.button}
                                            variant='contained'
                                            color='primary'
                                            onClick={() => inputFile.current.click()}
                                        >
                                            Upload
                                    </Button>
                                    </div>
                                </Grid>
                                <input
                                    type='file'
                                    id='file'
                                    accept='image/*'
                                    ref={inputFile}
                                    onChange={selectImage}
                                    style={{ marginTop: 16, display: 'none' }}
                                />

                            </Grid>
                            <Grid item xs>
                                <img
                                    className={styleClasses.img}
                                    src={picture}
                                    onClick={() => inputFile.current.click()}
                                    alt='upload certificate'
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </div >
    );
}

export default AddPhotoAdComponent;