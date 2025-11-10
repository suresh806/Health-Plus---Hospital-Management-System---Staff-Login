import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import { FaAmbulance, FaHospitalUser } from "react-icons/fa";
import { GiNurseFemale } from "react-icons/gi";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { TbReportMedical, TbBed } from "react-icons/tb";
import { MdBedroomChild, MdDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: { user } } = useSelector((state) => state.auth);

  const toggle = () => {
    // Check if window width is greater than 768px before allowing toggle
    if (window.innerWidth > 768) {
      setIsOpen(!isOpen);
    }
  };

  // Close sidebar if window is resized to mobile width
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "250px" : "70px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ opacity: isOpen ? 1 : 0 }} className="logo">
            HMS
          </h1>
          <div className="bars">
            <ImMenu onClick={toggle} />
          </div>
        </div>
        
        <div className="bottomSection">
          {/* Dashboard - Common for all */}
          <Link className="link" to="/dashboard">
            <div className="icon">
              <MdDashboardCustomize className="mainIcon" />
            </div>
            <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
              Dashboard
            </div>
          </Link>

          {/* Nurse Links */}
          {user?.userType === "nurse" && (
            <div className="link-group">
              <Link className="link" to="/nurseprofile">
                <div className="icon">
                  <CgProfile className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Profile
                </div>
              </Link>
              <Link className="link" to="/addpatient">
                <div className="icon">
                  <FaHospitalUser className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Add Patient
                </div>
              </Link>
              <Link className="link" to="/bookappointment">
                <div className="icon">
                  <BsBookmarkPlus className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Appointments
                </div>
              </Link>
              <Link className="link" to="/rooms">
                <div className="icon">
                  <MdBedroomChild className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Beds
                </div>
              </Link>
            </div>
          )}

          {/* Admin Links */}
          {user?.userType === "admin" && (
            <div className="link-group">
              <Link className="link" to="/addoctor">
                <div className="icon">
                  <AiOutlineUserAdd className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Add Doctor
                </div>
              </Link>
              <Link className="link" to="/addnurse">
                <div className="icon">
                  <GiNurseFemale className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Add Nurse
                </div>
              </Link>
              <Link className="link" to="/admin">
                <div className="icon">
                  <RiAdminLine className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Add Admin
                </div>
              </Link>
              <Link className="link" to="/addbeds">
                <div className="icon">
                  <TbBed className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Add Beds
                </div>
              </Link>
              <Link className="link" to="/addambulance">
                <div className="icon">
                  <FaAmbulance className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Add AMBU
                </div>
              </Link>
              <Link className="link" to="/rooms">
                <div className="icon">
                  <MdBedroomChild className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Beds
                </div>
              </Link>
            </div>
          )}

          {/* Doctor Links */}
          {user?.userType === "doctor" && (
            <div className="link-group">
              <Link className="link" to="/doctor/profile">
                <div className="icon">
                  <SlUserFollow className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Profile
                </div>
              </Link>
              <Link className="link" to="/doctor/allreport">
                <div className="icon">
                  <TbReportMedical className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Reports
                </div>
              </Link>
              <Link className="link" to="/doctor/check_appointment">
                <div className="icon">
                  <BsFillBookmarkCheckFill className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Appointments
                </div>
              </Link>
              <Link className="link" to="/doctor/discharge_and_create_slip">
                <div className="icon">
                  <BiDetail className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Discharge & Slip
                </div>
              </Link>
              <Link className="link" to="/rooms">
                <div className="icon">
                  <MdBedroomChild className="mainIcon" />
                </div>
                <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
                  Beds
                </div>
              </Link>
            </div>
          )}

          {/* Logout - Common for all */}
          <Link
            className="link LogOutPath"
            onClick={() => {
              dispatch({ type: "AUTH_LOGOUT" });
            }}
            to="/"
          >
            <div className="icon">
              <FiLogOut className="mainIcon" />
            </div>
            <div style={{ opacity: isOpen ? 1 : 0 }} className="link_text">
              Logout
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;