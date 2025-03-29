import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/register", { email, password });
        navigate("/login");
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='bg-white p-6 shadow-md rounded' onSubmit={handleRegister}>
                <h2 className='text-xl mb-4'>Register</h2>
                <input type="email" className='block border p-2 w-full' placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className='block border p-2 w-full' placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} required />
                <button className='bg-blue-500 text-white px-4 py-2 mt-4'>Register</button>
            </form>
        </div >
    )
}

export default Register