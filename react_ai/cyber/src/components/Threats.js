

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Chrono } from "react-chrono";
// import "react-chrono/dist/styles.css";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ClipLoader } from "react-spinners";
import AdminFooter from './admin_footer';
import AdminHeader from './admin_header';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


function Threats() {
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchIP, setSearchIP] = useState("");
  const [filteredTraffic, setFilteredTraffic] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('http://localhost:8000/check-session/', {
          withCredentials: true,
        });
        if (!res.data.valid) {
          navigate('/');
        }
      } catch (err) {
        navigate('/log');
      }
    };
    checkSession();
  }, []);


  useEffect(() => {
  const fetchData = () => {
    axios
      .get("http://localhost:8000/network-traffic/")
      .then((res) => {
        const data = res.data;
        if (JSON.stringify(data) !== JSON.stringify(networkTraffic)) {
          setNetworkTraffic(data);
          if (!searchIP) {
            setFilteredTraffic(data);
          } else {
            setFilteredTraffic(data.filter((item) => item.source_ip.includes(searchIP)));
          }
        }
      })
      .catch((err) => console.error("Network traffic error:", err));

    axios
      .get("http://localhost:8000/system-logs/")
      .then((res) => {
        const data = res.data;
        if (JSON.stringify(data) !== JSON.stringify(systemLogs)) {
          setSystemLogs(data);
        }
      })
      .catch((err) => console.error("System logs error:", err));
  };

  

  

  // Initial fetch only
  fetchData();
  setLoading(false);

  // Polling without triggering flicker
  const interval = setInterval(fetchData, 10000);
  return () => clearInterval(interval);
}, [networkTraffic, systemLogs, searchIP]);


  useEffect(() => {
    console.log("System Logs:", systemLogs);
    setFilteredTraffic(
      searchIP
        ? networkTraffic.filter((item) => item.source_ip.includes(searchIP))
        : networkTraffic
    );
  }, [searchIP, networkTraffic]);

  const networkColumns = [
    { field: "source_ip", headerName: "IP", flex: 1 },
    { field: "method", headerName: "Method", flex: 1 },
    { field: "path", headerName: "URL", flex: 2 },
    {
  field: "threat_detected",
  headerName: "Threat",
  flex: 1,
  renderCell: (params) => (
    <Typography
      sx={{
        color: params.value ? "error.main" : "success.main",
        fontWeight: "bold",
      }}
    >
      {params.value ? "Detected" : "Safe"}
    </Typography>
  ),
},

    { field: "timestamp", headerName: "Time", flex: 2 },
  ];

  const logColors = {
    ERROR: "#f44336",
    WARN: "#ff9800",
    INFO: "#2196f3",
    DEBUG: "#9e9e9e",
  };

  const chartData = [
    {
      name: "GET",
      count: filteredTraffic.filter((item) => item.method === "GET").length,
    },
    {
      name: "POST",
      count: filteredTraffic.filter((item) => item.method === "POST").length,
    },
    {
      name: "PUT",
      count: filteredTraffic.filter((item) => item.method === "PUT").length,
    },
    {
      name: "DELETE",
      count: filteredTraffic.filter((item) => item.method === "DELETE").length,
    },
  ];

  const timelineItems = systemLogs.map((log) => ({
    title: log.timestamp,
    cardTitle: log.level,
    cardSubtitle: log.message,
    cardBgColor: logColors[log.level] || "#607d8b",
  }));
  console.log("Timeline Items:", timelineItems);

  useEffect(() => {
      const links = [
        { rel: 'apple-touch-icon', sizes: '180x180', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/images/apple-touch-icon.png` },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/images/favicon-32x32.png` },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/images/favicon-16x16.png` },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
        { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/styles/core.css` },
        { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/styles/icon-font.min.css` },
        { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/src/plugins/datatables/css/dataTables.bootstrap4.min.css` },
        { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/src/plugins/datatables/css/responsive.bootstrap4.min.css` },
        { rel: 'stylesheet', href: `${process.env.PUBLIC_URL}/assets/admin/vendors/styles/style.css` },
      ];
      const scripts = [
        'assets/admin/vendors/scripts/core.js',
        'assets/admin/vendors/scripts/script.min.js',
        'assets/admin/vendors/scripts/process.js',
        'assets/admin/vendors/scripts/layout-settings.js',
        // 'assets/admin/src/plugins/apexcharts/apexcharts.min.js', // optional, uncomment if needed
        'assets/admin/src/plugins/datatables/js/jquery.dataTables.min.js',
        // 'assets/admin/src/plugins/datatables/js/dataTables.bootstrap4.min.js',
        'assets/admin/src/plugins/datatables/js/dataTables.responsive.min.js',
        'assets/admin/src/plugins/datatables/js/responsive.bootstrap4.min.js',
      ];
      // Add <link> elements
      const createdLinks = links.map(attrs => {
        const link = document.createElement('link');
        Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
        document.head.appendChild(link);
        return link;
      });
  
  
  
      // Add <script> elements
      const createdScripts = scripts.map(src => {
        const script = document.createElement('script');
        script.src = `${process.env.PUBLIC_URL}/${src}`;
        script.async = false; // load in order
        document.body.appendChild(script);
        return script;
      });
      // Cleanup on unmount
      return () => {
        createdLinks.forEach(link => document.head.removeChild(link));
        createdScripts.forEach(script => document.body.removeChild(script));
      };
    }, []);

  return (  <>
  <AdminHeader></AdminHeader>
  
  {/* <button 
        onClick={() => navigate('/admindash')} 
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '1rem',
          cursor: 'pointer'
        }}
      >
        ⬅️ Back to Admin Home
      </button> */}

      <button 
  onClick={() => navigate('/admindash')} 
  style={{
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    marginBottom: '2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}
>
  <FaArrowLeft />
  Back to Admin Home
</button>
  


    <motion.div
      // key={systemLogs.length} // forces animation on update
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h4" gutterBottom>
          Network Threat Dashboard
        </Typography>
        

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 200 }}>
            <ClipLoader size={50} />
          </Box>
        ) : (
          <>
            {/* Summary Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              <Card>
                <CardContent>
                  <Typography>Total Requests</Typography>
                  <Typography variant="h5">{networkTraffic.length}</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography>Unique IPs</Typography>
                  <Typography variant="h5">
                    {[...new Set(networkTraffic.map((i) => i.ip))].length}
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography>Errors</Typography>
                  <Typography variant="h5">
                    {networkTraffic.filter((i) => i.status_code >= 400).length}
                  </Typography>
                </CardContent>
              </Card>
              {/* <Card>
                <CardContent>
                  <Typography>Logs</Typography>
                  <Typography variant="h5">{systemLogs.length}</Typography>
                </CardContent>
              </Card> */}
            </Box>

            {/* Filter */}
            <Box sx={{ my: 3 }}>


              <Autocomplete
                options={[...new Set(networkTraffic.map((item) => item.source_ip))]}
                value={searchIP}
                onChange={(e, val) => setSearchIP(val || "")}
                getOptionLabel={(option) => option} // <-- This tells it each option is just a string
                renderInput={(params) => (
                  <TextField {...params} label="Filter by IP" variant="outlined" />
                )}
              />

            </Box>

            {/* Chart */}
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Data Table */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              Network Traffic
            </Typography>
            <Box sx={{ height: 400 }}>
              <DataGrid
                // rows={filteredTraffic.map((row, index) => ({ id: index, ...row }))}
                rows={filteredTraffic.map((row) => ({id: `${row.timestamp}_${row.ip}`,  ...row,}))}

                columns={networkColumns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                disableRowSelectionOnClick
              />
            </Box>

            {/* System Logs Timeline */}
            {/* <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              System Logs
            </Typography>
            <Box sx={{ height: 500 , minHeight: 300 }}>
              <Chrono
                key={systemLogs.length}
                items={timelineItems}
                mode="VERTICAL"
                theme={{
                  primary: "#1976d2",
                  secondary: "#ffffff",
                  cardBgColor: "#f5f5f5",
                  titleColor: "#000",
                }}
                slideShow
                hideControls
              />
            </Box> */}
          </>
        )}
      </Box>
    </motion.div>
    <AdminFooter></AdminFooter>
    </>
  );
}

export default Threats;
