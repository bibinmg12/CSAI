import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import AdminFooter from './admin_footer';
import AdminHeader from './admin_header';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [threatChartData, setThreatChartData] = useState({ series: [], options: {} });
  const [fileChartData, setFileChartData] = useState({ series: [], options: {} });
  const navigate = useNavigate();

  useEffect(() => {
    const links = [
      { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/styles/core.css` },
      { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/styles/icon-font.min.css` },
      { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/styles/style.css` },
    ];
    const createdLinks = links.map(attrs => {
      const link = document.createElement('link');
      Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
      document.head.appendChild(link);
      return link;
    });
    return () => createdLinks.forEach(link => document.head.removeChild(link));
  }, []);

  useEffect(() => {
    fetchThreatData();
    fetchFileSharingData();
  }, []);

  const fetchThreatData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/threats/');
      const data = response.data;

      const categories = data.map(item => item.timestamp);
      const seriesData = data.map((_, idx) => idx + 1); // cumulative threat count

      setThreatChartData({
        series: [{ name: 'Threats Detected', data: seriesData }],
        options: {
          chart: { type: 'line', height: 350, zoom: { enabled: false } },
          title: { text: 'Detected Threats Over Time', align: 'center', style: { fontSize: '20px' } },
          xaxis: { categories, title: { text: 'Detection Timestamp' }, labels: { rotate: -45 } },
          yaxis: { title: { text: 'Threat Count' }, min: 0 },
          stroke: { curve: 'smooth' },
          markers: { size: 4 },
          dataLabels: { enabled: false },
        },
      });
    } catch (error) {
      console.error('Error fetching threat data:', error);
    }
  };

  const fetchFileSharingData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/files/');
      const data = response.data;

      const categories = data.map(item => item.timestamp);
      const seriesData = data.map((_, idx) => idx + 1); // cumulative file uploads

      setFileChartData({
        series: [{ name: 'Files Shared', data: seriesData }],
        options: {
          chart: { type: 'line', height: 350, zoom: { enabled: false } },
          title: { text: 'Files Shared Over Time', align: 'center', style: { fontSize: '20px' } },
          xaxis: { categories, title: { text: 'Upload Timestamp' }, labels: { rotate: -45 } },
          yaxis: { title: { text: 'Files Count' }, min: 0 },
          stroke: { curve: 'smooth' },
          markers: { size: 4 },
          dataLabels: { enabled: false },
        },
      });
    } catch (error) {
      console.error('Error fetching file sharing data:', error);
    }
  };

  const grayStyle = { backgroundColor: '#f5f5f5' };
  const cardStyle = { backgroundColor: '#ffffff', borderRadius: '10px' };

  

  // ✅ Check session on load
  const checkSession = async () => {
    try {
      const res = await axios.get("http://localhost:8000/check-session/", {
        withCredentials: true,
      });
      if (!res.data.valid) {
        navigate("/");
      }
    } catch (err) {
      navigate("/log");
    }
  };

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout/", {}, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      navigate("/"); // fallback
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="left-side-bar">
        <div className="brand-logo">
          <a href="/admin-home">
            <img src="/assets/admin/vendors/images/deskapp-logo.svg" alt="" className="dark-logo" />
            <img src="/assets/admin/vendors/images/deskapp-logo-white.svg" alt="" className="light-logo" />
          </a>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <i className="ion-close-round"></i>
          </div>
        </div>
        <div className="menu-block customscroll">
          <div className="sidebar-menu">
            <ul id="accordion-menu">
              <li className="dropdown"><a href="/view_threats" className="dropdown-toggle no-arrow"><span className="micon dw dw-browser2"></span><span className="mtext">Attack View</span></a></li>
              <li className="dropdown"><a href="/failed-logins" className="dropdown-toggle no-arrow"><span className="micon dw dw-copy"></span><span className="mtext">Intruder Alert</span></a></li>
              {/* <li className="dropdown"><a href="/IP_Sector" className="dropdown-toggle no-arrow"><span className="micon dw dw-browser2"></span><span className="mtext">IP Management</span></a></li> */}
              <li><a onClick={handleLogout} className="dropdown-toggle no-arrow"><span className="micon dw dw-right-arrow1"></span><span className="mtext">Logout</span></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mobile-menu-overlay"></div>

      <div className="main-container" style={grayStyle}>
        <div className="pd-ltr-20">
          <div className="card-box pd-20 height-100-p mb-30" style={cardStyle}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src="/assets/admin/vendors/images/banner-img.png" alt="" />
              </div>
              <div className="col-md-8">
                <h4 className="font-20 weight-500 mb-10 text-capitalize">
                  Welcome back <div className="weight-600 font-30 text-blue">Admin!</div>
                </h4>
                <p className="font-18 max-width-600">
                  Welcome to the Cyber Sentinel AI Dashboard — your command center for monitoring threats, breaches, file activities, and suspicious behavior. Stay proactive and secure.
                </p>
              </div>
            </div>
          </div>

          <div className="card-box pd-20 mb-30" style={cardStyle}>
            <h4 className="font-20 weight-500 mb-10 text-capitalize">
              Real-time Threat Visualization
            </h4>
            <div id="threat-chart">
              {threatChartData.series.length > 0 ? (
                <ApexCharts options={threatChartData.options} series={threatChartData.series} type="line" height={350} />
              ) : (
                <p>Loading threat data...</p>
              )}
            </div>
          </div>

          <div className="card-box pd-20 mb-30" style={cardStyle}>
            <h4 className="font-20 weight-500 mb-10 text-capitalize">
              File Sharing Activity
            </h4>
            <div id="file-chart">
              {fileChartData.series.length > 0 ? (
                <ApexCharts options={fileChartData.options} series={fileChartData.series} type="line" height={350} />
              ) : (
                <p>Loading file sharing data...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <AdminFooter />
    </>
  );
};

export default AdminDashboard;
