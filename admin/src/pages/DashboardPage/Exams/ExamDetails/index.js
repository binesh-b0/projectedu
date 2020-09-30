import React,{useState} from 'react'
import SimpleLoading from '../../../../components/loading/SimpleLoading'
import api from '../../../../api/api'
import {getCredentials} from '../../../../services/authService'

export default function ExamDetails(props) {
    
    const [data, setData] = useState([])

    const getExam=async ()=>{
        try {
            const { data } = await api.post(
                '/admin/getExam',{id:props.match.params.id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            if(data) setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    if(data.questions) return <SimpleLoading />
    return (
        <div>
            
        </div>
    )
}
