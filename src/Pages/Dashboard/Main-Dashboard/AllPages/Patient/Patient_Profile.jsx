import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdLocalHospital, MdSick } from "react-icons/md";
import { BsFillTelephoneFill, BsPersonBadge, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdatePatient } from "../../../../../Redux/auth/action";
import docimg from "../../../../../img/profile.png";
import "./CSS/NewProfile.css";

const Patient_Profile = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    patientName: user.patientName,
    age: user.age,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    disease: user.disease,
    mobile: user.mobile,
    DOB: user.DOB,
    address: user.address,
    ID: user._id,
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    dispatch(UpdatePatient(formData, user._id));
    success("Profile updated successfully");
    handleOk();
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="profile-container">
            <div className="profile-header">
              <img 
                src={user?.image || docimg} 
                alt="Profile" 
                className="profile-avatar" 
              />
              <div className="profile-info">
                <h1 className="profile-name">{user?.patientName}</h1>
                <div className="profile-role">Patient at PSR Hospitals</div>
                <button className="edit-button" onClick={showModal}>
                  <AiFillEdit />
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-card">
                <h2 className="card-title">
                  <BsPersonBadge />
                  Personal Information
                </h2>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <BsGenderAmbiguous />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Gender</div>
                      <div className="info-value">{user?.gender || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <MdBloodtype />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Blood Group</div>
                      <div className="info-value">{user?.bloodGroup || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FaBirthdayCake />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Date of Birth</div>
                      <div className="info-value">{user?.DOB || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <BsFillTelephoneFill />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Contact</div>
                      <div className="info-value">{user?.mobile || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-card">
                <h2 className="card-title">
                  <MdLocalHospital />
                  Medical Information
                </h2>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <MdSick />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Current Disease</div>
                      <div className="info-value">{user?.disease || 'None'}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FaRegHospital />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Hospital</div>
                      <div className="info-value">PSR Hospitals</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <BiTime />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Admission Date</div>
                      <div className="info-value">{user?.date ? new Date(user.date).toLocaleDateString() : 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FaMapMarkedAlt />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Location</div>
                      <div className="info-value">{user?.address || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              title="Edit Profile"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" onClick={handleFormSubmit}>
                  Update Profile
                </Button>,
              ]}
            >
              <form className="inputForm">
                <input
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Full Name"
                />
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="Age"
                />
                <select name="gender" onChange={handleFormChange} value={formData.gender}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
                <input
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Blood Group"
                />
                <input
                  name="disease"
                  value={formData.disease}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Current Disease"
                />
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="Mobile Number"
                />
                <input
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleFormChange}
                  type="date"
                  placeholder="Date of Birth"
                />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Address"
                />
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient_Profile;