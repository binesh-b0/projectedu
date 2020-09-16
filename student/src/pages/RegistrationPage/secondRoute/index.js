import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import styles from "./style.module.css";
import { connect } from "react-redux";
import {
  changeProfileRegAddressInfo,
  changeProfileRegInfo,
} from "../../../actions/userActions";
import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { useFormik } from "formik";
import * as Yup from "yup";

const SecondRoute = ({ addressInfo, onChangeData, handleNext, handlePrev }) => {
  const { residence, permanent } = addressInfo;

  const useStyles = makeStyles({
    textField: { marginTop: 16 },
  });
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      padd1: "",
      padd2: "",
      pcity: "",
      pstate: "",
      ptel:"",
      pzip:"",
      radd1: "",
      radd2: "",
      rcity: "",
      rstate: "",
      rtel:"",
      rzip:"",
      checked:true,
        
    },
    validationSchema: Yup.object({
      padd1:Yup.string().required("Required"),
      padd2:Yup.string().required("Required"),
      pcity:Yup.string().required("Required"),
      pstate:Yup.string().required("Required"),
      pzip:Yup.number().required("Required").min(100000,"Invalid").max(999999,"Invalid"),
      ptel:Yup.number().required("Required").min(1000000000,"Invalid").max(9999999999,"Invalid"),
      radd1:Yup.string().when("checked",{
          is:false,
          then:(x)=>x.required("Required"),
          otherwise:(x)=>x.notRequired()
      }),
      radd2:Yup.string().when("checked",{
        is:false,
        then:(x)=>x.required("Required"),
        otherwise:(x)=>x.notRequired()
    }),
      rcity:Yup.string().when("checked",{
        is:false,
        then:(x)=>x.required("Required"),
        otherwise:(x)=>x.notRequired()
    }),
      rstate:Yup.string().when("checked",{
        is:false,
        then:(x)=>x.required("Required"),
        otherwise:(x)=>x.notRequired()
    }),
      rzip:Yup.number().when("checked",{
        is:false,
        then:(x)=>x.required("Required").min(100000,"Invalid").max(999999,"Invalid"),
        otherwise:(x)=>x.notRequired()
    }),
      rtel:Yup.number().when("checked",{
        is:false,
        then:(x)=>x.required("Required").min(1000000000,"Invalid").max(9999999999,"Invalid"),
        otherwise:(x)=>x.notRequired()
    }),
    }),
    onSubmit: (values) => {
      console.log(values, "asda");
      handleNext();
    },
  });

  return (
    <div className={styles.container}>
        <form onSubmit={formik.handleSubmit}>
      <div className={styles.formDiv}>
        <div className={styles.subDiv}>
          <p className={styles.subDivHeading}>Permanent Address</p>
          <div className={styles.firstForm}>
            <TextField
              className={classes.textField}
              label="Addressline 1"
              name="padd1"
              variant="outlined"
            //   value={permanent.addressLine1}
            value={formik.values.padd1}
            error={formik.touched.padd1&&!!formik.errors.padd1}
            helperText={(formik.touched.padd1&&!!formik.errors.padd1)?formik.errors.padd1:""}
            onChange={formik.handleChange}
            //   onChange={(event) => {
            //     onChangeData("perm", {
            //       addressLine1: event.target.value,
            //     });
            //   }}
            />
            <TextField
              className={classes.textField}
              label="Addressline 2"
              name="padd2"
              variant="outlined"
            //   value={permanent.addressLine2}
            value={formik.values.padd2}
            error={formik.touched.padd2&&!!formik.errors.padd2}
            helperText={(formik.touched.padd2&&!!formik.errors.padd2)?formik.errors.padd2:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="City/Town"
              variant="outlined"
              name="pcity"
            //   value={permanent.city}
            value={formik.values.pcity}
            error={formik.touched.pcity&&!!formik.errors.pcity}
            helperText={(formik.touched.pcity&&!!formik.errors.pcity)?formik.errors.pcity:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="State"
              name="pstate"
              variant="outlined"

            //   value={permanent.state}
            value={formik.values.pstate}
            error={formik.touched.pstate&&!!formik.errors.pstate}
            helperText={(formik.touched.pstate&&!!formik.errors.pstate)?formik.errors.pstate:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="Zip-Code"
              name="pzip"
              InputLabelProps={{ shrink: true }}
              type="number"
              variant="outlined"
            //   value={permanent.zipcode}
            value={formik.values.pzip}
            error={formik.touched.pzip&&!!formik.errors.pzip}
            helperText={(formik.touched.pzip&&!!formik.errors.pzip)?formik.errors.pzip:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="Phone Number"
              variant="outlined"
              name="ptel"
              type="number"
              InputLabelProps={{ shrink: true }}
            //   value={permanent.phoneNo}
            value={formik.values.ptel}
            error={formik.touched.ptel&&!!formik.errors.ptel}
            helperText={(formik.touched.ptel&&!!formik.errors.ptel)?formik.errors.ptel:""}
            onChange={formik.handleChange}
            />
            </div>
            <FormControlLabel
            control={<Checkbox checked={formik.values.checked} onChange={formik.handleChange} name="checked" />}
            label="Use as residence address"
          />
        </div>
        <div className={styles.subDiv}>
          <p className={styles.subDivHeading}>Residential Address</p>
   
          <div className={styles.secondForm} >
            <TextField
              className={classes.textField}
              label="Addressline 1"
              variant="outlined"
              name="radd1"
            //   value={residence.addressLine1}
            value={formik.values.radd1}
            disabled={formik.values.checked}
            error={formik.touched.radd1&&!!formik.errors.radd1}
            helperText={(formik.touched.radd1&&!!formik.errors.radd1)?formik.errors.radd1:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="Addressline 2"
              variant="outlined"
            name="radd2"
            //   value={residence.addressLine2}
            disabled={formik.values.checked}
            value={formik.values.radd2}
            error={!formik.values.checked&&formik.touched.radd2&&!!formik.errors.radd2}
            helperText={(!formik.values.checked&&formik.touched.padd1&&!!formik.errors.radd2)?formik.errors.radd2:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="City/Town"
              variant="outlined"
            //   value={residence.town}
            disabled={formik.values.checked}
            name="rcity"
            value={formik.values.rcity}
            error={!formik.values.checked&&formik.touched.rcity&&!!formik.errors.rcity}
            helperText={(!formik.values.checked&&formik.touched.rcity&&!!formik.errors.rcity)?formik.errors.rcity:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="State"
              variant="outlined"
            //   value={residence.state}
            name="rstate"
            value={formik.values.rstate}
            disabled={formik.values.checked}
            error={!formik.values.checked&&formik.touched.rstate&&!!formik.errors.rstate}
            helperText={(!formik.values.checked&&formik.touched.rstate&&!!formik.errors.rstate)?formik.errors.rstate:""}
            onChange={formik.handleChange}
            />
            <TextField
              className={classes.textField}
              label="Zip-Code"
              variant="outlined"
              type="number"
              name="rzip"
              InputLabelProps={{ shrink: true }}
              value={formik.values.rzip}
              disabled={formik.values.checked}
            error={!formik.values.checked&&formik.touched.rzip&&!!formik.errors.rzip}
            helperText={(!formik.values.checked&&formik.touched.rzip&&!!formik.errors.rzip)?formik.errors.rzip:""}
            onChange={formik.handleChange}
            //   value={residence.zipcode}
            />
            <TextField
              className={classes.textField}
              label="Phone Number"
              type="number"
              variant="outlined"
              name="rtel"
              InputLabelProps={{ shrink: true }}
                disabled={formik.values.checked}
              value={formik.values.rtel}
            error={!formik.values.checked&&formik.touched.rtel&&!!formik.errors.rtel}
            helperText={(!formik.values.checked&&formik.touched.rtel&&!!formik.errors.rtel)?formik.errors.rtel:""}
            onChange={formik.handleChange}
            //   value={residence.phoneNo}
            />
          </div>
        </div>
      </div>
      <div className={styles.btnDiv}>
        <Button onClick={handlePrev}>Previous</Button>
        <Button
          type="submit"
          className={styles.btn}
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
        >
          Continue
        </Button>
      </div>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondRoute);
