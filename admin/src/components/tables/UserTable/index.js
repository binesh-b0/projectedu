/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect } from 'react';
import MaterialTable from 'material-table';
import api from '../../../api/api';
import { getCredentials } from '../../../services/authService';
import { connect } from 'react-redux';
import { getAllUser } from '../../../actions/userActions';
import style from './UserTable.module.css';
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
} from '@material-ui/icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

const UserTable = (props) => {
    useEffect(() => {
        props.getAllUser();
    }, []);

    const tableColumns = [
        { title: 'Email', field: 'Email' },
        { title: 'Name', field: 'Name' },
        { title: 'Role', field: 'Role' },
    ];

    const tableOptions = {
        search: true,
        // selection: true,
        filtering: true,
        actionsColumnIndex: -1,
    };

    const disableUser = async (userId) => {
        try {
            const res = await api.post(
                'admin/updateAdminUser',
                { userId, operation: 'DISABLE' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            return true;
        } catch (error) {
            console.log(error, 'DU');
            return false;
        }
    };

    const actionOptions = [
        // {
        //     tooltip: 'Remove All Selected Users',
        //     icon: () => <Delete />,
        //     onClick: (evt, data) => console.log(data),
        // },
        // {
        //     icon: () => <Edit />,
        //     tooltip: 'Edit',
        //     onClick: (evt, data) => console.log(data),
        // },
        {
            icon: () => <PersonAddDisabled />,
            tooltip: 'Disable',
            onClick: (evt, data) => disableUser(data.id),
        },
    ];

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
        )),
        DetailPanel: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => (
            <FirstPage {...props} ref={ref} />
        )),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
        )),
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
        ViewColumn: forwardRef((props, ref) => (
            <ViewColumn {...props} ref={ref} />
        )),
    };

    const editable = {
        onRowUpdate: async (newData, oldData) => {
            console.log(newData, oldData);
            try {
                const { id, Email, Username, Name, Role } = newData;
                const res = await api.post(
                    'admin/updateAdminUser',
                    {
                        userId: id,
                        email: Email,
                        username: Username,
                        name: Name,
                        role: Role,
                        operation: 'UPDATE',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${getCredentials()}`,
                        },
                    },
                    { timeout: 1000 }
                );
            } catch (error) {
                console.log(error, 'UU');
                return false;
            }
            return true;
        },
        onRowDelete: async (oldData) => {
            // console.log(userId);
            try {
                const { id } = oldData;
                const res = await api.post(
                    'admin/updateAdminUser',
                    { userId: id, operation: 'DELETE' },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: ` Bearer ${getCredentials()}`,
                        },
                    },
                    { timeout: 1000 }
                );
            } catch (error) {
                console.log(error, 'LU');
                return false;
            }
            return true;
        },
    };

    return (
        <div className={style.container}>
            <MaterialTable
                options={tableOptions}
                icons={tableIcons}
                actions={actionOptions}
                editable={editable}
                title='Manage Users'
                columns={tableColumns}
                data={props.allUsers}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    console.log(state.allUsers);
    return {
        allUsers: state.allUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUser: () => dispatch(getAllUser()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTable);
