import React, { useState } from "react";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AddPatients,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate } from "react-router-dom";
import "./AddPatient.css";

const notify = (text) => toast(text);

const Add_Patient = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);

  const initBed = {
    bedNumber: "",
    roomNumber: "",
  };
  const [bedDetails, setbedDetails] = useState(initBed);

  const HandleBedchange = (e) => {
    setbedDetails({ ...bedDetails, [e.target.name]: e.target.value });
  };

  const InitData = {
    patientName: "",
    patientID: Date.now(),
    age: "",
    email: "",
    gender: "",
    mobile: "",
    disease: "",
    address: "",
    department: "",
    date: "",
    bloodGroup: "",
    DOB: "",
    password: "",
    nurseID: data?.user._id,
    docID: "",
    details: "",
  };
  const [AddPatient, setAddPatient] = useState(InitData);

  const HandleAppointment = (e) => {
    setAddPatient({ ...AddPatient, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();

    if (
      AddPatient.gender === "" ||
      AddPatient.department === "" ||
      AddPatient.docID === "" ||
      AddPatient.bloodGroup === ""
    ) {
      return notify("Please Enter All the Requried Feilds");
    }
    try {
      setLoading(true);
      dispatch(GetSingleBed(bedDetails)).then((res) => {
        if (res.message === "Bed not found") {
          setLoading(false);
          return notify("Bed not found");
        }
        if (res.message === "Occupied") {
          setLoading(false);
          return notify("Bed already occupied");
        }
        if (res.message === "No Bed") {
          setLoading(false);
          return notify("Bed not found");
        }
        if (res.message === "Available") {
          // --- CHANGE STARTS HERE ---
          const patientData = {
            ...AddPatient,
            bedNo: bedDetails.bedNumber,
            roomNo: bedDetails.roomNumber,
            docID: AddPatient.docID ? AddPatient.docID : undefined, // Ensure docID is set
          };
          dispatch(AddPatients(patientData)).then((item) => {
            if (item.message === "Patient already exists") {
              setLoading(false);
              return notify("Patient already exists");
            }
            // Update bed with correct patientID and also update bedNumber and roomNumber
            let data = {
              patientID: item.id,
              occupied: "occupied",
              bedNumber: bedDetails.bedNumber,
              roomNumber: bedDetails.roomNumber,
            };
            notify("Patient Added");
            dispatch(EditSingleBed(data, res.id)).then((ele) => {
              notify("Bed updated");
              setLoading(false);
              setAddPatient(InitData);
              setbedDetails(initBed);
            });
          });
          // --- CHANGE ENDS HERE ---
        } else {
          setLoading(false);
          console.log("error");
        }
      });
      //
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "nurse") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Patient</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />

            <form onSubmit={HandleOnsubmitAppointment}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={AddPatient.patientName}
                    onChange={HandleAppointment}
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
                    value={AddPatient.age}
                    onChange={HandleAppointment}
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
                    placeholder="abc@abc.com"
                    name="email"
                    value={AddPatient.email}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="number"
                    placeholder="Number"
                    name="mobile"
                    value={AddPatient.mobile}
                    onChange={HandleAppointment}
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
                    value={AddPatient.gender}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="DOB"
                    value={AddPatient.DOB}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    onChange={HandleAppointment}
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
                  <label>Department</label>
                  <select
                    name="department"
                    value={AddPatient.department}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Disease</label>
                  <input
                    type="text"
                    placeholder="Disease"
                    name="disease"
                    value={AddPatient.disease}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Details</label>
                  <input
                    type="text"
                    placeholder="Medical Details"
                    name="details"
                    value={AddPatient.details}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Doctor</label>
                  <select
                    name="docID"
                    value={AddPatient.docID}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  >
                    <option value="">Select Doctor</option>
                    <option value="63d228df1742e138a3727857">Suresh</option>
                    <option value="63d2270dfe66e89c9be342f9">Suresh N</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Admission Date</label>
                  <input
                    type="date"
                    name="date"
                    value={AddPatient.date}
                    onChange={HandleAppointment}
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
                    placeholder="Address line 1"
                    name="address"
                    value={AddPatient.address}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={AddPatient.password}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bed Number</label>
                  <input
                    type="number"
                    placeholder="Bed Number"
                    name="bedNumber"
                    value={bedDetails.bedNumber}
                    onChange={HandleBedchange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Room Number</label>
                  <input
                    type="number"
                    placeholder="Room Number"
                    name="roomNumber"
                    value={bedDetails.roomNumber}
                    onChange={HandleBedchange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              {/* ADD IMAGES  */}
              {/* <div>
            <label>Image</label>
            <div className="inputdiv">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                style={{ display: "block" }}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </div> */}
              <button
                type="submit"
                className="formsubmitbutton"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Adding Patient...
                  </>
                ) : (
                  'Add Patient'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Patient;
