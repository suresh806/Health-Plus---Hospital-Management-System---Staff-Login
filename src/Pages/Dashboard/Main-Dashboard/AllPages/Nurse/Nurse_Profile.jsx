import React, { useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { BiTime } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { MdBloodtype, MdOutlineCastForEducation, MdWork } from "react-icons/md";
import { BsFillTelephoneFill, BsPersonBadge, BsGenderAmbiguous } from "react-icons/bs";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateNurse } from "../../../../../Redux/auth/action";
import docimg from "../../../../../img/profile.png";
import "./CSS/NewProfile.css";

const Nurse_Profile = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nurseName: user.nurseName,
    age: user.age,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    education: user.education,
    mobile: user.mobile,
    DOB: user.DOB,
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
    dispatch(UpdateNurse(formData, user._id));
    success("user updated");
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
                <h1 className="profile-name">{user?.nurseName}</h1>
                <div className="profile-role">Nurse at HMS Hospitals</div>
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
                  <MdWork />
                  Professional Information
                </h2>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <MdOutlineCastForEducation />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Education</div>
                      <div className="info-value">{user?.education || 'Not specified'}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <BiTime />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Working Hours</div>
                      <div className="info-value">09:00 AM - 20:00 PM</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FaRegHospital />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Hospital</div>
                      <div className="info-value">HMS Hospitals</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <FaMapMarkedAlt />
                    </div>
                    <div className="info-content">
                      <div className="info-label">Location</div>
                      <div className="info-value">Sankarankovil, Tenkasi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              title="Edit details"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" onClick={handleFormSubmit}>
                  Edit
                </Button>,
              ]}
            >
              <form className="inputForm">
                <input
                  name="nurseName"
                  value={formData.nurseName}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Full name"
                />
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="Age"
                />
                <select name="gender" onChange={handleFormChange} value={formData.gender}>
                  <option value="">Select gender</option>
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
                  name="education"
                  value={formData.education}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="education"
                />
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  type="number"
                  placeholder="mobile"
                />
                <input
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleFormChange}
                  type="date"
                  placeholder="Date of birth"
                />
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nurse_Profile;
