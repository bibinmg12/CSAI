// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function ResultPage() {
//   const { resultId } = useParams();
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:8000/results/${resultId}/`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Result not found");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setResult(data);
//         setError(''); // Reset error if data is fetched successfully
//       })
//       .catch((err) => {
//         console.error("Failed to fetch result:", err);
//         setError('Failed to load result. Please try again later.');
//       });
//   }, [resultId]);

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   if (!result) {
//     return <div>Loading...</div>;
//   }

//   // Ensure that faces_detected is defined and is an array before accessing its length
//   const facesDetectedCount = result.faces_detected ? result.faces_detected.length : 0;

//   return (
//     <div className="result-container">
//       <h2>Analysis Result</h2>
//       <p><strong>Filename:</strong> {result.filename}</p>
//       <p><strong>Antivirus:</strong> {result.antivirus}</p>
//       <p><strong>Faces Detected:</strong> {result.face_detection}</p>
//       <p><strong>Deepfake Prediction:</strong> {JSON.stringify(result.deepfake)}</p>
//       <p><strong>GAN Trace:</strong> {result.gan}</p>
//       <p><strong>Danger Score:</strong> {result.danger_score}</p>
//       <p><strong>Metadata:</strong></p>
//       <pre>{JSON.stringify(result.metadata, null, 2)}</pre>
//     </div>
//   );
// }

// export default ResultPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function ResultPage() {
//   const { resultId } = useParams();
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:8000/results/${resultId}/`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Result not found");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setResult(data);
//         setError('');
//       })
//       .catch((err) => {
//         console.error("Failed to fetch result:", err);
//         setError('Failed to load result. Please try again later.');
//       });
//   }, [resultId]);

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   if (!result) {
//     return <div>Loading...</div>;
//   }

//   const facesDetectedCount = result.faces_detected ? result.faces_detected.length : 0;

//   return (
//     <div className="result-container">
//       <h2>Analysis Result</h2>
//       <p><strong>Filename:</strong> {result.filename}</p>

//       <p><strong>Antivirus:</strong></p>
//       <pre>{JSON.stringify(result.antivirus, null, 2)}</pre>

//       <p><strong>Faces Detected:</strong> {facesDetectedCount}</p>

//       <p><strong>Deepfake Prediction:</strong></p>
//       <pre>{JSON.stringify(result.deepfake, null, 2)}</pre>

//       <p><strong>GAN Trace:</strong></p>
//       <pre>{JSON.stringify(result.gan, null, 2)}</pre>

//       {/* <p><strong>Danger Score:</strong> {result.danger_score}</p> */}
//       <p><strong>Danger Score:</strong> {result.danger_score.danger_score}</p>
//       <p><strong>Risk Level:</strong> {result.danger_score.risk_level}</p>
//       <p><strong>Reasons:</strong></p>
//       <ul>
//         {result.danger_score.reasons && result.danger_score.reasons.map((reason, index) => (
//           <li key={index}>{reason}</li>
//         ))}
//       </ul>
//       <p><strong>Flags:</strong></p>
//       <ul>
//         {result.danger_score.flags && result.danger_score.flags.map((flag, index) => (
//           <li key={index}>{flag}</li>
//         ))}
//       </ul>

//       <p><strong>Metadata:</strong></p>
//       <pre>{JSON.stringify(result.metadata, null, 2)}</pre>
//     </div>
//   );
// }

// export default ResultPage;

import Layout from '../components/Layout';
import Header from '../components/header';
import Footer from '../components/footer';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function ResultPage() {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    // fetch(`http://localhost:8001/get-analysis-result/{result_id}`)
    fetch(`http://localhost:8001/get-analysis-result/${resultId}`)

      .then((res) => {
        if (!res.ok) {
          throw new Error("Result not found");
        }
        return res.json();
      })
      .then((data) => {
        setResult(data);
        setError('');
      })
      .catch((err) => {
        console.error("Failed to fetch result:", err);
        setError('Failed to load result. Please try again later.');
      });
  }, [resultId]);
  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }
  if (!result) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }
  const facesDetectedCount = result.faces_detected ? result.faces_detected.length : 0;
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(result.filename);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(result.filename);
  // const mediaUrl = `http://localhost:8000/media/${result.filename}`;
  const mediaUrl = `http://localhost:8000/mediam/${result.filename}`;
  return (
    <>
    <Header></Header>
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        Analysis Result
      </h2>
      <div style={{ marginBottom: '20px' }}>
        <strong>Filename:</strong> {result.filename}
      </div>
      {/* Media Preview */}
      {/* {isImage && <img src={mediaUrl} alt="Uploaded Media" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '20px' }} />} */}
      {isImage && (
  <img
    src={mediaUrl}
    alt="Uploaded Media"
    style={{
      maxWidth: "100%",
      borderRadius: "8px",
      marginBottom: "20px"
    }}
  />
)}

      {isVideo && (
        <video controls style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div style={sectionStyle}>
        <h3 style={titleStyle}>Antivirus Result</h3>
        <pre style={preStyle}>{JSON.stringify(result.antivirus, null, 2)}</pre>
      </div>
      <div style={sectionStyle}>
        <h3 style={titleStyle}>Deepfake Prediction</h3>
        <pre style={preStyle}>{JSON.stringify(result.deepfake, null, 2)}</pre>
      </div>
      <div style={sectionStyle}>
        <h3 style={titleStyle}>GAN Trace</h3>
        <pre style={preStyle}>{JSON.stringify(result.gan, null, 2)}</pre>
      </div>
      {/* <div style={sectionStyle}>
        <h3 style={titleStyle}>Faces Detected</h3>
        <p>{facesDetectedCount}</p>
      </div> */}
      {/* <div style={sectionStyle}>
        <h3 style={titleStyle}>Danger Score</h3>
        <p><strong>Score:</strong> {result.danger_score.danger_score}</p>
        <p><strong>Risk Level:</strong> {result.danger_score.risk_level}</p>
        <p><strong>Reasons:</strong></p>
        <ul>
          {result.danger_score.reasons?.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
        <p><strong>Flags:</strong></p>
        <ul>
          {result.danger_score.flags?.map((flag, index) => (
            <li key={index}>{flag}</li>
          ))}
        </ul>
      </div> */}
      <div style={sectionStyle}>
        <h3 style={titleStyle}>Metadata</h3>
        <pre style={preStyle}>{JSON.stringify(result.metadata, null, 2)}</pre>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}
const sectionStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  padding: '15px',
  marginBottom: '25px',
  backgroundColor: '#fafafa',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};
const titleStyle = {
  fontSize: '20px',
  marginBottom: '10px',
  color: '#333',
  borderBottom: '1px solid #ddd',
  paddingBottom: '5px'
};
const preStyle = {
  backgroundColor: '#f5f5f5',
  padding: '10px',
  borderRadius: '6px',
  overflowX: 'auto'
};
export default ResultPage;

