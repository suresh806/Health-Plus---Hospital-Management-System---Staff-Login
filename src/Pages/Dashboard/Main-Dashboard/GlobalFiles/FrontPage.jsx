import { Table } from "antd";
import React, { useEffect } from "react";
import { MdPersonAdd, MdOutlineAssignment } from "react-icons/md";
import { FaUserNurse, FaBed, FaAmbulance } from "react-icons/fa";
import { RiEmpathizeLine, RiAdminLine } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients, GetBeds } from "../../../../Redux/Datas/action";
import "./NewDashboard.css";

const FrontPage = () => {
  const dispatch = useDispatch();
  const { beds, dashboard } = useSelector((store) => store.data);

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
    dispatch(GetBeds());
  }, [dispatch]);

  const statsData = [
    {
      title: "Total Doctors",
      value: dashboard?.data?.doctor || 0,
      icon: <MdPersonAdd />,
      color: "blue"
    },
    {
      title: "Total Nurses",
      value: dashboard?.data?.nurse || 0,
      icon: <FaUserNurse />,
      color: "green"
    },
    {
      title: "Total Patients",
      value: dashboard?.data?.patient || 0,
      icon: <RiEmpathizeLine />,
      color: "purple"
    },
    {
      title: "Available Beds",
      value: dashboard?.data?.bed || 0,
      icon: <FaBed />,
      color: "orange"
    },
    {
      title: "Ambulances",
      value: dashboard?.data?.ambulance || 0,
      icon: <FaAmbulance />,
      color: "red"
    },
    {
      title: "Appointments",
      value: dashboard?.data?.appointment || 0,
      icon: <BsFillBookmarkCheckFill />,
      color: "teal"
    },
    {
      title: "Admins",
      value: dashboard?.data?.admin || 0,
      icon: <RiAdminLine />,
      color: "indigo"
    },
    {
      title: "Reports",
      value: dashboard?.data?.report || 0,
      icon: <MdOutlineAssignment />,
      color: "cyan"
    }
  ];

  const admittedPatients = beds
    .filter(bed => bed.patientID)
    .map(bed => ({
      patientName: bed.patientID.patientName,
      age: bed.patientID.age,
      disease: bed.patientID.disease,
      bloodGroup: bed.patientID.bloodGroup,
      department: bed.patientID.department, // Show department from patient details
      email: bed.patientID.email,
      roomNumber: bed.roomNumber,
      bedNumber: bed.bedNumber,
    }));

  const columns = [
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" }, // Add department column
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Room no", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Bed no", dataIndex: "bedNumber", key: "bedNumber" },
  ];

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Hospital Overview</h1>
          <p className="dashboard-subtitle">Welcome back to your dashboard</p>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.title}</span>
              </div>
              <div className={`stat-icon ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="patient-section">
          <div className="section-header">
            <h2 className="section-title">Recent Patients</h2>
          </div>
          <Table 
            columns={columns} 
            dataSource={admittedPatients}
            pagination={{ pageSize: 5 }}
            className="patient-table"
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;