import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DischargeForm.css";

const notify = (text) => toast(text);

const Discharge_and_Create_Slip = () => {
  const { data } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Initialize medicines state
  const initmed = {
    medName: "",
    dosage: "",
    duration: "",
  };
  const [med, setmed] = useState(initmed);
  const [medicines, setmedicines] = useState([]);

  // Initialize form data
  const InitData = {
    docName: "",
    docDepartment: "",
    patientAge: "",
    docMobile: "",
    patientMobile: "",
    patientBloodGroup: "",
    patientGender: "",
    email: "",
    patientDisease: "",
    patientTemperature: "",
    patientWeight: "",
    patientBP: "",
    patientGlucose: "",
    patientName: "",
    extrainfo: "",
    date: "",
    time: "",
    medicines: [],
  };
  const [ReportValue, setReportValue] = useState(InitData);

  // Handle form changes
  const HandleMedChange = (e) => {
    setmed({ ...med, [e.target.name]: e.target.value });
  };

  const HandleReportChange = (e) => {
    setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  };

  // Handle adding medicines
  const HandleMedAdd = (e) => {
    e.preventDefault();
    if (med.medName && med.dosage && med.duration) {
      setmedicines([...medicines, med]);
      setmed(initmed);
    } else {
      notify("Please fill all medicine fields");
    }
  };

  // Handle form submission
  const HandleReportSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...ReportValue,
      medicines,
    };
    try {
      setLoading(true);
      dispatch(CreateReport(data)).then((res) => {
        if (res.message === "Report successfully created") {
          notify("Report Created Successfully");
          setLoading(false);
          setReportValue(InitData);
          setmedicines([]);
        } else {
          setLoading(false);
          notify("Something went wrong");
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      notify("Error creating report");
    }
  };

  // Authentication checks
  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Create Discharge Report</h1>
            <form onSubmit={HandleReportSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="docName"
                    value={ReportValue.docName}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    placeholder="Department"
                    name="docDepartment"
                    value={ReportValue.docDepartment}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Doctor Mobile</label>
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    name="docMobile"
                    value={ReportValue.docMobile}
                    onChange={HandleReportChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    placeholder="Patient Name"
                    name="patientName"
                    value={ReportValue.patientName}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Patient Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    name="patientAge"
                    value={ReportValue.patientAge}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    name="patientMobile"
                    value={ReportValue.patientMobile}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    name="email"
                    value={ReportValue.email}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="patientGender"
                    value={ReportValue.patientGender}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    name="patientBloodGroup"
                    value={ReportValue.patientBloodGroup}
                    onChange={HandleReportChange}
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
                <div className="form-group">
                  <label>Disease/Condition</label>
                  <input
                    type="text"
                    placeholder="Primary Diagnosis"
                    name="patientDisease"
                    value={ReportValue.patientDisease}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Body Temperature (°C)</label>
                  <input
                    type="number"
                    placeholder="98.6"
                    name="patientTemperature"
                    value={ReportValue.patientTemperature}
                    onChange={HandleReportChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Weight (KG)</label>
                  <input
                    type="number"
                    placeholder="Weight in KG"
                    name="patientWeight"
                    value={ReportValue.patientWeight}
                    onChange={HandleReportChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Blood Pressure (mmHg)</label>
                  <input
                    type="text"
                    placeholder="140/90"
                    name="patientBP"
                    value={ReportValue.patientBP}
                    onChange={HandleReportChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Glucose Level (mg/dL)</label>
                  <input
                    type="number"
                    placeholder="mg/dL"
                    name="patientGlucose"
                    value={ReportValue.patientGlucose}
                    onChange={HandleReportChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Additional Notes</label>
                  <input
                    type="text"
                    placeholder="Additional Information"
                    name="extrainfo"
                    value={ReportValue.extrainfo}
                    onChange={HandleReportChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={ReportValue.date}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group time-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={ReportValue.time}
                    onChange={HandleReportChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Dosage</label>
                  <select 
                    name="dosage" 
                    onChange={HandleMedChange}
                    value={med.dosage}
                    className="form-control"
                  >
                    <option value="">Select Dosage</option>
                    <option value="1">Once a day</option>
                    <option value="2">Twice a day</option>
                    <option value="3">Thrice a day</option>
                  </select>
                </div>
              </div>

              {/* Medicines Section */}
              <div className="form-row">
                <div className="form-group">
                  <label>Medicine Name</label>
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    name="medName"
                    value={med.medName}
                    onChange={HandleMedChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Timing</label>
                  <select 
                    name="duration" 
                    onChange={HandleMedChange}
                    value={med.duration}
                    className="form-control"
                  >
                    <option value="">Select Timing</option>
                    <option value="After Meal">After Meal</option>
                    <option value="Before Meal">Before Meal</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={HandleMedAdd}
                    className="btn-add-medicine"
                  >
                    Add Medicine
                  </button>
                </div>
              </div>

              {medicines.length > 0 && (
                <div className="medicines-list">
                  <h4>Prescribed Medicines</h4>
                  <div className="medicines-grid">
                    {medicines.map((medicine, index) => (
                      <div key={index} className="medicine-item">
                        <span className="medicine-name">{medicine.medName}</span>
                        <span className="medicine-details">
                          {medicine.duration} • {medicine.dosage} time(s) daily
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="formsubmitbutton"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Generating Report...
                  </>
                ) : (
                  'Generate Report'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discharge_and_Create_Slip;