// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TrafficLogs = () => {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/traffic-logs/')
//       .then(res => setLogs(res.data.logs || []))
//       .catch(err => console.error("Error fetching traffic logs:", err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Traffic Logs</h2>
//       <div className="overflow-x-auto border rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">IP Address</th>
//               <th className="px-4 py-2 text-left">Method</th>
//               <th className="px-4 py-2 text-left">Path</th>
//               <th className="px-4 py-2 text-left">Malicious</th>
//               <th className="px-4 py-2 text-left">Time</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {logs.map((log, index) => (
//               <tr key={index} className={log.is_malicious ? "bg-red-50" : ""}>
//                 <td className="px-4 py-2">{log.ip}</td>
//                 <td className="px-4 py-2">{log.method}</td>
//                 <td className="px-4 py-2 break-all">{log.path}</td>
//                 <td className="px-4 py-2">
//                   {log.is_malicious ? (
//                     <span className="text-red-600 font-semibold">Yes</span>
//                   ) : (
//                     "No"
//                   )}
//                 </td>
//                 <td className="px-4 py-2">
//                   {new Date(log.timestamp).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TrafficLogs;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
// import { FaBug } from 'react-icons/fa';

// const TrafficLogs = () => {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/traffic-logs/')
//       .then(res => setLogs(res.data.logs || []))
//       .catch(err => console.error("Error fetching traffic logs:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2c3e50] p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
//         <FaBug className="text-pink-400 animate-pulse" />
//         Traffic Logs Monitor
//       </h2>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {logs.map((log, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             className={`rounded-2xl shadow-xl p-4 border 
//               ${log.is_malicious ? "bg-red-900/50 border-red-500" : "bg-green-900/40 border-green-500"}
//             `}
//           >
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-semibold text-gray-300">IP: {log.ip}</span>
//               {log.is_malicious ? (
//                 <span className="flex items-center gap-1 text-red-400 font-semibold text-sm">
//                   <ShieldAlert size={16} /> Malicious 🚨
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1 text-green-300 font-semibold text-sm">
//                   <ShieldCheck size={16} /> Safe ✅
//                 </span>
//               )}
//             </div>
//             <div className="text-sm text-gray-200"><strong>Method:</strong> {log.method}</div>
//             <div className="text-sm text-gray-200 break-words mt-1"><strong>Path:</strong> {log.path}</div>
//             <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
//               <Clock size={14} /> {new Date(log.timestamp).toLocaleString()}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {logs.length === 0 && (
//         <p className="text-center text-gray-400 mt-10">No traffic logs found yet 😌</p>
//       )}
//     </div>
//   );
// };

// export default TrafficLogs;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrafficLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/traffic-logs/')
      .then(res => setLogs(res.data.logs || []))
      .catch(err => console.error("Error fetching traffic logs:", err));
  }, []);

  return (
    <div className="traffic-page">
      {/* Embedded CSS */}
      <style>
        {`
          .traffic-page {
            padding: 40px;
            min-height: 100vh;
            background: linear-gradient(135deg, #1e1e2f, #2c3e50);
            color: #fff;
            font-family: 'Segoe UI', sans-serif;
          }

          .traffic-title {
            font-size: 2rem;
            text-align: center;
            margin-bottom: 30px;
            color: #f5f5f5;
          }

          .log-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
          }

          .log-card {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 20px;
            transition: transform 0.3s ease, border 0.3s;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }

          .log-card:hover {
            transform: translateY(-5px);
          }

          .log-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-weight: bold;
          }

          .badge {
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.85rem;
          }

          .safe .badge {
            background-color: #2ecc71;
            color: #fff;
          }

          .malicious .badge {
            background-color: #e74c3c;
            color: #fff;
          }

          .timestamp {
            font-size: 0.85rem;
            color: #ccc;
            margin-top: 10px;
          }

          .no-logs {
            text-align: center;
            font-size: 1.2rem;
            margin-top: 40px;
            color: #aaa;
          }
        `}
      </style>

      <h2 className="traffic-title">🚦 Traffic Logs Monitor</h2>

      <div className="log-grid">
        {logs.map((log, index) => (
          <div key={index} className={`log-card ${log.is_malicious ? 'malicious' : 'safe'}`}>
            <div className="log-header">
              <span>🧠 IP: {log.ip}</span>
              <span className="badge">
                {log.is_malicious ? '🚨 Malicious' : '✅ Safe'}
              </span>
            </div>
            <p><strong>Method:</strong> {log.method}</p>
            <p><strong>Path:</strong> {log.path}</p>
            <p className="timestamp">🕒 {new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {logs.length === 0 && (
        <p className="no-logs">No logs to display 😌</p>
      )}
    </div>
  );
};

export default TrafficLogs;
