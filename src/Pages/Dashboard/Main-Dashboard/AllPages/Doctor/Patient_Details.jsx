import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import Topbar from "../../GlobalFiles/Topbar";
import { useSelector } from "react-redux";
import "../../GlobalFiles/Dashboard.css";

const Patient_Details = () => {
  const { data } = useSelector((store) => store.auth);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return <></>;
};

export default Patient_Details;
