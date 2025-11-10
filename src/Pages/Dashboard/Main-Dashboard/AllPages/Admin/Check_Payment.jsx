/*import { Table, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import "./CSS/Payment.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Check_Payment = () => {
  const { data } = useSelector((store) => store.auth);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Id", dataIndex: "_id", key: "Id" },
    { title: "Patient Name", dataIndex: "patientName", key: "Patient Name" },
    { title: "Date", dataIndex: "date", key: "Date" },
    { title: "Checked By", dataIndex: "checkedBy", key: "Checked By" },
    { title: "Report Ref", dataIndex: "reportRef", key: "Report Ref" },
    { title: "Total Cost", dataIndex: "totalCost", key: "Total Cost" },
  ];

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/payments`);
      setPayments(res.data.payments || []);
    } catch (err) {
      message.error("Failed to fetch payments");
    }
    setLoading(false);
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <div className="Payment_Page">
          <h1 style={{ marginBottom: "2rem" }}>All Payments</h1>
          <div className="patientBox">
            {loading ? (
              <Spin />
            ) : (
              <Table
                columns={columns}
                dataSource={payments}
                className="PaymentTable"
                rowKey="_id"
                pagination={{ pageSize: 8 }}
                locale={{ emptyText: "No payments found" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check_Payment;*/