import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { GetAllReports } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "../../GlobalFiles/NewDashboard.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

const AllReport = () => {
  const dispatch = useDispatch();
  const [Report, setReport] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(GetAllReports()).then((res) => {
      setReport(res);
    });
  }, [dispatch]);

  const reportRef = useRef();

  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('AllReports.pdf');
  };

  const filteredReports = Report?.filter((report) =>
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.docDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.docName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="patient-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Patient Reports</h2>
                <p className="dashboard-subtitle">View and manage all patient reports</p>
              </div>
              <button 
                onClick={handleDownloadPDF} 
                className="stat-card" 
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginLeft: 'auto'
                }}
              >
                <FaFilePdf />
                Export PDF
              </button>
            </div>

            <div className="search-bar" style={{
              margin: '20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <AiOutlineSearch size={20} color="#64748b"/>
              <input
                type="text"
                placeholder="Search by patient name, department, or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '14px'
                }}
              />
            </div>

            <div ref={reportRef} className="patient-table" style={{overflow: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr>
                    <th style={{textAlign: 'left'}}>Patient Name</th>
                    <th style={{textAlign: 'left'}}>Department</th>
                    <th style={{textAlign: 'left'}}>Doctor Name</th>
                    <th style={{textAlign: 'left'}}>Patient Mobile</th>
                    <th style={{textAlign: 'left'}}>Age</th>
                    <th style={{textAlign: 'left'}}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports?.map((ele) => {
                    return (
                      <tr key={ele._id || ele.patientName+ele.date}>
                        <td>{ele.patientName}</td>
                        <td>
                          <span className="status-tag" style={{
                            background: 'rgba(26, 115, 232, 0.1)',
                            color: '#1a73e8'
                          }}>
                            {ele.docDepartment}
                          </span>
                        </td>
                        <td>{ele.docName}</td>
                        <td>{ele.patientMobile}</td>
                        <td>{ele.patientAge}</td>
                        <td>{ele.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredReports?.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '32px',
                  color: '#64748b'
                }}>
                  No reports found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReport;
