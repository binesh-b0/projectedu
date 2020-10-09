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
import { getAllAds, deleteAd } from '../../../actions/adActions';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
    },
}));

const AdTable = (props) => {
    const classes = useStyles();
    const ads = useSelector((state) => state.ads);
    const { loading, data } = ads;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAds());
    }, []);


    const tableColumns = [
        { title: "Id", field: "id", align: "left" },
        { title: "Ad Name", field: "AdName", align: "left" },
        { title: "Ad Type", field: "AdType", align: "left" },
        { title: "Ad Zone", field: "AdZone", align: "left" },
    ];

    const editable = {
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                console.log("OLD", oldData);
                dispatch(deleteAd(oldData.id));
            })
    }

    const tableOptions = {
        search: true,
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
                editable={editable}
                isLoading={ads.loading}
                options={tableOptions}
                icons={tableIcons}
                title="Advertisements"
                columns={tableColumns}
                data={data}>
            </MaterialTable>
        </div>
    );
}

export default AdTable;