import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import dashboardImage from "../assets/dashboardimage_ace1.jpg";
import { toast } from "react-toastify";
import { useUserContextData } from "../context/Context";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate(null);
  const { setUser } = useUserContextData();
  const {user ,loading}=useUserContextData()

  const API_URI = import.meta.env.VITE_API_URI;

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "Admin",
  });

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerFunction = () => {
    const { name, email, role } = userData;
    axios
      .post(`${API_URI}/api/register`, { name, email, role })
      .then((res) => {
        toast.success(res.data.message);
        setIsRegister(false);
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  const loginFunction = () => {
    const { username, password } = userData;
    axios
      .post(
        `${API_URI}/api/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setUser(res.data.userDetails);
        navigate(`/dashboard`);
        setIsopen(false);
      })
      .catch((err) => toast.error(err.response?.data?.message));
  };

  if(user?.email) {
    return <Navigate to="/dashboard"/>
  }
  return (
    <div className="flex flex-col sm:flex-row h-[100vh]">
      <div className="flex-1 flex justify-center items-center">
        <div className="p-12">
          <h1 className="text-3xl font-medium my-2">
            {isRegister ? "Register" : "Login"}
          </h1>
          <h1 className="text-xl text-gray-500 font-medium">
            Welcome to Culture
          </h1>

          <form
            className="flex flex-col gap-3 my-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {isRegister && (
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-lg text-gray-500">
                  Enter name
                </label>
                <input
                  type="text"
                  className="border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  id="name"
                  required
                  name="name"
                  value={userData.name}
                  onChange={changeHandler}
                />
              </div>
            )}

            {!isRegister && (
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-lg text-gray-500">
                  Email / Username
                </label>
                <input
                  type="text"
                  className="border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  id="username"
                  required
                  name="username"
                  value={userData.username}
                  onChange={changeHandler}
                />
              </div>
            )}

            {isRegister && (
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-lg text-gray-500">
                  Enter email
                </label>
                <input
                  type="text"
                  className="border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  id="email"
                  required
                  name="email"
                  value={userData.email}
                  onChange={changeHandler}
                />
              </div>
            )}

            {!isRegister && (
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-lg text-gray-500">
                  Enter password
                </label>
                <input
                  type="text"
                  className="border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  id="password"
                  required
                  name="password"
                  value={userData.password}
                  onChange={changeHandler}
                />
              </div>
            )}

            {isRegister && (
              <div>
                <label htmlFor="role" className="text-lg text-gray-500">
                  Role
                </label>
                <select
                  className="w-full border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  name="role"
                  value={userData.role}
                  onChange={changeHandler}
                  id="role"
                >
                  <option value="Admin">Admin</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            )}

            {!isRegister && (
              <div className="text-end">
                <button
                  className="bg-blue-700 rounded-full py-1 px-10 text-xl text-white font-semibold"
                  onClick={loginFunction}
                >
                  Login
                </button>
              </div>
            )}

            {isRegister && (
              <div className="text-end">
                <button
                  className="bg-blue-700 rounded-full py-1 px-10 text-xl text-white font-semibold"
                  onClick={registerFunction}
                >
                  Register
                </button>
              </div>
            )}

            <div className="flex flex-col">
              {isRegister && (
                <p>
                  Have an account ?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setIsRegister(false)}
                  >
                    Click here
                  </span>
                </p>
              )}
              {!isRegister && (
                <p>
                  Create a new account ?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setIsRegister(true)}
                  >
                    Click here
                  </span>
                </p>
              )}

              {!isRegister && (
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate("/forget-password")}
                >
                  forget password
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block flex-1">
        <img
          src={dashboardImage}
          alt="dashboard"
          width="100%"
          className="h-[100%]"
        />
      </div>
    </div>
  );
};

export default Login;
