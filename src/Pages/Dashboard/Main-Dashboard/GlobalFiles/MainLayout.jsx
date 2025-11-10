import React, { useState } from 'react';
import Navbar from '../../../../Components/Navbar/Navbar';
import Sidebar from './Sidebar';
import './CommonCSS.css';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-layout">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content-container">
        <Sidebar isOpen={sidebarOpen} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;