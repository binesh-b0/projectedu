import React from 'react'
import AddUserComponent from '../../../../components/AddUserComponent'
import api from '../../../../api/api'
import {getCredentials} from '../../../../services/authService'
export default function AddUser() {



    const createUser=async (values)=>{
        const {email,name,password,role,organization} = values
        console.log("values dd",values)
        try {
            const data = await api.post("/admin/createAdminUser",
            {email,username:name,name:organization,password,role},
            {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getCredentials()}`,
                },
              },
              {timeout:1000})
              console.log(data)
        } catch (error) {
            console.log(error,"coo");
        }
    }

    return (
        <div>
            <AddUserComponent onSubmitClicked={createUser} />
        </div>
    )
}
