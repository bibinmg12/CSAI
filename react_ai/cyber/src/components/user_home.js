// import React from 'react';
// import { useNavigate } from 'react-router-dom';


// const UserHome = () => {
//   const navigate = useNavigate();

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
//     <div align="center">
//       <h2>Welcome to User Home</h2>
//       <button onClick={goToProfileUpdate}>Update Profile</button><br /><br />
//       <button onClick={goToDeepFake}>DeepFake</button><br /><br />
//       <button onClick={goToBreacher}>Breacher</button><br /><br />
//       <button onClick={goToPhishingDetector}>Phishing Detection</button><br /><br />
//             <button onClick={goToSpamChecker}>Spam Analyser</button><br /><br />

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default UserHome;

import React from 'react';
import Header from './header';
import Section from './section';
import Footer from './footer';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

<Helmet>
  <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
  <meta httpEquiv="Pragma" content="no-cache" />
  <meta httpEquiv="Expires" content="0" />
</Helmet>

const UserHome = ({ children }) => {
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
  return (
    <>
      <Header />
      <Section />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default UserHome;