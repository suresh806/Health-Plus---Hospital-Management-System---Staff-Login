import React, { useState } from "react";
import { CommonProblem } from "./MixedObjectData";
import "./CSS/Book_appointment.css";
import { useDispatch } from "react-redux";
import { AddPatients, CreateBooking } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);

const Book_Appointment = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const InitValue = {
    patientName: "",
    age: "",
    gender: "",
    mobile: "",
    disease: "",
    address: "",
    email: "",
    department: "",
    date: "",
    time: "",
  };

  const [BookAppoint, setBookAppoint] = useState(InitValue);

  const HandleAppointment = (e) => {
    setBookAppoint({ ...BookAppoint, [e.target.name]: e.target.value });
  };

 const HandleOnsubmitAppointment = (e) => {
  e.preventDefault();

  if (BookAppoint.gender === "" || BookAppoint.department === "") {
    return notify("Please fill all the Details");
  }
  setLoading(true);
  dispatch(AddPatients({ ...BookAppoint, patientId: Date.now() })).then(
    (res) => {
      console.log("AddPatients response:", res);
      // Try both res.patientID and res.id for compatibility
      const patientID = res?.patientID || res?.id;
      if (!patientID) {
        notify("Patient ID not returned from AddPatients. Cannot book appointment.");
        setLoading(false);
        return;
      }
      let data = {
        ...BookAppoint,
        patientID: Number(patientID),
        doctorID: Number(BookAppoint.doctorID),
      };
      console.log("Booking payload:", data);
      dispatch(CreateBooking(data)).catch((err) => {
        notify("Booking failed: " + (err?.message || "Unknown error"));
      });
      notify("Appointment Booked");
      setLoading(false);
      setBookAppoint(InitValue);
    }
  );
};

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Book Appointment</h1>
            <form onSubmit={HandleOnsubmitAppointment}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={BookAppoint.patientName}
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
                    value={BookAppoint.age}
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
                    value={BookAppoint.email}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={BookAppoint.mobile}
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
                    value={BookAppoint.gender}
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
                  <label>Type of Disease</label>
                  <select
                    name="disease"
                    value={BookAppoint.disease}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  >
                    <option value="">Select Disease</option>
                    {CommonProblem.map((ele, i) => (
                      <option key={i} value={ele.title}>
                        {ele.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={BookAppoint.department}
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

                <div className="form-group">
                  <label>Doctor</label>
                  <select
                    name="doctorID"
                    value={BookAppoint.doctorID || ""}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  >
                    <option value="">Select Doctor</option>
                    <option value="101">Dr. A</option>
                    <option value="102">Dr. B</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={BookAppoint.address}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={BookAppoint.date}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={BookAppoint.time}
                    onChange={HandleAppointment}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="book_formsubmitbutton"
                disabled={Loading}
              >
                {Loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span style={{ marginLeft: '10px' }}>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-calendar-check"></i>
                    <span style={{ marginLeft: '10px' }}>Book Appointment</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book_Appointment;
