import api from '../../api/api';
import setCredentials from "./setCredentials";

const updatePassword = async (password) => {
    try {
        const data = await api.post('/updateuserpass',{ password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(data);
        // setCredentials("akjndajsjndoansdoandoaisndo")
        return 200;
    } catch (err) {
        console.log(err);
        return 400;
    }
};
    
export default updatePassword;