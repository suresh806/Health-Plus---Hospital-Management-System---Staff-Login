import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../GlobalFiles/Sidebar";
import "./CSS/AdminStyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;
const notify = (text) => toast(text);

const Add_Payment = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    amount: "",
    date: "",
    checkedBy: "",
    reportRef: "",
    totalCost: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/payments/add`, form);
      setForm({
        patientName: "",
        amount: "",
        date: "",
        checkedBy: "",
        reportRef: "",
        totalCost: "",
      });
      if (onSuccess) onSuccess();
      notify("Payment added successfully!");
    } catch (error) {
      notify("Error adding payment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Payment</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={form.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Checked By</label>
                  <input
                    type="text"
                    name="checkedBy"
                    value={form.checkedBy}
                    onChange={handleChange}
                    placeholder="Enter checker's name"
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Report Reference</label>
                  <input
                    type="text"
                    name="reportRef"
                    value={form.reportRef}
                    onChange={handleChange}
                    placeholder="Enter report reference"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Total Cost</label>
                  <input
                    type="number"
                    name="totalCost"
                    value={form.totalCost}
                    onChange={handleChange}
                    placeholder="Enter total cost"
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Payment;