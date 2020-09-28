/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect } from "react";
import MaterialTable from "material-table";
import api from "../../../api/api";
import { getCredentials } from "../../../services/authService";
import { getAllExams } from "../../../actions/examActions";
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
import { icon } from "@fortawesome/fontawesome-svg-core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
  },
}));
const ExamTable = (props) => {
  const classes = useStyles();
  //   const allExams = useSelector((state) => state.allExams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExams());
  }, []);

  const tableColumns = [
    { title: "Id", field: "id", align: "left" },
    { title: "Name", field: "name", align: "left" },
    { title: "Level", field: "level", align: "left" },
  ];

  const allExams = [
    {
      id: 100,
      name: "exam 1",
      level: 1,
    },
    {
      id: 200,
      name: "exam 2",
      level: 2,
    },
  ];
  const tableOptions = {
    search: true,
    selection: true,
    filtering: true,
    actionsColumnIndex: -1,
  };

  const disableExam = async (userId, status) => {
    try {
      const res = await api.post(
        "admin/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCredentials()}`,
          },
        },
        { timeout: 1000 }
      );
      props.getAllUser();
      return true;
    } catch (error) {
      console.log(error, "DU");
      return false;
    }
  };

  const actionOptions = [
    {
      icon: () => <Edit />,
      tooltip: "Edit",
      onClick: (evt, data) => console.log(data),
      isFreeAction: false,
    },
    {
      icon: () => <PersonAddDisabled />,
      tooltip: "Disable",
      onClick: (evt, data) => disableExam(data.id, data.Status),
    },
  ];

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

  const editable = {
    onRowDelete: async (oldData) => {
      try {
        const { id } = oldData;
        const res = await api.post(
          "admin/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: ` Bearer ${getCredentials()}`,
            },
          },
          { timeout: 1000 }
        );
        props.getAllUser();
      } catch (error) {
        console.log(error, "LU");
        return false;
      }
      return true;
    },
  };

  return (
    <div className={classes.root}>
      <MaterialTable
        options={tableOptions}
        icons={tableIcons}
        // editable={editable}
        title="Exams"
        columns={tableColumns}
        data={allExams}
        actions={actionOptions}
      />
    </div>
  );
};

export default ExamTable;
