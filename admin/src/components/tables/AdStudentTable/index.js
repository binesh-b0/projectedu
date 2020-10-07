import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
    AddBox,
    ArrowDownward,
    Search,
    Clear,
    FirstPage,
    LastPage,
    ChevronLeft,
    FilterList,
    Check,
    DeleteOutline,
    Edit,
    SaveAlt,
    Delete,
    ViewColumn,
    ChevronRight,
    Remove,
    PhoneDisabled,
    PersonAddDisabled,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
    },
}));

const AdStudentTable = () => {

    const classes = useStyles();

    const tableData = [
        {
            id: 1,
            email: "test@gmail.com",
            name: "Amal",
            dob: "24-39-2333",
            interviews: 10,
            city: "Ernakulam"
        }
    ];

    const tableColumns = [
        { title: "Id", field: "id", align: "left" },
        { title: "Email", field: "email", align: "left" },
        { title: "Name", field: "name", align: "left" },
        { title: "Date of Birth", field: "dob", align: "left" },
        { title: "Interviews Attended", field: "interviews", align: "left" },
        { title: "City", field: "city", align: "left" },
    ];

    const tableOptions = {
        search: true,
        selection: true,
        filtering: true,
    };

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
        )),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => (
            <ArrowDownward {...props} ref={ref} />
        )),
        ThirdStateCheck: forwardRef((props, ref) => (
            <Remove {...props} ref={ref} />
        )),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    };


    return (
        <div className={classes.root}>
          <MaterialTable
            options={tableOptions}
            icons={tableIcons}
            title="Students"
            columns={tableColumns}
            data={tableData}
          />
        </div>
      );

}

export default AdStudentTable;