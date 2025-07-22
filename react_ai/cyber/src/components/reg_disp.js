import React,{useEffect,useState} from "react";
import axios from 'axios';

const Regdisplay=()=>{
    const[users,setUsers]=useState([]);

    useEffect(()=>{

        axios.get('http://localhost:8000/reg_disp/')
        .then(response=>{
            setUsers(response.data);
        })
        .catch(error=>{
            console.error(' Error fetching users:',error);
        });       
        
    },[]);

    return(
        <div align="center">

        <h1>User Details</h1>
        <table border="5" width={100}>
            <tr>
                
                <th>Name</th>
                <th>Contactno</th>
                <th>email</th>
                
            </tr>

            {users.map((user,index)=>(
                <tr key={index}>
    
                    <td>{user.name}</td>
                    <td>{user.contact}</td>

                    <td>{user.email}</td>
                    
                </tr>
            ))}
        
        </table>
        </div>
    );
};
export default Regdisplay;