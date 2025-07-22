// import React ,{ useEffect }  from "react";
// import AdminFooter from './admin_footer';
// import AdminHeader from './admin_header';

// const DataTableSimple = () => {
      
//   return (
//     <>
//     <AdminHeader />
//     <br></br><br></br><br></br><br></br>

//     <div className="card-box mb-30">
      
//       <div className="pb-20">
//         <table className="data-table table stripe hover nowrap">
//           <thead>
//             <tr>
//               <th className="table-plus datatable-nosort">Name</th>
//               <th>Age</th>
//               <th>Office</th>
//               <th>Address</th>
//               <th>Start Date</th>
//               <th className="datatable-nosort">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="table-plus">Gloria F. Mead</td>
//               <td>25</td>
//               <td>Sagittarius</td>
//               <td>2829 Trainer Avenue Peoria, IL 61602 </td>
//               <td>29-03-2018</td>
//               <td>
//                 <div className="dropdown">
//                   <a
//                     className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
//                     href="#"
//                     role="button"
//                     data-toggle="dropdown"
//                   >
//                     <i className="dw dw-more"></i>
//                   </a>
//                   <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
//                     <a className="dropdown-item" href="#">
//                       <i className="dw dw-eye"></i> View
//                     </a>
//                     <a className="dropdown-item" href="#">
//                       <i className="dw dw-edit2"></i> Edit
//                     </a>
//                     <a className="dropdown-item" href="#">
//                       <i className="dw dw-delete-3"></i> Delete
//                     </a>
//                   </div>
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="table-plus">Andrea J. Cagle</td>
//               <td>30</td>
//               <td>Gemini</td>
//               <td>1280 Prospect Valley Road Long Beach, CA 90802 </td>
//               <td>29-03-2018</td>
//               <td>
//                 <div className="dropdown">
//                   <a
//                     className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
//                     href="#"
//                     role="button"
//                     data-toggle="dropdown"
//                   >
//                     <i className="dw dw-more"></i>
//                   </a>
//                   <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
//                     <a className="dropdown-item" href="#">
//                       <i className="dw dw-eye"></i> View
//                     </a>
//                     <a className="dropdown-item" href="#">
//                       <i className="dw dw-edit2"></i> Edit
//                     </a>
//                     <a className="dropdown-item" href="#">
//                       <i className="dw dw-delete-3"></i> Delete
//                     </a>
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//           <AdminFooter />

//     </>
//   );
// };

// export default DataTableSimple;


import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from "./admin_footer";
import AdminHeader from "./admin_header";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';




const DataTableSimple = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8000/reg_disp/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
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
      'assets/admin/src/plugins/datatables/js/jquery.dataTables.min.js',
      // 'assets/admin/src/plugins/datatables/js/dataTables.bootstrap4.min.js',
      // 'assets/admin/src/plugins/datatables/js/dataTables.responsive.min.js',
      // 'assets/admin/src/plugins/datatables/js/responsive.bootstrap4.min.js',
    ];

    const createdLinks = links.map(attrs => {
      const link = document.createElement('link');
      Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
      document.head.appendChild(link);
      return link;
    });

    const createdScripts = scripts.map(src => {
      const script = document.createElement('script');
      script.src = `${process.env.PUBLIC_URL}/${src}`;
      script.async = false;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      createdLinks.forEach(link => document.head.removeChild(link));
      createdScripts.forEach(script => document.body.removeChild(script));
    };
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.contact.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <AdminHeader />
      {/* <div style={{ position: "absolute", top: "30px", left: "75px", zIndex: 1000 }}>
  <button
    onClick={() => window.history.back()}
    style={{
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "30px",
      padding: "10px 20px",
      
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "background 0.3s ease",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
  >
    ⬅ Back
  </button>
</div> */}

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

      <br />
      <br />
      <br />
      <br />

      <div className="card-box mb-30">
        <div className="pd-20">
          <h4 className="text-blue h4">User Table</h4>
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              Search:
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search"
                aria-controls="DataTables_Table_0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="pb-20">
          <table className="data-table table stripe hover nowrap">
            <thead>
              <tr>
                <th className="table-plus datatable-nosort">Name</th>
                <th>Contact No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="table-plus">{user.name}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" align="center">
                    No matching users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminFooter />
    </>
  );
};

export default DataTableSimple;

