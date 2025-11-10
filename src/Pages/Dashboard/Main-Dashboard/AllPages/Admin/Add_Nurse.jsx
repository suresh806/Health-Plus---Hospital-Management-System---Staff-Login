import React, { useState } from "react";
import "./CSS/AdminForms.css";
import nurse from "../../../../../img/nurseavatar.png";
// Removed unused imports
import { useDispatch, useSelector } from "react-redux";
import { NurseRegister, SendPassword } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);

const Add_Nurse = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const InitData = {
    nurseName: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    DOB: "",
    address: "",
    education: "",
    department: "",
    nurseID: Date.now(),
    password: "",
    details: "",
    bloodGroup: "",
  };
  const [NurseValue, setNurseValue] = useState(InitData);

  const HandleDoctorChange = (e) => {
    setNurseValue({ ...NurseValue, [e.target.name]: e.target.value });
  };

  const HandleDoctorSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(NurseRegister(NurseValue)).then((res) => {
      if (res.message === "Nures already exists") {
        setLoading(false);
        return notify("Nurse Already Exist");
      }
      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }
      notify("Nurse Added");

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.nurseID,
      };
      dispatch(SendPassword(data)).then((res) => notify("Account Detais Sent"));
      setLoading(false);
      setNurseValue(InitData);
    });
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Nurse</h1>
            <img src={nurse} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDoctorSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nurse Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="nurseName"
                    value={NurseValue.nurseName}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={NurseValue.age}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="number"
                    placeholder="Emergency Number"
                    name="mobile"
                    value={NurseValue.mobile}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="email"
                    value={NurseValue.email}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={NurseValue.gender}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  >
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={NurseValue.bloodGroup}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Birthdate</label>
                  <input
                    type="date"
                    name="DOB"
                    value={NurseValue.DOB}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Education</label>
                  <input
                    type="text"
                    placeholder="eg.MBBS"
                    name="education"
                    value={NurseValue.education}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={NurseValue.password}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={NurseValue.address}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Other Info</label>
                  <textarea
                    placeholder="Extra Information"
                    rows="4"
                    name="details"
                    value={NurseValue.details}
                    onChange={HandleDoctorChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Nurse;
