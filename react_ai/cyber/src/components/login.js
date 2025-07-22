// import React,{useState} from "react";

// const Login=()=>{
//     const [formData , setFormData]=useState({
//         email:"",
//         password:"",
//     });

//     const handleChange=(e)=>{
//         setFormData({ ...formData,[e.target.name]:e.target.value});
//     };

//     const handleSubmit = async(e)=>{
//         e.preventDefault();

//         const data = new FormData();

//         data.append("email", formData.email);
//         data.append("password", formData.password);

//         const response= await fetch("http://localhost:8000/login/",{
//             method: "POST",

//             body: data,
//         });

//         const result=await response.json();
//         alert(result.message || result.error);
//         window.location.reload();

//     };

//     return(
       
//         <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         /><br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         /><br />

//         <button type="submit">Login</button>
        
//       </form>
//     </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:8000/login/',
//         { email, password },
//         { withCredentials: true }
//       );

//       const { usertype } = res.data;
//       if (usertype === 'admin') {
//         navigate('/admin-home');
//        } else {
//         navigate('/user-home');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



// import Layout from '../components/Layout';
// import React, { useEffect,useState, useRef } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [attempts, setAttempts] = useState(0);
//   const [deviceId, setDeviceId] = useState('');
//   const [message, setMessage] = useState('');
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();
//   const videoConstraints = {
//     width: 300,
//     height: 200,
//     facingMode: 'user',
//   };
//   useEffect(() => {
//     const loadFingerprint = async () => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       setDeviceId(result.visitorId);
//     };
//     loadFingerprint();
//   }, []);
//   const captureImage = () => {
//     return webcamRef.current.getScreenshot(); // base64 image
//   };
//   const getIPAddress = async () => {
//     try {
//       const res = await axios.get('https://api.ipify.org?format=json');
//       return res.data.ip;
//     } catch {
//       return 'Unavailable';
//     }
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:8000/login/',
//         { email, password },
//         { withCredentials: true }
//       );
//       const { usertype, userId } = res.data;
//       sessionStorage.setItem("userId", userId);
//       sessionStorage.setItem("usertype", usertype);
//       alert('Login successful!');
//       setAttempts(0);
//       if (usertype === 'admin') {
//         navigate('/admin-home');
//       } else {
//         navigate('/user-home');
//       }
//     } catch (error) {
//       const newAttempts = attempts + 1;
//       setAttempts(newAttempts);
//       alert(`Attempt ${newAttempts}: Invalid credentials`);
//       if (newAttempts === 3) {
//         const ip_address = await getIPAddress();
//         const timestamp = new Date().toISOString();
//         const image = captureImage();
//         if (image) {
//           try {
//             await axios.post('http://localhost:8000/login/capture-image/', {
//               email,
//               image,
//               timestamp,
//               ip_address,
//               device_id: deviceId,
//             });
//             alert('Captured image due to 3 failed login attempts.');
//           } catch (err) {
//             console.error('Image capture failed:', err);
//             alert('Image capture failed.');
//           }
//         } else {
//           alert('Webcam not available or permission denied.');
//         }
//         setAttempts(0); // Reset counter
//       }
//     }
//   };
//   return (
//     <Layout>
//     <div style={{ textAlign: 'center', maxWidth: '400px', margin: '50px auto' }}>
//       <h2>Login</h2>
// <Webcam
//   audio={false}
//   ref={webcamRef}
//   screenshotFormat="image/jpeg"
//   videoConstraints={videoConstraints}
//   style={{
//     position: 'absolute',
//     width: '200px',  // Keep a reasonable size so browser doesn't block webcam
//     height: '150px',
//     top: '0',
//     left: '0',
//     opacity: 0.01,   // Almost invisible but still rendered
//     zIndex: -1,
//     pointerEvents: 'none',
//   }}
// />
//       <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <label style={{ width: '80px' }}>Email:</label>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{ flex: 1, padding: '8px' }}
//             />
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <label style={{ width: '80px' }}>Password:</label>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ flex: 1, padding: '8px' }}
//             />
//           </div>

//           <div style={{ textAlign: 'center' }}>
//             <button type="submit" style={{ padding: '10px 20px' }}>
//               Login
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//     </Layout>
//   );
// };

// export default Login;







// import Layout from '../components/Layout';
// import React, { useEffect,useState, useRef } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [attempts, setAttempts] = useState(0);
//   const [deviceId, setDeviceId] = useState('');
//   const [message, setMessage] = useState('');
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();

//   const videoConstraints = {
//     width: 300,
//     height: 200,
//     facingMode: 'user',
//   };
//   useEffect(() => {
//     const loadFingerprint = async () => {
//       const fp = await FingerprintJS.load();
//       const result = await fp.get();
//       setDeviceId(result.visitorId);
//     };
//     loadFingerprint();
//   }, []);
//   const captureImage = () => {
//     return webcamRef.current.getScreenshot(); // base64 image
//   };
//   const getIPAddress = async () => {
//     try {
//       const res = await axios.get('https://api.ipify.org?format=json');
//       return res.data.ip;
//     } catch {
//       return 'Unavailable';
//     }
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:8000/login/',
//         { email, password },
//         { withCredentials: true }
//       );

//       const { usertype, userId } = res.data;

//       // Save to sessionStorage
//       sessionStorage.setItem("userId", userId);
//       sessionStorage.setItem("usertype", usertype);

//       alert('Login successful!');
//       setAttempts(0);

//       if (usertype === 'admin') {
//         navigate('/admin-home');
//       } else {
//         navigate('/user-home');
//       }

//     } catch (error) {
//       const newAttempts = attempts + 1;
//       setAttempts(newAttempts);
//       alert(`Attempt ${newAttempts}: Invalid credentials`);

//       if (newAttempts === 3) {
       
//         const ip_address = await getIPAddress();
//         const timestamp = new Date().toISOString();
//         const image = captureImage();
//         if (image) {
//           try {
//             await axios.post('http://localhost:8000/login/capture-image/', {
//               email,
//               image,
//               timestamp,
//               ip_address,
//               device_id: deviceId,
//             });
//             alert('Captured image due to 3 failed login attempts.');
//           } catch (err) {
//             console.error('Image capture failed:', err);
//             alert('Image capture failed.');
//           }
//         } else {
//           alert('Webcam not available or permission denied.');
//         }
//         setAttempts(0); // Reset counter
//       }
//     }
//   };

//   return (
//     <Layout>
//     <div style={{ textAlign: 'center', maxWidth: '400px', margin: '50px auto' }}>
//       <h2>Login</h2>

//       {/* <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={300}
//         videoConstraints={videoConstraints}
//       /> */}

// <Webcam
//   audio={false}
//   ref={webcamRef}
//   screenshotFormat="image/jpeg"
//   videoConstraints={videoConstraints}
//   style={{
//     position: 'absolute',
//     width: '200px',  // Keep a reasonable size so browser doesn't block webcam
//     height: '150px',
//     top: '0',
//     left: '0',
//     opacity: 0.01,   // Almost invisible but still rendered
//     zIndex: -1,
//     pointerEvents: 'none',
//   }}
// />


// {/* <Webcam
//   audio={false}
//   ref={webcamRef}
//   screenshotFormat="image/jpeg"
//   videoConstraints={{
//     width: 300,
//     height: 200,
//     facingMode: 'user',
//   }}
//   style={{
//     position: 'absolute',
//     width: 1,
//     height: 1,
//     opacity: 0,
//     pointerEvents: 'none',
//   }}
// /> */}

// {/* <Webcam
//   audio={false}
//   muted
//   ref={webcamRef}
//   screenshotFormat="image/jpeg"
//   videoConstraints={{
//     width: 300,
//     height: 200,
//     facingMode: 'user',
//   }}
//   style={{
//     position: 'fixed',
//     top: '500px',
//     left: '400px',
//     width: '300px',
//     height: '200px',
//     opacity: 100,
//   }}
// /> */}





//       <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <label style={{ width: '80px' }}>Email:</label>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{ flex: 1, padding: '8px' }}
//             />
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <label style={{ width: '80px' }}>Password:</label>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ flex: 1, padding: '8px' }}
//             />
//           </div>

//           <div style={{ textAlign: 'center' }}>
//             <button type="submit" style={{ padding: '10px 20px' }}>
//               Login
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//     </Layout>
//   );
// };

// export default Login;





import Layout from '../components/Layout';
import React, { useEffect,useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [deviceId, setDeviceId] = useState('');
  const [message, setMessage] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: 'user',
  };
  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceId(result.visitorId);
    };
    loadFingerprint();

    if (window.scrollCue) {
      window.scrollCue.init({
        interval: -200, // optional: tweaks animation speed between elements
        duration: 800,  // optional: animation duration
        percentage: 0.85 // optional: when to start animating (0 to 1)
      });
      setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
    }

  }, []);

  useEffect(() => {
    if (blocked && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setBlocked(false);
            setMessage('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [blocked, remainingTime]);
  const captureImage = () => {
    return webcamRef.current.getScreenshot(); // base64 image
  };
  const getIPAddress = async () => {
    try {
      const res = await axios.get('https://api.ipify.org?format=json');
      return res.data.ip;
    } catch {
      return 'Unavailable';
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/login/',
        { email, password },
        { withCredentials: true }
      );
      const { usertype, userId } = res.data;
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("usertype", usertype);
      localStorage.setItem("loginid", userId);
      console.log("Login successful, userId:", userId);
      console.log("Stored loginid in localStorage:", localStorage.getItem("loginid"));
      alert('Login successful!');
      setAttempts(0);
      if (usertype === 'admin') {
        navigate('/admindash');
      } else {
        navigate('/user-home');
      }
    } catch (error) {
      if (error.response?.status === 403 && error.response?.data?.error === "IP_BLOCKED") {
    const secondsLeft = error.response.data.remaining_time;
    setBlocked(true);
    setRemainingTime(secondsLeft);
    setMessage('🚫 Your IP has been temporarily blocked. Please wait...');
  } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      alert(`Attempt ${newAttempts}: Invalid credentials`);
      if (newAttempts === 3) {       
        const ip_address = await getIPAddress();
        const timestamp = new Date().toISOString();
        const image = captureImage();
        if (image) {
          try {
            await axios.post('http://localhost:8000/login/capture-image/', {
              email,
              image,
              timestamp,
              ip_address,
              device_id: deviceId,
            });
            alert('Captured image due to 3 failed login attempts.');
          } catch (err) {
            console.error('Image capture failed:', err);
            alert('Image capture failed.');
          }
        } else {
          alert('Webcam not available or permission denied.');
        }
        setAttempts(0); // Reset counter
      }
    }
  }
  };
  return (
      <>
        <div className="login-area ptb-100" style={{ backgroundColor: 'white' }}>
              <div className="page-title-area">
          <div className="container">
            <div className="page-title-content text-center">
              <h1>Log In Now</h1>
              <ul className="list-unstyled ps-0 mb-0">
                <li className="d-inline-block">
                  <a className="text-decoration-none" href="/">Home</a>
                </li>
                <li className="d-inline-block">Log In Now</li>
              </ul>
            </div>
          </div>
        </div>
          <div className="container">
            <div className="login-info" data-cue="slideInUp">
              <h1>Log In Now</h1>
              {blocked && (
              <div
                style={{
                  marginBottom: '15px',
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}  >
                {message}
                <br />
                ⏳ Please wait: {remainingTime}s
              </div>
            )}
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{
                  position: 'absolute',
                  width: '200px',
                  height: '150px',
                  top: '0',
                  left: '0',
                  opacity: 0.01,
                  zIndex: -1,
                  pointerEvents: 'none',
                }}
              />
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="default-btn border-0" type="submit">
                  <i className="ri-arrow-right-line"></i>
                  Log In Now
                </button>
                <p>
                  Don't have an account?{' '}
                  <a className="text-decoration-none" href="/register_user">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
  );
};
export default Login;

// import React  , { useEffect } from 'react';
// const Login = () => {
//    useEffect(() => {
//     if (window.scrollCue) {
//       window.scrollCue.init({
//         interval: -200, // optional: tweaks animation speed between elements
//         duration: 800,  // optional: animation duration
//         percentage: 0.85 // optional: when to start animating (0 to 1)
//       });
//     }
//   }, []);
//   return (
//     <>
//       {/* Start Page Title Area */}
//       <div className="page-title-area">
//         <div className="container">
//           <div className="page-title-content text-center">
//             <h1>Log In Now</h1>
//             <ul className="list-unstyled ps-0 mb-0">
//               <li className="d-inline-block">
//                 <a className="text-decoration-none" href="index.html">Home</a>
//               </li>
//               <li className="d-inline-block">Log In Now</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       {/* End Page Title Area */}

//       {/* Start Login Area */}
// <div className="login-area ptb-100" style={{ backgroundColor: 'white' }}>
//         <div className="container">
//           <div className="login-info" data-cue="slideInUp">
//             <h1>Log In Now</h1>
//             <form>
//               <div className="form-group">
//                 <input type="text" className="form-control" placeholder="Username" />
//               </div>
//               <div className="form-group">
//                 <input type="password" className="form-control" placeholder="Your password" />
//               </div>
//               <div className="form-check">
//                 <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
//                 <label className="form-check-label" htmlFor="flexCheckDefault">
//                   Remember me
//                 </label>
//               </div>
//               <button className="default-btn border-0" type="submit">
//                 <i className="ri-arrow-right-line"></i>
//                 Log In Now
//               </button>
//               <p>Don't have an account? <a className="text-decoration-none" href="login.html">Sign Up</a></p>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* End Login Area */}
//     </>
//   );
// };

// export default Login;






