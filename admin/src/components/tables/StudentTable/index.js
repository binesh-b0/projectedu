/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect,useState } from "react";
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
const StudentTable = (props) => {
  const tableRef = React.createRef();

  const classes = useStyles();
  //   const allExams = useSelector((state) => state.allExams);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllExams());
  // }, []);

  const tableColumns = [
    { title: 'Avatar',field: 'avatar', filtering: false,sorting: false,
      render: rowData => (
        <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar}/>
    ),},
    { title: "Id", field: "id", align: "left" },
    { title: "Name", field: "Title", align: "left" },
    { title: "Email", field: "Email", align: "left" },
    { title: "HSST score", field: "score", align: "left" },
    { title: "Category", field: "Category", align: "left" ,lookup:{active:"active",inactive:'inactive'}},
  ];
  const [data, setData] = useState([])
  

  const tableOptions = {
    search: true,
    selection: true,
    filtering: true,
    // actionsColumnIndex: -1,
  };



  const actionsOptions=[
    {
      icon: 'refresh',
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => tableRef.current && tableRef.current.onQueryChange(),
    }
  ]
 
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
  const remoteData =(query)=>{            // 1
    console.log(query)
    new Promise((resolve, reject) => {
      // prepare your data and then call resolve like this:
      api.post(
            '/admin/getStudents',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCredentials()}`,
                },
            },
            {timeout:1000}
        ).then((res)=>{
          console.log("res",res)
          resolve({data: res.data.response})
          })
        .catch((err)=>console.log(err))
       
  })
 }
 const searchHandler = (text)=>{            // 6
    // setSearchText(text);
    tableRef.current.onSearchChange(text);  // 7
 }

  const handleRowclick=(id)=>{
    props.history.push('/app/students/details/'+id)  }

  return (
    <div className={classes.root}>
      <MaterialTable
        options={tableOptions}
        icons={tableIcons}
        title="Students"
        columns={tableColumns}
        // data={remoteData}
        actions={actionsOptions}
        onSelectionChange={(rows) => props.setSelected(rows.Email)}
        onRowClick={(event,rowData)=>{console.log(rowData.id,"r");handleRowclick(rowData.id)}}
      />
    </div>
  );
};

export default StudentTable;
