import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post("http://localhost:5000/api/auth/login",{email,password});
            localStorage.setItem("token",data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed");
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <form className='bg-white p-6 shadow-md rounded' onSubmit={handleLogin}>
            <h2 className='text-xl mb-4'>Login</h2>
            <input type="email" className='block border p-2 w-full' placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)} required/>
            <input type="password" className='block border p-2 w-full' placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)} required/>
            <button className='bg-blue-500 text-white px-4 py-2 mt-4'>Login</button>
        </form>
    </div>
  )
}

export default Login