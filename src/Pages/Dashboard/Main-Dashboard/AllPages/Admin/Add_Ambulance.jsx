import React, { useState } from "react";
import one from "../../../../../img/ambuone.png";
import two from "../../../../../img/ambutwo.png";
import three from "../../../../../img/ambuthree.png";
import "./CSS/AdminStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { AmbulanceRegister } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);

const Add_Ambulance = () => {
  const { data } = useSelector((store) => store.auth);

  let [ambuType, setambuType] = useState("none");

  const [AmbuData, setAmbuDate] = useState({
    type: "none",
    charges: "",
    ambulanceID: "",
    ambulanceDriver: "",
    number: "",
  });

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const HandleAmbuChange = (e) => {
    setAmbuDate({
      ...AmbuData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleAmbuSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    let data = {
      ...AmbuData,
      type: ambuType,
    };
    dispatch(AmbulanceRegister(data));
    setloading(false);
    notify("Ambulance Added");
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
          <div className="mainAmbupance">
            <h1>Add Ambulance</h1>
            <div className="imagesection">
              <div 
                className={`ambulance-card ${ambuType === "Mobile ICU Ambulance" ? "selected" : ""}`}
                onClick={() => setambuType("Mobile ICU Ambulance")}
              >
                <img src={one} alt="Mobile ICU" />
                <div className="card-label">Mobile ICU Ambulance</div>
              </div>
              <div 
                className={`ambulance-card ${ambuType === "Basic Life Support Ambulance" ? "selected" : ""}`}
                onClick={() => setambuType("Basic Life Support Ambulance")}
              >
                <img src={two} alt="Basic Life Support" />
                <div className="card-label">Basic Life Support Ambulance</div>
              </div>
              <div 
                className={`ambulance-card ${ambuType === "Collective Ambulance" ? "selected" : ""}`}
                onClick={() => setambuType("Collective Ambulance")}
              >
                <img src={three} alt="Collective" />
                <div className="card-label">Collective Ambulance</div>
              </div>
            </div>
            <form onSubmit={HandleAmbuSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Ambulance Type</label>
                  <input
                    type="text"
                    placeholder="Select type from above"
                    name="type"
                    value={ambuType}
                    onChange={HandleAmbuChange}
                    required
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Ambulance Code</label>
                  <input
                    type="number"
                    placeholder="eg. 1223"
                    name="ambulanceID"
                    value={AmbuData.ambulanceID}
                    onChange={HandleAmbuChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price per Hour</label>
                  <input
                    type="number"
                    placeholder="eg. 200/-"
                    name="charges"
                    value={AmbuData.charges}
                    onChange={HandleAmbuChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Driver Name</label>
                  <input
                    type="text"
                    placeholder="Enter driver's name"
                    name="ambulanceDriver"
                    value={AmbuData.ambulanceDriver}
                    onChange={HandleAmbuChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Driver Contact Number</label>
                  <input
                    type="number"
                    placeholder="Enter contact number"
                    name="number"
                    value={AmbuData.number}
                    onChange={HandleAmbuChange}
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

export default Add_Ambulance;
