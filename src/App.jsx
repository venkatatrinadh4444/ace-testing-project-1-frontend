import React from "react";
import './App.css'
import Login from "./pages/Login";
import { Routes , Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import { ToastContainer } from "react-toastify";
import { useUserContextData } from "./context/Context";
import { BeatLoader } from "react-spinners";
const App=()=> {
  const { loading } = useUserContextData()

  if(loading) {
    return <BeatLoader className="text-center my-10"/>
  }

  return (
    <div>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
    </Routes>
    <ToastContainer/>
    </div>
  )
}

export default App