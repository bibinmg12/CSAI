// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminLoginFailures = () => {
//   const [captures, setCaptures] = useState([]);

//   useEffect(() => {
//     const fetchCaptures = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/get_failed_login_images/');
//         setCaptures(res.data);
//       } catch (err) {
//         console.error('Failed to fetch captured data', err);
//       }
//     };

//     fetchCaptures();
//   }, []);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>🚨 Failed Login Attempts</h2>
      
//       {captures.length === 0 ? (
//         <p>No captured login attempts yet.</p>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//           {captures.map((capture, index) => (
//             <div key={index} style={{
//               border: '1px solid #ccc',
//               borderRadius: '12px',
//               padding: '1rem',
//               background: '#f0f0f0',
//               width: '300px'
//             }}>
//               <p><strong>Email:</strong> {capture.email}</p>
//               <p><strong>Time:</strong> {capture.timestamp}</p>
//               <img
//                 src={capture.image.startsWith('data:image') ? capture.image : `data:image/jpeg;base64,${capture.image}`}
//                 alt="Captured"
//                 style={{ maxWidth: '100%', borderRadius: '10px' }}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminLoginFailures;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import useNavigate
import AdminFooter from './admin_footer';
import AdminHeader from './admin_header';
const AdminLoginFailures = () => {
  const [captures, setCaptures] = useState([]);
  const navigate = useNavigate(); // ⬅️ Initialize navigate
  useEffect(() => {
    const fetchCaptures = async () => {
      try {
        const res = await axios.get('http://localhost:8000/get_failed_login_images/');
        setCaptures(res.data);
      } catch (err) {
        console.error('Failed to fetch captured data', err);
      }
    };
    fetchCaptures();
  }, []);
  const handleBlockIP = (ip) => {
    // 🔐 Replace this with your API call to block the IP
    alert(`IP ${ip} blocked!`);
    console.log(`Blocking IP: ${ip}`);
  };
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
  return (
    <>
    <AdminHeader></AdminHeader>
    
    <div style={{ padding: '2rem' }}>
      <h2>🚨 Failed Login Attempts</h2>
      <button 
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
      </button>
      {captures.length === 0 ? (
        <p>No captured login attempts yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {captures.map((capture, index) => (
            <div key={index} style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '1rem',
              background: '#f0f0f0',
              width: '300px'
            }}>
<p style={{ marginBottom: '0.25rem' }}><strong>Email:</strong> {capture.email}</p>
<p style={{ marginBottom: '0.99rem' }}><strong>Time:</strong> {capture.timestamp}</p>
<div 
  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: '0.99rem' 
  }}
>
  <p style={{ margin: 0 }}><strong>IP:</strong> {capture.ip_address}</p>
</div>
<p style={{ marginBottom: '0.99rem' }}><strong>MAC:</strong> {capture.mac_address}</p>
              <img
                src={capture.image.startsWith('data:image') ? capture.image : `data:image/jpeg;base64,${capture.image}`}
                alt="Captured"
                style={{ maxWidth: '100%', borderRadius: '10px' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    <AdminFooter></AdminFooter>
    </>
  );
};

export default AdminLoginFailures;
