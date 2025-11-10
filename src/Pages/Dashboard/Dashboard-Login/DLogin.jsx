import React, { useState } from "react";
import { Radio } from "antd";
import { 
  FaUserNurse, 
  FaUserMd, 
  FaUserShield, 
  FaEnvelope,
  FaLock, 
  FaUser,
  FaKey, 
  FaSpinner,
  FaHospitalAlt
} from "react-icons/fa";
import admin from "../../../img/admin.jpg";
import { RiHospitalFill, RiHealthBookFill } from "react-icons/ri";
import "./DLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminLogin,
  DoctorLogin,
  forgetPassword,
  NurseLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer } from "antd";


const notify = (text) => toast(text);

const DLogin = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [placement, SetPlacement] = useState("Nurse");
  const [formvalue, setFormvalue] = useState({
    ID: "",
    password: "",
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formvalue.ID !== "" && formvalue.password !== "") {
      if (placement === "Nurse") {
        let data = {
          nurseID: formvalue.ID,
          password: formvalue.password,
        };

      try {
        const res = await dispatch(NurseLogin(data));
        
        if (!res) {
          setLoading(false);
          notify("Wrong credentials. Please try again.");
          return;
        }

        const message = res?.message || res?.data?.message;
        
        if (!message) {
          setLoading(false);
          notify("Invalid response from server");
          return;
        }

        if (message === "Successful" || message === "Login successful") {
          notify("Login Successful");
          setLoading(false);
          return navigate("/dashboard");
        }

        setLoading(false);
        notify(message || "Wrong credentials");
      } catch (error) {
        console.error("Login error:", error);
        setLoading(false);
        notify("An error occurred during login");
      }
        


      } else if (placement === "Doctor") {
        let data = {
          docID: formvalue.ID,
          password: formvalue.password,
        };
        
        try {
          const res = await dispatch(DoctorLogin(data));
          
          if (!res) {
            setLoading(false);
            notify("Wrong credentials. Please try again.");
            return;
          }

          const message = res?.message || res?.data?.message;
          
          if (!message) {
            setLoading(false);
            notify("Invalid response from server");
            return;
          }

          if (message === "Successful" || message === "Login successful") {
            notify("Login Successful");
            setLoading(false);
            return navigate("/dashboard");
          }

          setLoading(false);
          notify(message || "Wrong credentials");
        } catch (error) {
          console.error("Doctor login error:", error);
          setLoading(false);
          notify("An error occurred during login");
        }



      } else if (placement === "Admin") {
        let data = {
          adminID: formvalue.ID,
          password: formvalue.password,
        };
        
        try {
          const res = await dispatch(AdminLogin(data));
          
          if (!res) {
            setLoading(false);
            notify("Wrong credentials. Please try again.");
            return;
          }

          const message = res?.message || res?.data?.message;
          
          if (!message) {
            setLoading(false);
            notify("Invalid response from server");
            return;
          }

          if (message === "Successful" || message === "Login successful") {
            notify("Login Successful");
            setLoading(false);
            return navigate("/dashboard");
          }

          setLoading(false);
          notify(message || "Wrong credentials");
        } catch (error) {
          console.error("Admin login error:", error);
          setLoading(false);
          notify("An error occurred during login");
        }


      }
    }
  };

  const placementChange = (e) => {
    SetPlacement(e.target.value);
    setFormvalue({ ID: "", password: ""});
  };

  const [ForgetPassword, setForgetPassword] = useState({
    type: "",
    email: "",
  });

  const HandleForgetPassword = (e) => {
    setForgetPassword({ ...ForgetPassword, [e.target.name]: e.target.value });
  };

  const [forgetLoading, setforgetLoading] = useState(false);

  const HandleChangePassword = async () => {
    try {
      if (!ForgetPassword.type || !ForgetPassword.email) {
        return notify("Please fill all details");
      }

      setforgetLoading(true);
      const res = await dispatch(forgetPassword(ForgetPassword));

      if (!res) {
        setforgetLoading(false);
        return notify("Wrong credentials. Please try again.");
      }

      const message = res?.message;

      if (message === "User not found") {
        setforgetLoading(false);
        return notify("User not found");
      }

      // Reset form
      setForgetPassword({
        type: "",
        email: "",
      });
      
      // Close drawer and show success message
      onClose();
      setforgetLoading(false);
      notify("Account details have been sent to your email");
    } catch (error) {
      console.error("Password reset error:", error);
      setforgetLoading(false);
      notify("An error occurred while resetting password");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
          <div className="hospital-icon">
            <RiHospitalFill className="icon-primary" />
            <FaHospitalAlt className="icon-secondary" />
            <RiHealthBookFill className="icon-accent" />
          </div>
          <h2 className="welcome-text">Hospital Management System</h2>
        </div>
        <div className="rightside">
          <h1>Welcome Back!</h1>
          <div>
            <Radio.Group
              value={placement}
              onChange={placementChange}
              className={"radiogroup"}
            >
              <Radio.Button value="Nurse" className={"radiobutton"}>
                <FaUserNurse /> Nurse
              </Radio.Button>
              <Radio.Button value="Doctor" className={"radiobutton"}>
                <FaUserMd /> Doctor
              </Radio.Button>
              <Radio.Button value="Admin" className={"radiobutton"}>
                <FaUserShield /> Admin
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="Profileimg">
            <img src={admin} alt={`${placement} Profile`} />
          </div>
          <div>
            <form onSubmit={HandleSubmit}>
              <div className="straight-form">
                <label className="form-label">
                  ID
                </label>
                <div className="input-with-icon">
                  <FaUser className="field-icon" />
                  <input
                    type="text"
                    name="ID"
                    value={formvalue.ID}
                    onChange={Handlechange}
                    placeholder="Enter your ID"
                    className="form-input"
                    required
                  />
                </div>

                <label className="form-label">
                  Password
                </label>
                <div className="input-with-icon">
                  <FaLock className="field-icon" />
                  <input
                    type="password"
                    name="password"
                    value={formvalue.password}
                    onChange={Handlechange}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <button type="submit">
                {Loading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Signing In...
                  </div>
                ) : (
                  <>Sign In</>
                )}
              </button>
              <p className="forget-password">
                Forgot Password?{" "}
                <span onClick={showDrawer}>Reset via Email</span>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Drawer
        title={
          <div className="drawer-title">
            <FaKey className="title-icon" />
            Reset Password
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        width={400}
      >
        <div className="drawer-content">
          <div className="forgot-form-group">
            <label className="forgot-label">
              <FaUserShield className="label-icon" />
              Select Role
            </label>
            <div className="select-wrapper">
              <select
                name="type"
                value={ForgetPassword.type}
                onChange={HandleForgetPassword}
                required
                className="forgot-select"
              >
                <option value="">Select your role</option>
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="forgot-form-group">
            <label className="forgot-label">
              <FaEnvelope className="label-icon" />
              Email Address
            </label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={ForgetPassword.email}
                onChange={HandleForgetPassword}
                required
                className="forgot-input"
              />
            </div>
          </div>

          <button
            onClick={HandleChangePassword}
            className="reset-button"
            disabled={forgetLoading}
          >
            {forgetLoading ? (
              <span className="button-content">
                <FaSpinner className="spinner" />
                Processing...
              </span>
            ) : (
              <span className="button-content">
                <FaEnvelope />
                Send Reset Link
              </span>
            )}
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default DLogin;
