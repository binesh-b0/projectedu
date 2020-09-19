import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './AddUser.module.css';
import {
    TextField,
    Button,
    MenuItem,
    InputLabel,
    makeStyles,
    Select,
} from '@material-ui/core';

const AddUser = () => {
    const useStyle = makeStyles({
        textField: {
            marginTop: 16,
        },
    });

    const styleClasses = useStyle();

    const formik = useFormik({
        initialValues: {
            email: '',
            organization: '',
            password: '',
            confirmpassword: '',
            role: 'admin',
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .required(
                    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
                )
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
                ),
            confirmpassword: Yup.string()
                .required('This field is required')
                .oneOf([Yup.ref('password'), null], 'Password mismatch'),
            email: Yup.string()
                .required('Enter valid email')
                .email('Enter valid email'),
            organization: Yup.string().required('This field is required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <TextField
                    label='Email'
                    variant='outlined'
                    name='email'
                    className={styleClasses.textField}
                    autoFocus
                    error={!!formik.errors.email && formik.touched.email}
                    helperText={
                        !!formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <TextField
                    label='Name/Organization name'
                    variant='outlined'
                    name='organization'
                    autoFocus
                    className={styleClasses.textField}
                    error={
                        !!formik.errors.organization &&
                        formik.touched.organization
                    }
                    helperText={
                        !!formik.errors.organization &&
                        formik.touched.organization
                            ? formik.errors.organization
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.organization}
                />
                <TextField
                    label='Password'
                    variant='outlined'
                    name='password'
                    className={styleClasses.textField}
                    autoFocus
                    error={!!formik.errors.password && formik.touched.password}
                    helperText={
                        !!formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <TextField
                    label='Confirm Password'
                    className={styleClasses.textField}
                    variant='outlined'
                    name='confirmpassword'
                    autoFocus
                    error={
                        !!formik.errors.confirmpassword &&
                        formik.touched.confirmpassword
                    }
                    helperText={
                        !!formik.errors.confirmpassword &&
                        formik.touched.confirmpassword
                            ? formik.errors.confirmpassword
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.confirmpassword}
                />
                <InputLabel className={styleClasses.textField} id='role'>
                    Role
                </InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='role'
                    value={formik.values.role}
                >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'hr-admin'}>HR Admin</MenuItem>
                </Select>
                <Button
                    className={styleClasses.textField}
                    variant='contained'
                    color='primary'
                    disableElevation
                    type='submit'
                >
                    Create User
                </Button>
            </form>
        </div>
    );
};

export default AddUser;
