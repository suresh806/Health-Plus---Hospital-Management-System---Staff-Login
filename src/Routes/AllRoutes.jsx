import React from "react";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Dashboard-Login/DLogin";
import AddBeds from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddBeds";
import AddDoctor from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_Doctor";
import AllReport from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/AllReport";
import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import AddAmbulance from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_Ambulance";
import AddNurse from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_Nurse";
import BedsRooms from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Beds_Rooms";
import AddAdmin from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Add_Admin";
import DoctorProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Doctor_Profile";
import CheckAppointment from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Check_Appointment";
import DischargeAndCreateSlip from "../Pages/Dashboard/Main-Dashboard/AllPages/Doctor/Discharge_and_Create_Slip";
import AddPatient from "../Pages/Dashboard/Main-Dashboard/AllPages/Nurse/Add_Patient";
import BookAppointment from "../Pages/Dashboard/Main-Dashboard/AllPages/Nurse/Book_Appointment";
import NurseProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Nurse/Nurse_Profile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DLogin />} />
      <Route path="/dashboard" element={<FrontPage />} />
      {/* Admin Part */}
      <Route path="/addoctor" element={<AddDoctor />} />
      <Route path="/addambulance" element={<AddAmbulance />} />
      <Route path="/addnurse" element={<AddNurse />} />
      <Route path="/rooms" element={<BedsRooms />} />
      <Route path="/admin" element={<AddAdmin />} />
      
      

      <Route path="/addbeds" element={<AddBeds />} />
      {/* Doctor Part */}
      <Route path="/doctor/profile" element={<DoctorProfile />} />
  <Route path="/doctor/allreport" element={<AllReport />} />
  <Route path="/doctor/check_appointment" element={<CheckAppointment />} />
  <Route path="/doctor/discharge_and_create_slip" element={<DischargeAndCreateSlip />} />
      {/* Nurse Part */}
      <Route path="/addpatient" element={<AddPatient />} />
      <Route path="/bookappointment" element={<BookAppointment />} />
      <Route path="/nurseprofile" element={<NurseProfile />} />
    </Routes>
  );
};

export default AllRoutes;