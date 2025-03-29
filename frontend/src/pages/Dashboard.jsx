import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        const fetchUsers=async()=>{
            const token=localStorage.getItem("token");
            const {data}=await axios.get("http://localhost:5000/api/users",{
                headers:{Authorization:token},
            });
            setUsers(data.rows);
        }
        fetchUsers();
    },[]);
  return (
    <div className='p-6'>
        <h2 className='text-xl'>Users</h2>
        <ul>
            {users.map((user)=>{
                <li key={user.id} className='border p-2 my-2'>{user.email}</li>
            })}
        </ul>
    </div>
  )
}

export default Dashboard