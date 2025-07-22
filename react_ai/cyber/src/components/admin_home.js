import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import AdminFooter from './admin_footer';
import AdminHeader from './admin_header';

const AdminHome = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    fetchThreatData();

    // Optional scrollCue init if you use it
    if (window.scrollCue) {
      window.scrollCue.init({
        interval: -200,
        duration: 800,
        percentage: 0.85,
      });
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 100);
    }
  }, []);

  const fetchThreatData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/threats/');
      const data = response.data;

      // For demo: use each threat's timestamp on x-axis; plot them as counts
      const categories = data.map((item) => item.timestamp);
      const seriesData = data.map((_, idx) => idx + 1); // cumulative number of threats

      setChartData({
        series: [
          {
            name: 'Threats Detected',
            data: seriesData,
          },
        ],
        options: {
          chart: {
            type: 'line',
            height: 350,
            zoom: { enabled: false },
          },
          title: {
            text: 'Threat Detections Over Time',
            align: 'center',
            style: { fontSize: '20px' },
          },
          xaxis: {
            categories: categories,
            title: { text: 'Timestamp of Detection' },
            labels: { rotate: -45 },
          },
          yaxis: {
            title: { text: 'Threat Count' },
            min: 0,
          },
          stroke: {
            curve: 'smooth',
          },
          markers: {
            size: 4,
          },
          dataLabels: {
            enabled: false,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching threat data:', error);
    }
  };

  const grayStyle = {
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  };

  const cardStyle = {
    backgroundColor: '#DBD7D2',
  };

  return (
    <>
      <AdminHeader />
      <div className="left-side-bar">
        <div className="brand-logo">
          <a href="/admin-home">
            <img src="/assets/admin/vendors/images/deskapp-logo.svg" alt="Logo" className="dark-logo" />
            <img src="/assets/admin/vendors/images/deskapp-logo-white.svg" alt="Logo" className="light-logo" />
          </a>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <i className="ion-close-round"></i>
          </div>
        </div>
        <div className="menu-block customscroll">
          <div className="sidebar-menu">
            <ul id="accordion-menu">
              <li className="dropdown">
                <a href="/admin-home" className="dropdown-toggle">
                  <span className="micon dw dw-house-1"></span><span className="mtext">Home</span>
                </a>
              </li>
              <li className="dropdown">
                <a href="/view_threats" className="dropdown-toggle">
                  <span className="micon dw dw-browser2"></span><span className="mtext">Attack View</span>
                </a>
              </li>
              <li className="dropdown">
                <a href="/failed-logins" className="dropdown-toggle">
                  <span className="micon dw dw-copy"></span><span className="mtext">Intruder Alert</span>
                </a>
              </li>
              <li className="dropdown">
                <a href="/" className="dropdown-toggle">
                  <span className="micon dw dw-right-arrow1"></span><span className="mtext">Logout</span>
                </a>
              </li>
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
                  Welcome to the Cyber Sentinel AI Admin Dashboard — your command center for monitoring threats,
                  breaches, and suspicious activities. Manage security alerts, analyze logs, and track threats proactively.
                </p>
              </div>
            </div>
          </div>

          <div className="card-box pd-20 mb-30" style={cardStyle}>
            <h4 className="font-20 weight-500 mb-10 text-capitalize">
              Real-time Threat Detections
            </h4>
            <div id="chart">
              {chartData.series.length > 0 ? (
                <ApexCharts options={chartData.options} series={chartData.series} type="line" height={350} />
              ) : (
                <p>Loading threat data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminHome;
