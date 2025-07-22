// import React from "react";
// // import "./Header.css"; // optional, if you're using external CSS

// const AdminHeader = () => {
//   return (
//     <div className="header">


//       {/* <div className="header-left">
//         <div className="menu-icon dw dw-menu"></div>
//         <div className="search-toggle-icon dw dw-search2" data-toggle="header_search"></div>
//         <div className="header-search">
//           <form>
//             <div className="form-group mb-0">
//               <i className="dw dw-search2 search-icon"></i>
//               <input type="text" className="form-control search-input" placeholder="Search Here" />
//               <div className="dropdown">
//                 <a className="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
//                   <i className="ion-arrow-down-c"></i>
//                 </a>
//                 <div className="dropdown-menu dropdown-menu-right">
//                   <div className="form-group row">
//                     <label className="col-sm-12 col-md-2 col-form-label">From</label>
//                     <div className="col-sm-12 col-md-10">
//                       <input className="form-control form-control-sm form-control-line" type="text" />
//                     </div>
//                   </div>
//                   <div className="form-group row">
//                     <label className="col-sm-12 col-md-2 col-form-label">To</label>
//                     <div className="col-sm-12 col-md-10">
//                       <input className="form-control form-control-sm form-control-line" type="text" />
//                     </div>
//                   </div>
//                   <div className="form-group row">
//                     <label className="col-sm-12 col-md-2 col-form-label">Subject</label>
//                     <div className="col-sm-12 col-md-10">
//                       <input className="form-control form-control-sm form-control-line" type="text" />
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <button className="btn btn-primary">Search</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div> */}

//       <div className="header-right">


//         <div className="user-info-dropdown">
//           <div className="dropdown">
//             <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
              
//               <span className="user-name">Tables</span>
//             </a>
//             <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
//               {/* <a className="dropdown-item" href="profile.html"><i className="dw dw-user1"></i> Basic Tables</a> */}
//               <a className="dropdown-item" href="/datatable"><i className="dw dw-settings2"></i> Data Tables</a>
//               {/* <a className="dropdown-item" href="faq.html"><i className="dw dw-help"></i> Help</a>
//               <a className="dropdown-item" href="login.html"><i className="dw dw-logout"></i> Log Out</a> */}
//             </div>
//           </div>
//         </div>

//         <div className="user-info-dropdown">
//           <div className="dropdown">
//             <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
              
//               <span className="user-name">Admin</span>
//             </a>
//             <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
//               {/* <a className="dropdown-item" href="profile.html"><i className="dw dw-user1"></i> Profile</a>
//               <a className="dropdown-item" href="profile.html"><i className="dw dw-settings2"></i> Setting</a> */}
//               <a className="dropdown-item" href="/admindash"><i className="dw dw-help"></i> Home</a>
//               <a className="dropdown-item" href="/"><i className="dw dw-logout"></i> Log Out</a>
//             </div>
//           </div>
//         </div>

//         {/* <div className="github-link">
//           <a href="https://github.com/dropways/deskapp" target="_blank" rel="noreferrer">
//             <img src="assets/admin/vendors/images/github.svg" alt="" />
//           </a>
//         </div> */}
//         {/* <div className="logout-link">
//   <a href="login.html" title="Log Out">
//     <img src="assets/admin/vendors/images/logout-icon.svg" alt="Log Out" style={{ width: '24px', height: '24px' }} />
//   </a>
// </div> */}

//       </div>
//     </div>
//   );
// };

// export default AdminHeader;










// import React from "react";
// const AdminHeader = () => {
//   return (
//     <div className="header">
//       <div className="header-right">
//         <div className="user-info-dropdown">
//           <div className="dropdown">
//             <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">            
//               <span className="user-name">Tables</span>
//             </a>
//             <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
//               <a className="dropdown-item" href="/datatable"><i className="dw dw-settings2"></i> Data Tables</a>            
//             </div>
//           </div>
//         </div>
//         <div className="user-info-dropdown">
//           <div className="dropdown">
//             <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">             
//               <span className="user-name">Admin</span>
//             </a>
//             <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
//               <a className="dropdown-item" href="/admindash"><i className="dw dw-help"></i> Home</a>
//               <a className="dropdown-item" href="/"><i className="dw dw-logout"></i> Log Out</a>
//             </div>
//           </div>
//         </div>       
//       </div>
//     </div>
//   );
// };
// export default AdminHeader;









import React, { useEffect } from "react";
import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHeader = () => {
  const navigate = useNavigate();

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
    <div className="header d-flex justify-content-between align-items-center px-3">
      {/* 👋 Welcome Text with Icon */}
      <div className="welcome-admin d-flex align-items-center">
        <span className="admin-icon">👨‍💻</span>
        <h4 className="welcome-text">Where Detection Meets Decision</h4>
      </div>

      {/* Right Menu */}
      <div className="header-right d-flex">
        <div className="user-info-dropdown me-3">
          <div className="dropdown">
            <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
              <span className="user-name">Tables</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <a className="dropdown-item" href="/datatable">
                <i className="dw dw-settings2"></i> Data Tables
              </a>
            </div>
          </div>
        </div>

        <div className="user-info-dropdown">
          <div className="dropdown">
            <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown">
              <span className="user-name">Admin</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <a className="dropdown-item" href="/admindash">
                <i className="dw dw-help"></i> Home
              </a>
              <button className="dropdown-item" onClick={handleLogout}>
                <i className="dw dw-logout"></i> Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;


