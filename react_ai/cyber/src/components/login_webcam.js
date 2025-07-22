import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: 'user',
  };

  const captureImage = () => {
    return webcamRef.current.getScreenshot(); // base64 image
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login/', { email, password });

      if (response.data.success) {
        alert('Login successful');
        setAttempts(0);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      alert(`Attempt ${newAttempts}: Invalid login`);

      if (newAttempts === 3) {
        const image = captureImage();
        if (image) {
          await axios.post('http://localhost:8000/login/capture-image/', {
            email,
            image,
          });
          alert('Captured image due to 3 failed login attempts.');
        } else {
          alert('Webcam not available');
        }
        setAttempts(0); // reset counter after capture
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
      />
      <div style={{ margin: '1rem' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        /><br /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /><br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
