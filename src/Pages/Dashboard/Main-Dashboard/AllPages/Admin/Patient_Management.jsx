import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../GlobalFiles/Dashboard.css";
import "./CSS/AdminStyles.css";

const API_URL = process.env.REACT_APP_API_URL;

const Patient_Management = () => {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await axios.get(`${API_URL}/patients`);
    setPatients(res.data.patients || []);
  };

  const handleEdit = (patient) => {
    setEditPatient(patient._id);
    setForm(patient);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await axios.delete(`${API_URL}/patients/${id}`);
      fetchPatients();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.patch(`${API_URL}/patients/${editPatient}`, form);
    setEditPatient(null);
    fetchPatients();
  };

  return (
    <div className="container">
      <div className="AfterSideBar">
        <div className="Main_Add_Doctor_div">
          <h1>Patient Management</h1>
          <div className="table-container">
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Patient ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) =>
                  editPatient === p._id ? (
                    <tr key={p._id}>
                      <td>
                        <input
                          name="patientName"
                          value={form.patientName || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          name="email"
                          value={form.email || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>{p.patientID}</td>
                      <td className="action-buttons">
                        <button onClick={handleUpdate} className="btn-save">Save</button>
                        <button onClick={() => setEditPatient(null)} className="btn-cancel">Cancel</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={p._id}>
                      <td>{p.patientName}</td>
                      <td>{p.email}</td>
                      <td>{p.patientID}</td>
                      <td className="action-buttons">
                        <button onClick={() => handleEdit(p)} className="btn-edit">Edit</button>
                        <button onClick={() => handleDelete(p._id)} className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient_Management;