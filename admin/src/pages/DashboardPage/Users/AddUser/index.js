import React from 'react'
import AddUserComponent from '../../../../components/AddUserComponent'
export default function AddUser() {


    const createUser=(values)=>{
        console.log(values)
    }

    return (
        <div>
            <AddUserComponent onSubmit={createUser} />
        </div>
    )
}
