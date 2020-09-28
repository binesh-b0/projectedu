import React,{useState,forwardRef} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';

import {
    Add,
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
    ViewColumn,
    ChevronRight,
    Remove,
  } from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 32,
  },
  buttonContainer:{
    marginTop:12,

  }
});
export default function Two({ handleNext, handleBack }) {
  const classes = useStyles();

  const tableColumns = [
      { title: "Instruction",
       field: "instruction",
       cellStyle:{width:"100%"},
       editComponent: props => (
        <TextField
            style={{width:"100%"}}
         fullWidth
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ) 

    }];

  const [data, setData] = useState([
    {instruction:"Culpa exercitation veniam elit do eu anim officia pariatur dolore minim.",},
    {instruction: "Adipisicing nulla culpa voluptate amet et dolore." },
    {instruction:"Eiusmod proident reprehenderit quis consequat sit elit labore.",},
    {instruction: "Culpa excepteur qui sit cupidatat." },
    {instruction: "In excepteur officia laborum labore laborum exercitation.",},
    {instruction:"Adipisicing eiusmod adipisicing eu eu fugiat ex commodo sunt laborum quis deserunt dolor nisi duis.",},
  ]);

  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setData([...data, newData]);

          resolve();
        }, 0);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
        }, 0);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve();
        }, 0);
      }),
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
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
  const tableOptions={
    filtering: false,
    search:false,
    sorting:false,
    pageSizeOptions:[5,10]
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        columns={tableColumns}
        data={data} 
        icons={tableIcons}
        editable={editable}
        options={tableOptions}
        title="Instructions to be displayed to students" />
        <div className={classes.buttonContainer}>
        <Button variant="contained" color="secodary"
         disableElevation style={{marginRight:"16px"}}
         onClick={handleBack}   >
        Previous
      </Button>
      <Button variant="contained" color="primary" disableElevation onClick={handleNext}>
        Next
      </Button>
        </div>
    </div>
  );
}
