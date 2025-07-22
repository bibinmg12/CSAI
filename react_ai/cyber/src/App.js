
// import React,{ useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Register from './components/reg_user';
// import Regdisplay from './components/reg_disp';
// import Login from './components/login';
// import UserHome from './components/user_home';
// import UpdateProfile from './components/update_user';
// import Adminhome from './components/admin_home';
// import AdminLoginFailures from './components/login_failure';
// import DeepFake from './components/deepfake';
// import ResultPage from './components/deepfake_results';
// import TrafficLogs from './components/traffic_display';
// import Traffic from './components/log_checking';
// import Threats from './components/Threats';
// import BreachChecker from './components/breacher_home';
// import UploadCSV from './components/UploadCSV';
// import PhishingChecker from './components/PhishingChecker';
// import Navbar from './components/header';
// import Section from './components/section';
// import Footer from './components/footer';
// import Layout from './components/Layout';
// import LoginHS from './components/login_header';
// import AdminHeader from './components/admin_header';
// import SecureFileSharePage from './components/file_sharing';
// import AdminLayout from './components/AdminLayout';
// import DataTableSimple from './components/datatable';
// import InsertBreach from "./components/darkweb_monitoring";
// import IPManagementPage from './components/IPManagementPage';
// import ChatBotComponent from './components/ChatBot';
// import PasswordGenerator from './components/PasswordGenerator';
// import MalwareScanner from './components/MalwareScanner';
// function App() {
//   const [showChatBot, setShowChatBot] = useState(false);
//   const toggleChatBot = () => {
//     setShowChatBot(!showChatBot);
//   };
//   return (
//     <Router>
//       <Routes>
//         <Route path="/log" element={<Login/>}/>
//         <Route path="/user-home" element={<UserHome/>}/>
//         <Route path="/admin-home" element={<Adminhome/>}/>
//         <Route path="/register_user" element={<Register/>}/>
//         <Route path="/reg_disp" element={<Regdisplay/>}/>
//         <Route path="/update-profile" element={<UpdateProfile />} />
//         <Route path="/failed-logins" element={<AdminLoginFailures />} />
//         <Route path="/Deepfake" element={<DeepFake />} />
//         <Route path="/deepfake/result/:resultId" element={<ResultPage />} />
//         <Route path="/traffic-logs" element={<TrafficLogs />} />
//         <Route path="/log_checking" element={<Traffic />} />
//         <Route path="/view_threats" element={<Threats />} />
//         <Route path="/breacher" element={<BreachChecker />} />
//         <Route path="/Spam-finder" element={<UploadCSV/>} />
//         <Route path="/phishingdetection" element={<PhishingChecker/>} />
//         <Route path="/nav" element={<Navbar/>} />
//         <Route path="/section" element={<Section/>} />
//         <Route path="/footer" element={<Footer/>} />
//         <Route path="/layout" element={<Layout/>} />
//         <Route path="/" element={<LoginHS/>} />
//         <Route path="/admh" element={<AdminHeader/>} />
//         <Route path="/filesharing" element={<SecureFileSharePage/>} />
//         <Route path="/admindash" element={<AdminLayout/>} />
//         <Route path="/datatable" element={<DataTableSimple/>} />
//         <Route path="/dark" element={<InsertBreach/>} />
//         <Route path="/IP_Sector" element={<IPManagementPage/>} />
//         <Route path="/chatbot" element={<ChatBotComponent />} />
//         <Route path="/pass-gen" element={<PasswordGenerator />} />
//         <Route path="/malware-detection" element={<MalwareScanner />} />
//       </Routes>
//       <button 
//           onClick={toggleChatBot} 
//           style={{
//             position: 'fixed', 
//             bottom: '20px', 
//             right: '20px', 
//             zIndex: '1000', 
//             backgroundColor: '#0d6efd',
//             color: '#fff',
//             padding: '10px',
//             borderRadius: '50%',
//             cursor: 'pointer',
//             border: 'none',
//             fontSize: '24px',  // Adjust size
//           }}>
//           {/* Chatbot Icon (Font Awesome) */}
//           <i className="fa fa-comment" style={{ fontSize: '30px' }}></i> 
//         </button>
//         {/* {showChatBot && <ChatBotComponent />} */}
//         {<ChatBotComponent />}   
//     </Router>  
//   );
// }
// export default App;




import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Register from './components/reg_user';
import Regdisplay from './components/reg_disp';
import Login from './components/login';
import UserHome from './components/user_home';
import UpdateProfile from './components/update_user';
import Adminhome from './components/admin_home';
import AdminLoginFailures from './components/login_failure';
import DeepFake from './components/deepfake';
import ResultPage from './components/deepfake_results';
import TrafficLogs from './components/traffic_display';
import Traffic from './components/log_checking';
import Threats from './components/Threats';
import BreachChecker from './components/breacher_home';
import UploadCSV from './components/UploadCSV';
import PhishingChecker from './components/PhishingChecker';
import Navbar from './components/header';
import Section from './components/section';
import Footer from './components/footer';
import Layout from './components/Layout';
import LoginHS from './components/login_header';
import AdminHeader from './components/admin_header';
import SecureFileSharePage from './components/file_sharing';
import AdminLayout from './components/AdminLayout';
import DataTableSimple from './components/datatable';
import InsertBreach from './components/darkweb_monitoring';
import IPManagementPage from './components/IPManagementPage';
import ChatBotComponent from './components/ChatBot';
import PasswordGenerator from './components/PasswordGenerator';
import MalwareScanner from './components/MalwareScanner';

import { useNavigate } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const [showChatBot, setShowChatBot] = useState(false);

  // Define paths where chatbot should not appear
  const hideChatBotPaths = [ '/log', '/register_user', '/admin-home', '/admindash','/datatable','/view_threats','/failed-logins','/IP_Sector'
    ,'/update-profile'
  ];

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <>
      <Routes>
        <Route path="/log" element={<Login />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/admin-home" element={<Adminhome />} />
        <Route path="/register_user" element={<Register />} />
        <Route path="/reg_disp" element={<Regdisplay />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/failed-logins" element={<AdminLoginFailures />} />
        <Route path="/Deepfake" element={<DeepFake />} />
        <Route path="/deepfake/result/:resultId" element={<ResultPage />} />
        <Route path="/traffic-logs" element={<TrafficLogs />} />
        <Route path="/log_checking" element={<Traffic />} />
        <Route path="/view_threats" element={<Threats />} />
        <Route path="/breacher" element={<BreachChecker />} />
        <Route path="/Spam-finder" element={<UploadCSV />} />
        <Route path="/phishingdetection" element={<PhishingChecker />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/section" element={<Section />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/" element={<LoginHS />} />
        <Route path="/admh" element={<AdminHeader />} />
        <Route path="/filesharing" element={<SecureFileSharePage />} />
        <Route path="/admindash" element={<AdminLayout />} />
        <Route path="/datatable" element={<DataTableSimple />} />
        <Route path="/dark" element={<InsertBreach />} />
        <Route path="/IP_Sector" element={<IPManagementPage />} />
        <Route path="/chatbot" element={<ChatBotComponent />} />
        <Route path="/pass-gen" element={<PasswordGenerator />} />
        <Route path="/malware-detection" element={<MalwareScanner />} />
      </Routes>

      {/* Chatbot Toggle Button */}
      {!hideChatBotPaths.includes(location.pathname) && (
        <>
          <button
            onClick={toggleChatBot}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: '1000',
              backgroundColor: '#0d6efd',
              color: '#fff',
              padding: '10px',
              borderRadius: '50%',
              cursor: 'pointer',
              border: 'none',
              fontSize: '24px',
            }}
          >
            <i className="fa fa-comment" style={{ fontSize: '30px' }}></i>
          </button>

          {<ChatBotComponent />}
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
