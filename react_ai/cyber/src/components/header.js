// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate(); // ✅ must be inside component

 
//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate('/');
//   };

  

//   const goToProfileUpdate = () => {
//     const userId = sessionStorage.getItem("userId");
//     navigate(`/update-profile`);
//   };

//   const goToDeepFake = () => {
//     navigate('/Deepfake');
//   };

//    const goToUserhome = () => {
//     navigate('/user-home');
//   };

//     const goToUserReg = () => {
//     navigate('/register_user');
//   };

//   const goToSpamChecker = () => {
//     navigate('/Spam-finder');
//   };
//   const goToBreacher = () => {
//     navigate('/breacher');
//   };
//   const goToPhishingDetector = () => {
//     navigate('/phishingdetection');
//   };

//   return (
    
//     <>
//       {/* Start Navbar Area Header */}
//       <div className="navbar-area style-2">
//         <div className="mobile-responsive-nav">
//           <div className="container">
//             <div className="mobile-responsive-menu">
//               <div className="logo">
//                 <a href="/user-home">
//                   {/* <img src="assets/images/white-logo.png" className="main-logo" alt="logo" /> */}
//                   <img src={`${process.env.PUBLIC_URL}/assets/images/white-logo.png`} alt="logo" />

//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="desktop-nav style-2">
//           <div className="container-fluid">
//             <nav className="navbar navbar-expand-md navbar-light">
//               <a className="navbar-brand me-0" href="/user-home">
//                 <img src="assets/user/images/white-logo.png" className="black-logo" alt="logo" />
//                 {/* <img src="assets/user/images/f2n1.png" className="black-logo" alt="logo" /> */}

//               </a>

//               <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
//                 <ul className="navbar-nav m-auto">
//                   <li className="nav-item">
//                    <Link to="/user-home" className="nav-link">
//                     {/* <Link to="/Deepfake" className="nav-link dropdown-toggle"> */}
//                       Home
//                     </Link>
//                     {/* <ul className="dropdown-menu">
//                       <li className="nav-item">
//                         <a href="index.html" className="nav-link">Home 01</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="index-2.html" className="nav-link">Home 02</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="index-3.html" className="nav-link">Home 03</a>
//                       </li>
//                     </ul> */}
//                   </li>

//                   <li className="nav-item">
//                       <Link to="/phishingdetection" className="nav-link ">
//                       Phishing Checker
//                     </Link>
//                     {/* <a href="about.html" className="nav-link">About</a> */}
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/filesharing" className="nav-link ">
//                       File Sharing
//                     </Link>
//                   </li>

//                   {/* <li className="nav-item">
//                     <a href="#" className="nav-link dropdown-toggle">
//                       Services
//                     </a>
//                     <ul className="dropdown-menu">
//                       <li className="nav-item">
//                         <a href="services.html" className="nav-link">Services</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="service-details.html" className="nav-link">Services Details</a>
//                       </li>
//                     </ul>
//                   </li> */}

//                   <li className="nav-item">
//                     <a href="#" className="nav-link dropdown-toggle">
//                       Tools
//                     </a>
//                     <ul className="dropdown-menu">
//                       <li className="nav-item">
//                           <Link to="/Spam-finder" className="nav-link">
//                       Spam Checker
//                     </Link>
//                         {/* <a href="faq.html" className="nav-link">FAQ</a> */}
//                       </li>
//                       <li className="nav-item">
//                       <Link to="/breacher" className="nav-link">
//                       Email Breach Tools
//                       </Link>
//                       </li>
//                       {/* <li className="nav-item">
//                       <Link to="/dark" className="nav-link">
//                       Dark Web Analytics
//                       </Link>
//                       </li> */}
//                       {/* <li className="nav-item">
//                         <a href="pricing.html" className="nav-link">Pricing</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="login.html" className="nav-link">Log in</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="register.html" className="nav-link">Register</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="search-result.html" className="nav-link">Search Result</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="testimonials.html" className="nav-link">Testimonials</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="privacy-policy.html" className="nav-link">Privacy Policy</a>
//                       </li>
//                       <li className="nav-item">
//                         <a href="terms-conditions.html" className="nav-link">Terms & Conditions</a>
//                       </li> */}
//                     </ul>
//                   </li>

//                   <li className="nav-item">
//                     <a href="#" className="nav-link dropdown-toggle">
//                       Service
//                     </a>
//                     <ul className="dropdown-menu">
//                       <li className="nav-item">
//                         <Link to="/" className="nav-link">
//                       Logout
//                     </Link>
                        
//                         {/* <a href="blog.html" className="nav-link">Blog</a> */}
//                       </li>
//                       <li className="nav-item">
//                         <Link to="/update-profile" className="nav-link">
//                       Update Profile
//                     </Link>

//                         {/* <a href="blog-details.html" className="nav-link">Blog Details</a> */}
//                       </li>
//                     </ul>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/Deepfake" className="nav-link">
//                       Deepfake
//                     </Link>
                    
//                     {/* <a href="\react_ai\cyber\src\components\about.html" className="nav-link">About</a> */}
//                   </li>
//                 </ul>

//                 <div className="others-options">
//                   <ul>
//                     {/* <li>
//                       <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                         <i className="ri-search-line"></i>
//                       </button>
//                     </li> */}
//                     <li>
//                       <Link to="/" className="default-btn text-decoration-none">
//                       <i className="ri-arrow-right-line"></i>
//                       Logout
//                     </Link>

//                       {/* <a className="default-btn text-decoration-none" href="contact.html">
//                         <i className="ri-arrow-right-line"></i>
//                         Get A Quote
//                       </a> */}
//                       <a className="quote d-none text-decoration-none" href="contact.html">
//                         <i className="ri-chat-quote-line"></i>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </div>

//         <div className="others-option-for-responsive">
//           <div className="container">
//             <div className="dot-menu">
//               <div className="inner">
//                 <div className="circle circle-one"></div>
//                 <div className="circle circle-two"></div>
//                 <div className="circle circle-three"></div>
//               </div>
//             </div>

//             <div className="container">
//               <div className="option-inner">
//                 <div className="others-options justify-content-center d-flex align-items-center">
//                   <ul>
//                     <li>
//                       <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                         <i className="ri-search-2-line"></i>
//                       </button>
//                     </li>
//                     <li>
//                       <a className="quote text-decoration-none" href="contact.html">
//                         <i className="ri-chat-quote-line"></i>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//       {/* End Navbar Area Header */}
//     </>
//   );
// };

// export default Navbar;




import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./nag.css";

import { Helmet } from 'react-helmet';
<Helmet>
  <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
  <meta httpEquiv="Pragma" content="no-cache" />
  <meta httpEquiv="Expires" content="0" />
</Helmet>
const Navbar = () => {
  const navigate = useNavigate(); // ✅ must be inside component
  const [username, setUsername] = useState("");
  useEffect(() => {
  const fetchUsername = async () => {
    try {
      const res = await axios.get("http://localhost:8000/check-session/", {
        withCredentials: true
      });
      if (res.data.valid) {
        setUsername(res.data.username); // set email or name from session
      } else {
        navigate('/'); // if not logged in, redirect
      }
    } catch (err) {
      console.error("Session check failed", err);
      navigate('/');
    }
  };

  fetchUsername();
}, []);

  const handleLogout = async () => {
    try {
      // Step 1: Call Django logout API
      await axios.post('http://localhost:8000/logout/', {}, { withCredentials: true });

      // Step 2: Clear frontend storage
      sessionStorage.clear();
      localStorage.clear();

      // Step 3: Navigate to login
      navigate('/');

      // Step 4 (Optional): Prevent back button access to protected content
      window.location.reload(); // Clears history cache
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Something went wrong during logout.");
    }
  };
  const goToProfileUpdate = () => {
    const userId = sessionStorage.getItem("userId");
    navigate(`/update-profile`);
  };
  const goToDeepFake = () => {
    navigate('/Deepfake');
  };
   const goToUserhome = () => {
    navigate('/user-home');
  };
    const goToUserReg = () => {
    navigate('/register_user');
  };
  const goToSpamChecker = () => {
    navigate('/Spam-finder');
  };
  const goToBreacher = () => {
    navigate('/breacher');
  };
  const goToPhishingDetector = () => {
    navigate('/phishingdetection');
  };
  return (
    <>
      <div className="navbar-area style-2">
        <div className="mobile-responsive-nav">
          <div className="container">
            <div className="mobile-responsive-menu">
              <div className="logo">
                <a href="/user-home">
                  <img src={`${process.env.PUBLIC_URL}/assets/images/white-logo.png`} alt="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="desktop-nav style-2">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light">
              {/* <a className="navbar-brand me-0" href="/user-home">
              <span className="text-white fw-bold me-3">Welcome, {username}</span> */}

                {/* <img src="assets/user/images/white-logo.png" className="black-logo" alt="logo" /> */}
              {/* </a> */}

              <a className="navbar-brand me-0 d-flex align-items-center" href="/user-home">
                <div className="welcome-box">
                  <span className="wave-icon">👋</span>
                  <span className="welcome-text">Welcome, <strong>{username}</strong></span>
                </div>
              </a>

              <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                   <Link to="/user-home" className="nav-link">
                      Home
                    </Link>                  
                  </li>
                  <li className="nav-item">
                      <Link to="/phishingdetection" className="nav-link ">
                      Phishing Checker
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/filesharing" className="nav-link ">
                      File Sharing
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle">
                      Tools
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                          <Link to="/Spam-finder" className="nav-link">
                      Spam Checker
                    </Link>
                      </li>
                      <li className="nav-item">
                      <Link to="/breacher" className="nav-link">
                      Email Breach Tools
                      </Link>
                      </li>    
                      <li className="nav-item">
                      <Link to="/malware-detection" className="nav-link">
                      Malware Detector
                      </Link>
                      </li>             
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link dropdown-toggle">
                      Service
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/pass-gen" className="nav-link">
                      Password Generator
                    </Link>                      
                   
                      </li>
                      <li className="nav-item">
                        <Link to="/update-profile" className="nav-link">
                      Update Profile
                    </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/Deepfake" className="nav-link">
                      Deepfake
                    </Link>                    
                  </li>
                </ul>
                <div className="others-options">
                  <ul>                
                    <li>
                     <button
  onClick={handleLogout}
  className="default-btn text-decoration-none border-0 bg-transparent"
>
  <i className="ri-arrow-right-line"></i>
  Logout
</button>                  
                      <a className="quote d-none text-decoration-none" href="contact.html">
                        <i className="ri-chat-quote-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="others-option-for-responsive">
          <div className="container">
            <div className="dot-menu">
              <div className="inner">
                <div className="circle circle-one"></div>
                <div className="circle circle-two"></div>
                <div className="circle circle-three"></div>
              </div>
            </div>
            <div className="container">
              <div className="option-inner">
                <div className="others-options justify-content-center d-flex align-items-center">
                  <ul>
                    <li>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="ri-search-2-line"></i>
                      </button>
                    </li>
                    <li>
                      <a className="quote text-decoration-none" href="contact.html">
                        <i className="ri-chat-quote-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
