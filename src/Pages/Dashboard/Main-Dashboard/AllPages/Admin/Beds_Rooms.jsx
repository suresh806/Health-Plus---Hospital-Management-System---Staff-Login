import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { dischargePatient, GetBeds } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "./AddBeds.css";

const Beds_Rooms = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const { beds } = useSelector((state) => state.data);

  const DischargePatient = (_id) => {
    let data = {
      occupied: "available",
      _id,
    };
    dispatch(dischargePatient(data));
  };

  useEffect(() => {
    dispatch(GetBeds());
  }, [dispatch]);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="bed-form-container">
            <h1 className="bed-form-title">Bed Management</h1>
            <div className="beds-table-container">
              <table className="beds-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Bed</th>
                    <th>Status</th>
                    <th>Patient</th>
                    <th>Disease</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {beds?.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{ele.roomNumber}</td>
                        <td>{ele.bedNumber}</td>
                        <td className={ele.occupied === "available" ? "status-available" : "status-occupied"}>
                          {ele.occupied}
                        </td>
                        <td>{ele.patientID ? ele.patientID.patientName : "—"}</td>
                        <td>{ele.patientID?.disease || "—"}</td>
                        <td>{ele.patientID?.department || "—"}</td>
                        <td>
                          <button
                            className="discharge-button"
                            disabled={ele.occupied === "available"}
                            onClick={() => DischargePatient(ele._id)}
                          >
                            Discharge
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Beds_Rooms;
