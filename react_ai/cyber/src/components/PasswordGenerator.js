// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import zxcvbn from 'zxcvbn';
// import Header from './header';
// import Footer from './footer';
// function PasswordGenerator() {
//   const [password, setPassword] = useState('');
//   const [length, setLength] = useState(12);
//   const [options, setOptions] = useState({
//     uppercase: true,
//     lowercase: true,
//     digits: true,
//     symbols: true,
//   });
//   const [strengthScore, setStrengthScore] = useState(0);
//   const handleGenerate = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/generate-password/', {
//         length: parseInt(length),
//         ...options,
//       });
//       const generatedPassword = response.data.password;
//       setPassword(generatedPassword);
//       setStrengthScore(zxcvbn(generatedPassword).score);
//     } catch (error) {
//       alert("Error generating password");
//     }
//   };
//   const getStrengthLabel = (score) => {
//     switch (score) {
//       case 0: return 'Very Weak';
//       case 1: return 'Weak';
//       case 2: return 'Fair';
//       case 3: return 'Strong';
//       case 4: return 'Very Strong';
//       default: return '';
//     }
//   };
//   const getStrengthColor = (score) => {
//     return ['#ff4d4f', '#ff7a45', '#ffc53d', '#52c41a', '#237804'][score] || '#d9d9d9';
//   };
//   return (
//     <>
//     <Header></Header>
//     <div className="password-generator" style={{ maxWidth: '400px', margin: '0 auto' }}>
//       <h2>🔐 Password Generator</h2>
//       <label>Password Length:
//         <input
//           type="number"
//           value={length}
//           onChange={(e) => setLength(e.target.value)}
//           min="4"
//           max="64"
//           style={{ marginLeft: '10px', width: '60px' }}    />
//       </label>
//       <div style={{ margin: '10px 0' }}>
//         <label><input type="checkbox" checked={options.uppercase} onChange={() => setOptions({ ...options, uppercase: !options.uppercase })} /> Uppercase</label><br />
//         <label><input type="checkbox" checked={options.lowercase} onChange={() => setOptions({ ...options, lowercase: !options.lowercase })} /> Lowercase</label><br />
//         <label><input type="checkbox" checked={options.digits} onChange={() => setOptions({ ...options, digits: !options.digits })} /> Digits</label><br />
//         <label><input type="checkbox" checked={options.symbols} onChange={() => setOptions({ ...options, symbols: !options.symbols })} /> Symbols</label>
//       </div>
//       <button onClick={handleGenerate} style={{ padding: '6px 12px', marginBottom: '10px' }}>Generate Password</button>
//       {password && (
//         <div className="generated-password">
//           <h3>Generated Password:</h3>
//           <p style={{
//             fontFamily: 'monospace',
//             background: '#f0f0f0',
//             padding: '10px',
//             wordWrap: 'break-word'
//           }}>{password}</p>
//           <div style={{ marginTop: '10px' }}>
//             <strong>Strength:</strong> {getStrengthLabel(strengthScore)}
//             <div style={{
//               height: '10px',
//               background: '#e0e0e0',
//               borderRadius: '5px',
//               marginTop: '4px',
//               overflow: 'hidden'
//             }}>
//               <div style={{
//                 width: `${(strengthScore + 1) * 20}%`,
//                 backgroundColor: getStrengthColor(strengthScore),
//                 height: '100%'
//               }} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
// <Footer></Footer>
//     </>
//   );
// }
// export default PasswordGenerator;

import React, { useState } from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import { motion } from 'framer-motion';
import Header from './header';
import Footer from './footer';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    digits: true,
    symbols: true,
  });
  const [strengthScore, setStrengthScore] = useState(0);

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:8000/generate-password/', {
        length: parseInt(length),
        ...options,
      });
      const generatedPassword = response.data.password;
      setPassword(generatedPassword);
      setStrengthScore(zxcvbn(generatedPassword).score);
      setCopied(false);
    } catch (error) {
    //   alert("Error generating password");
    alert("Select one of the options...");
    }
  };

  const getStrengthLabel = (score) => {
    return ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][score] || '';
  };

  const getStrengthColor = (score) => {
    return ['#ff4d4f', '#ff7a45', '#ffc53d', '#52c41a', '#237804'][score] || '#d9d9d9';
  };

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to bottom right, #1e1e2f, #2a2a40)',
        color: '#e0e0e0',
        padding: '40px 20px',
        boxSizing: 'border-box'
      }}>
        <br /><br /><br /><br /><br /><br />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', background: '#2f2f4f', borderRadius: '16px', boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)' }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>🔐 Password Generator</h2>

          {/* Slider Input for Length */}
          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="length" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Length: {length}</label>
            <input
              id="length"
              type="range"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="4"
              max="64"
              step="1"
              style={{
                width: '100%',
                height: '8px',
                background: '#00ffff',
                borderRadius: '4px',
                appearance: 'none',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {Object.keys(options).map(key => (
              <button
                key={key}
                onClick={() => toggleOption(key)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: '1px solid #00ffff',
                  background: options[key] ? '#00ffff' : 'transparent',
                  color: options[key] ? '#000' : '#00ffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.95 }} onClick={handleGenerate} style={{
            background: '#00ffff',
            color: '#000',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '20px'
          }}>Generate Password</motion.button>

          {password && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#1c1c2c', padding: '12px', borderRadius: '8px', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontFamily: 'monospace', margin: 0, color: '#00ffff', overflowWrap: 'anywhere' }}>{showPassword ? password : '•'.repeat(password.length)}</p>
                <div>
                  <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'transparent', border: 'none', color: '#00ffff', fontSize: '18px', marginRight: '10px' }}>{showPassword ? '👁️' : '🙈'}</button>
                  <button onClick={handleCopy} style={{ background: 'transparent', border: 'none', color: '#00ffff', fontSize: '18px' }}>📋</button>
                </div>
              </div>
              {copied && <span style={{ color: '#00ffcc', fontSize: '14px' }}>✅ Copied to clipboard!</span>}

              <div style={{ marginTop: '16px' }}>
                <strong>Strength: {getStrengthLabel(strengthScore)} {strengthScore >= 3 ? '✅' : '⚠️'}</strong>
                <progress value={strengthScore} max="4" style={{ width: '100%', height: '10px', borderRadius: '5px', backgroundColor: '#3a3a5c', color: getStrengthColor(strengthScore) }}></progress>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default PasswordGenerator;

