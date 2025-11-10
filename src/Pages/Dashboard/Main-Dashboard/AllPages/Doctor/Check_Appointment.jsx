import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Spin, message, Input, Tag } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import axios from "axios";
import "../../GlobalFiles/NewDashboard.css";
import "./CSS/Check_Appointment.css";
import { AiOutlineSearch, AiOutlineCalendar } from "react-icons/ai";
import { FaUserInjured } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

const API_URL = process.env.REACT_APP_API_URL;

const Check_Appointment = () => {
  const { data } = useSelector((store) => store.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Get doctorID from logged-in user
  const doctorID = data?.user?._id;

  // Fetch appointments for this doctor
  const fetchAppointments = useCallback(async () => {
    if (!doctorID) {
      message.error("Doctor ID not found. Please try logging in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/appointments`, {
        params: { doctorID: doctorID }
      });
      
      if (!res.data) {
        throw new Error('No data received from server');
      }
      
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      message.error(
        err.response?.data?.error || 
        err.message || 
        "Failed to fetch appointments"
      );
    } finally {
      setLoading(false);
    }
  }, [doctorID]);

  useEffect(() => {
    if (doctorID) fetchAppointments();
  }, [doctorID, fetchAppointments]);

  // Complete appointment
  const handleComplete = async (id) => {
    if (!doctorID) {
      message.error("Doctor ID not found. Please try logging in again.");
      return;
    }

    try {
      await axios.patch(`${API_URL}/appointments/${id}`, { 
        doctorID: doctorID,
        status: 'completed'
      });
      message.success("Appointment marked as completed");
      fetchAppointments();
    } catch (err) {
      console.error('Failed to complete appointment:', err);
      message.error(
        err.response?.data?.error || 
        err.message || 
        "Failed to complete appointment"
      );
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`);
      message.success("Appointment cancelled");
      fetchAppointments();
    } catch (err) {
      message.error("Failed to cancel appointment");
    }
  };

  // Filter appointments based on search
  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patientName?.toLowerCase().includes(searchText.toLowerCase()) ||
      apt.disease?.toLowerCase().includes(searchText.toLowerCase()) ||
      apt.department?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    { 
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaUserInjured style={{ color: '#1a73e8' }} />
          <span>{text}</span>
        </div>
      )
    },
    { 
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (text) => <span className="text-secondary">{text}</span>
    },
    {
      title: "Disease",
      dataIndex: "disease",
      key: "disease",
      render: (text) => (
        <Tag color="red" style={{ borderRadius: '12px', padding: '4px 12px' }}>
          {text}
        </Tag>
      )
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text) => (
        <Tag color="blue" style={{ borderRadius: '12px', padding: '4px 12px' }}>
          {text}
        </Tag>
      )
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AiOutlineCalendar style={{ color: '#64748b' }} />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="primary"
            style={{ 
              background: '#10b981',
              borderColor: '#10b981'
            }}
            onClick={() => handleComplete(record._id)}
          >
            Complete
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record._id)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  // Auth checks
  if (data?.isAuthticated === false) {
    return <Navigate to="/" />;
  }
  if (data?.user.userType !== "doctor") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <div className="patient-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Appointments</h2>
              <p className="dashboard-subtitle">Manage your patient appointments</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <span className="stat-value">{appointments.length}</span>
                  <span className="stat-label">Total Appointments</span>
                </div>
                <div className="stat-icon blue">
                  <AiOutlineCalendar size={24} />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <span className="stat-value">
                    {appointments.filter(apt => !apt.completed).length}
                  </span>
                  <span className="stat-label">Pending</span>
                </div>
                <div className="stat-icon orange">
                  <BiTime size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="search-bar">
            <AiOutlineSearch size={20} color="#64748b"/>
            <Input
              placeholder="Search by patient name, disease, or department..."
              variant="borderless"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="patient-table">
            {loading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '40px' 
              }}>
                <Spin size="large" />
              </div>
            ) : (
              <Table
                dataSource={filteredAppointments}
                columns={columns}
                rowKey="_id"
                pagination={{ 
                  pageSize: 8,
                  style: { margin: '20px 0' }
                }}
                locale={{ 
                  emptyText: "No appointments found" 
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check_Appointment;