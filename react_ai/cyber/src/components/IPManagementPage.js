import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from './admin_footer';
import AdminHeader from './admin_header';
import DataTable from 'react-data-table-component';
import { FaCheckCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const IPManagementPage = () => {
  const [blockedIPs, setBlockedIPs] = useState([]);  // Default is an empty array
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("blocked");
  const [whitelistedIPs, setWhitelistedIPs] = useState([]);
  const fetchBlockedIPs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/blocked-ips/");
      const data = response.data;
      // Check if 'blocked_ips' is an array before setting
      if (Array.isArray(data.blocked_ips)) {
        setBlockedIPs(data.blocked_ips);
      } else {
        setBlockedIPs([]);  // fallback to empty list if not valid
      }
    } catch (err) {
      console.error("Error fetching blocked IPs:", err);
      setBlockedIPs([]);  // fallback to empty list on error
    } finally {
      setLoading(false);
    }
  };
  const handleWhitelist = async (ip) => {
  console.log("Whitelist clicked for:", ip);
  try {
    await axios.post("http://localhost:8000/whitelist-ip/", { ip });
    toast.success(`${ip} has been whitelisted.`);
    fetchBlockedIPs(); // Refresh the list
  } catch (err) {
    console.error("Whitelist error:", err);
    toast.error(`Failed to whitelist ${ip}`);
  }
};
  useEffect(() => {
    fetchBlockedIPs();
  }, []);
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
  const columns = [
  {
    name: "IP Address",
    selector: row => row.ip,
    sortable: true,
  },
  {
    name: "Reason",
    selector: row => row.reason,
    sortable: false,
    grow: 2
  },
  {
    name: "Blocked At",
    selector: row => new Date(row.timestamp).toLocaleString(),
    sortable: true
  },
  {
    name: "Action",
    cell: row => (
      <button
        onClick={() => handleWhitelist(row.ip)}
        style={{
          padding: "6px 12px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }} >
        <FaCheckCircle style={{ marginRight: "5px" }} />
        Whitelist
      </button>
    ),
  },
];
const fetchWhitelistedIPs = async () => {
  try {
    const response = await axios.get("http://localhost:8000/get-whitelisted-ips/");
    const data = response.data;
    if (Array.isArray(data.whitelisted_ips)) {
      setWhitelistedIPs(data.whitelisted_ips);
    } else {
      setWhitelistedIPs([]);
    }
  } catch (err) {
    console.error("Error fetching whitelisted IPs:", err);
    setWhitelistedIPs([]);
  }
};
useEffect(() => {
  if (activeTab === "whitelisted") {
    fetchWhitelistedIPs();
  } else {
    fetchBlockedIPs();
  }
}, [activeTab]);
const whitelistColumns = [
  {
    name: "IP Address",
    selector: row => row.ip,
    sortable: true,
  },
  {
    name: "Reason",
    selector: row => row.reason,
    sortable: false,
    grow: 2
  },
  {
    name: "Whitelisted At",
    selector: row => new Date(row.timestamp).toLocaleString(),
    sortable: true
  },
];
  const grayStyle = { backgroundColor: '#f5f5f5' };
  const cardStyle = { backgroundColor: '#ffffff', borderRadius: '10px' };
      const filteredBlockedIPs = blockedIPs.filter(ip =>
      ip.ip.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredWhitelistedIPs = whitelistedIPs.filter(ip =>
      ip.ip.toLowerCase().includes(searchTerm.toLowerCase())
    );
return (
  <>
    <AdminHeader />
    <button 
  onClick={() => navigate('/admindash')} 
  style={{
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    marginBottom: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}
>
  <FaArrowLeft />
  Back to Admin Home
</button>
    <br></br><br></br><br></br>
    <div style={{ padding: "2rem" }}>
  <h2 style={{ marginBottom: "1rem" }}>🔒 IP Management</h2>
  <div style={{ marginBottom: "1rem" }}>
    <button
      onClick={() => setActiveTab("blocked")}
      style={{
        padding: "8px 16px",
        marginRight: "8px",
        backgroundColor: activeTab === "blocked" ? "#1976d2" : "#e0e0e0",
        color: activeTab === "blocked" ? "white" : "black",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Blocked IPs
    </button>
    <button
      onClick={() => setActiveTab("whitelisted")}
      style={{
        padding: "8px 16px",
        backgroundColor: activeTab === "whitelisted" ? "#1976d2" : "#e0e0e0",
        color: activeTab === "whitelisted" ? "white" : "black",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }} >  Whitelisted IPs </button>
  </div>
  <input
  type="text"
  placeholder="Search IPs..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    padding: "8px",
    marginTop: "10px",
    marginBottom: "16px",
    width: "100%",
    maxWidth: "300px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  }}
/>

  {loading ? (
    <p>Loading...</p>
  ) : activeTab === "blocked" ? (
    <DataTable
      columns={columns}
      data={filteredBlockedIPs}
      pagination
      highlightOnHover
      responsive
      theme="light"
      noDataComponent={<div>No blocked IPs found.</div>}  />
  ) : (
    <DataTable
      columns={whitelistColumns}
      data={filteredWhitelistedIPs}
      pagination
      highlightOnHover
      responsive
      theme="light"
      noDataComponent={<div>No whitelisted IPs found.</div>} />
  )}
</div>
    <ToastContainer position="top-center" />
    <AdminFooter />
  </>
);
};
export default IPManagementPage;
