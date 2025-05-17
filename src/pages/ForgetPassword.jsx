import axios from "axios";
import React, { useState } from "react";
import dashboardImage from "../assets/dashboardimage_ace1.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate(null);
  const [userData, setUserData] = useState({
    username: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const API_URI = import.meta.env.VITE_API_URI;

  const [otpReceived, setOtpReceived] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const sendOtpFunction = () => {
    const { username } = userData;
    if (!username) {
      return toast.warning("Please enter a valid email");
    }
    axios
      .post(`${API_URI}/api/send-otp`, { username })
      .then((res) => {
        toast.success(res.data.message);
        setOtpReceived(true);
      })
      .catch((err) => console.log(err));
  };

  const verifyOtpFunction = () => {
    const { username, otp } = userData;
    if (!username || !otp) {
      return toast.warning("Please enter valid inputs");
    }
    axios
      .post(`${API_URI}/api/verify-otp`, { username, otp })
      .then((res) => {
        toast.success(res.data.message);
        setOtpVerified(true);
        setOtpReceived(false);
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  const savePasswordFunction = () => {
    const { username, password, confirmPassword } = userData;
    if (!username || !password || !confirmPassword) {
      return toast.warning("Please enter all the required inputs");
    }
    if (password !== confirmPassword) {
      return toast.warning("Passwords are not matching!");
    }
    axios
      .post(`${API_URI}/api/update-password`, { username, password })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="flex-1 flex justify-center items-center">
        <div className="p-12">
          <h1 className="text-2xl font-medium my-2">Forget Password</h1>
          <h1 className="text-xl text-gray-500 font-medium">
            Welcome to Culture
          </h1>

          <form
            className="flex flex-col gap-3 my-4"
            onSubmit={(e) => e.preventDefault()}
          >
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

            {otpReceived && (
              <div className="flex flex-col gap-1">
                <label htmlFor="otp" className="text-lg text-gray-500">
                  Enter OTP
                </label>
                <input
                  type="number"
                  className="border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  id="otp"
                  required
                  name="otp"
                  value={userData.otp}
                  onChange={changeHandler}
                />
              </div>
            )}

            {otpVerified && (
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-lg text-gray-500">
                  New password
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

            {otpVerified && (
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPass" className="text-lg text-gray-500">
                  Confirm password
                </label>
                <input
                  type="text"
                  className="border rounded-lg py-2 px-2 border-slate-200 outline-none text-xl"
                  id="confirmPass"
                  required
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={changeHandler}
                />
              </div>
            )}

            {!otpReceived && !otpVerified && (
              <div className="text-end">
                <button
                  className="bg-blue-700 rounded-full py-1 px-10 text-xl text-white font-semibold"
                  onClick={sendOtpFunction}
                >
                  Send OTP
                </button>
              </div>
            )}

            {otpReceived && (
              <div className="text-end">
                <button
                  className="bg-blue-700 rounded-full py-1 px-10 text-xl text-white font-semibold"
                  onClick={verifyOtpFunction}
                >
                  Verify OTP
                </button>
              </div>
            )}

            {!otpReceived && otpVerified && (
              <div className="text-end">
                <button
                  className="bg-blue-700 rounded-full py-1 px-10 text-xl text-white font-semibold"
                  onClick={savePasswordFunction}
                >
                  Save Password
                </button>
              </div>
            )}
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

export default ForgetPassword;
