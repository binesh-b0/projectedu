import React, { useState } from 'react';
import AddUserComponent from '../../../../components/AddUserComponent';
import api from '../../../../api/api';
import { getCredentials } from '../../../../services/authService';

export default function AddUser({ history }) {
    const [loading, setLoading] = useState(false);
    const createUser = async (values) => {
        const { email, name, password, role, organization } = values;

        setLoading(true);
        console.log('values dd', values);
        try {
            const data = await api.post(
                '/admin/createAdminUser',
                { email, username: name, name: organization, password, role },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            console.log(data);
            setLoading(false);
            history.goBack();
        } catch (error) {
            console.log(error, 'coo');
            setLoading(false);
        }
    };

    return (
        <div>
            <AddUserComponent onSubmitClicked={createUser} loading={loading} />
        </div>
    );
}
