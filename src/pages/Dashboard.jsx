import axios from 'axios'
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContextData } from '../context/Context';

const Dashboard = () => {
    const API_URI=import.meta.env.VITE_API_URI;
    const navigate=useNavigate()
    const {user,setUser}=useUserContextData()

    const logoutFunction=()=> {
        axios.delete(`${API_URI}/api/logout`,{withCredentials:true}).then(res=>{
            setUser({})
            navigate('/')
        }).catch(err=>console.log(err))
    }

    if(!user.email) {
      return <Navigate to="/"/>
    } 
  return (
    <div>
        <h1 className='text-2xl text-center my-4'>Welcome User</h1>
        <div className='text-center'>
        <button className='bg-red-500 text-white font-semibold rounded-md px-4 py-1' onClick={logoutFunction}>Logout</button>
        </div>
    </div>
  )
}

export default Dashboard