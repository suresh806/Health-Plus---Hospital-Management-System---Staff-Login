import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { AddBed } from "../../../../../Redux/Datas/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import "./AddBeds.css";
const notify = (text) => toast(text);

const AddBeds = () => {
  const { data } = useSelector((store) => store.auth);

  const InitData = {
    roomNumber: "none",
    bedNumber: "",
    occupied: "available",
  };
  const [BedData, setBedData] = useState(InitData);

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const HandleAmbuChange = (e) => {
    setBedData({
      ...BedData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleAmbuSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(AddBed(BedData));
    setloading(false);
    setBedData(InitData);
    notify("Bed Added");
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
          <div className="bed-form-container">
            <h1 className="bed-form-title">Add New Bed</h1>
            <form onSubmit={HandleAmbuSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Bed Number</label>
                  <input
                    type="number"
                    placeholder="Enter bed number"
                    name="bedNumber"
                    value={BedData.bedNumber}
                    onChange={HandleAmbuChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Room Number</label>
                  <input
                    type="number"
                    placeholder="Enter room number"
                    name="roomNumber"
                    value={BedData.roomNumber}
                    onChange={HandleAmbuChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="formsubmitbutton">
                {loading ? "Adding..." : "Add Bed"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBeds;
