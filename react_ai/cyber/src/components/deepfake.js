// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Layout from '../components/Layout';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const DeepfakeAnalyzer = () => {
//   const [file, setFile] = useState(null);
//   const [previewURL, setPreviewURL] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const navigate = useNavigate();

//   const allowedTypes = ["image/jpeg", "image/png"];

//   const showToast = (message, type = "error") => {
//     const toastFn = type === "success" ? toast.success : toast.error;
//     toastFn(message, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });
//   };

//     useEffect(() => {
//       const checkSession = async () => {
//         try {
//           const res = await axios.get('http://localhost:8000/check-session/', {
//             withCredentials: true,
//           });
//           if (!res.data.valid) {
//             navigate('/');
//           }
//         } catch (err) {
//           navigate('/log');
//         }
//       };
//       checkSession();
//     }, []);

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     if (!allowedTypes.includes(selected.type)) {
//       showToast("Invalid file type. Only JPG or PNG images are allowed.");
//       return;
//     }

//     if (selected.size > 15 * 1024 * 1024) {
//       showToast("Image too large. Maximum size is 15MB.");
//       return;
//     }

//     setFile(selected);
//     setPreviewURL(URL.createObjectURL(selected));
//   };

//   // const handleUpload = async () => {
//   //   if (!file) {
//   //     showToast("Please select an image before uploading.");
//   //     return;
//   //   }

//   //   setUploading(true);
//   //   const formData = new FormData();
//   //   formData.append("media", file);

//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:8001/analyze-detailed/",
//   //       formData,
//   //       { headers: { "Content-Type": "multipart/form-data" } }
//   //     );

//   //     if (response.data.status === "success") {
//   //       const result = `Prediction: ${response.data.prediction} (Confidence: ${(response.data.confidence * 100).toFixed(2)}%)`;
//   //       showToast(result, "success");
//   //     } else if (response.data.detail) {
//   //       showToast(response.data.detail);
//   //     } else {
//   //       showToast("Unexpected error during analysis.");
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //     const msg = err.response?.data?.detail || "Something went wrong. Please try again.";
//   //     showToast(msg);
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // };




//   const handleUpload = async () => {
//   if (!file) {
//     showToast("Please select an image before uploading.");
//     return;
//   }

//   setUploading(true);
//   const formData = new FormData();
//   formData.append("media", file);

//   try {
//     const response = await axios.post(
//       "http://localhost:8001/analyze-detailed/",
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     if (response.data.result_id) {
//       showToast("Image analyzed successfully!", "success");
//       navigate(`/deepfake/result/${response.data.result_id}`);
//     } else if (response.data.detail) {
//       showToast(response.data.detail);
//     } else {
//       showToast("Unexpected error during analysis.");
//     }
//   } catch (err) {
//     console.error(err);
//     const msg = err.response?.data?.detail || "Something went wrong. Please try again.";
//     showToast(msg);
//   } finally {
//     setUploading(false);
//   }
// };


//   return (
//     <Layout>
//       <div
//         className="d-flex align-items-center justify-content-center"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
//           padding: "30px",
//           overflow: "hidden",
//         }}
//       >
//         <ToastContainer />

//         <motion.div
//           className="p-4 glass-card shadow-lg"
//           style={{
//             width: "100%",
//             maxWidth: "600px",
//             borderRadius: "20px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="text-center mb-4">
//             <lord-icon
//               src="https://cdn.lordicon.com/qhviklyi.json"
//               trigger="hover"
//               colors="primary:#121331,secondary:#08a88a"
//               style={{ width: "80px", height: "80px" }}
//             ></lord-icon>
//             <h2 className="fw-bold text-dark mt-3">Deepfake Image Analyzer</h2>
//           </div>

//           <label htmlFor="mediaInput" className="upload-box mb-3">
//             <input
//               type="file"
//               className="form-control d-none"
//               id="mediaInput"
//               onChange={handleFileChange}
//               accept=".jpg,.png"
//             />
//             <div className="text-center">
//               <lord-icon
//                 src="https://cdn.lordicon.com/mxzlybnh.json"
//                 trigger="loop"
//                 delay="2000"
//                 colors="primary:#121331,secondary:#0ab39c"
//                 style={{ width: "60px", height: "60px" }}
//               ></lord-icon>
//               <p className="fw-semibold text-primary mt-2 mb-0">Click to upload image</p>
//               <small className="text-muted">JPG, PNG (≤15MB)</small>
//             </div>
//           </label>

//           {previewURL && (
//             <div className="preview-container mb-3">
//               <img src={previewURL} alt="Preview" className="img-fluid rounded" />
//             </div>
//           )}

//           <motion.button
//             onClick={handleUpload}
//             disabled={uploading}
//             whileTap={{ scale: 0.97 }}
//             className={`btn btn-success w-100 fw-bold ${uploading ? "disabled" : ""}`}
//           >
//             {uploading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2"></span>
//                 Analyzing...
//               </>
//             ) : (
//               "Start Analysis"
//             )}
//           </motion.button>

//           {uploading && (
//             <motion.div
//               className="text-center mt-3 text-dark fw-semibold"
//               animate={{ opacity: [0.4, 1, 0.4] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//             >
//               Please wait while we analyze your image...
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </Layout>
//   );
// };

// export default DeepfakeAnalyzer;

















import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const DeepfakeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const allowedTypes = ["image/jpeg", "image/png"];
  const showToast = (message, type = "error") => {
    const toastFn = type === "success" ? toast.success : toast.error;
    toastFn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
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
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!allowedTypes.includes(selected.type)) {
      showToast("Invalid file type. Only JPG or PNG images are allowed.");
      return;
    }
    if (selected.size > 15 * 1024 * 1024) {
      showToast("Image too large. Maximum size is 15MB.");
      return;
    }
    setFile(selected);
    setPreviewURL(URL.createObjectURL(selected));
  };
  const handleUpload = async () => {
  if (!file) {
    showToast("Please select an image before uploading.");
    return;
  }
  setUploading(true);
  const formData = new FormData();
  formData.append("media", file);
  try {
    const response = await axios.post(
      "http://localhost:8001/analyze-detailed/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.data.result_id) {
  showToast("Image analyzed successfully!", "success");
  navigate(`/deepfake/result/${response.data.result_id}`);
} else if (response.data.status === "no_face") {
  showToast("The uploaded image does not contain any face.");
} else if (response.data.detail) {
  showToast(response.data.detail);
} else {
  showToast("Unexpected error during analysis.");
}
  } catch (err) {
    console.error(err);
    const msg = err.response?.data?.detail || "Something went wrong. Please try again.";
    showToast(msg);
  } finally {
    setUploading(false);
  }
};
  return (
    <Layout>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.5, // optional for a dimmed effect
      }}
    >
      <source src="/assets/user/images/bg_video2.mov" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* 🔵 Foreground Content */}
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        padding: "30px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <ToastContainer />
      <motion.div
        className="p-4 glass-card shadow-lg"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // optional: for contrast over video
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      {/* <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
          padding: "30px",
          overflow: "hidden",
        }}   >
        <ToastContainer />
        <motion.div
          className="p-4 glass-card shadow-lg"
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}  > */}



          <div className="text-center mb-4">
            <lord-icon
              src="https://cdn.lordicon.com/qhviklyi.json"
              trigger="hover"
              colors="primary:#121331,secondary:#08a88a"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>
            <h2 className="fw-bold text-dark mt-3">Deepfake Image Analyzer</h2>
          </div>
          <label htmlFor="mediaInput" className="upload-box mb-3">
            <input
              type="file"
              className="form-control d-none"
              id="mediaInput"
              onChange={handleFileChange}
              accept=".jpg,.png"
            />
            <div className="text-center">
              <lord-icon
                src="https://cdn.lordicon.com/mxzlybnh.json"
                trigger="loop"
                delay="2000"
                colors="primary:#121331,secondary:#0ab39c"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
              <p className="fw-semibold text-primary mt-2 mb-0">Click to upload image</p>
              <small className="text-muted">JPG, PNG (≤15MB)</small>
            </div>
          </label>
          {previewURL && (
            <div className="preview-container mb-3">
              <img src={previewURL} alt="Preview" className="img-fluid rounded" />
            </div>
          )}
          <motion.button
            onClick={handleUpload}
            disabled={uploading}
            whileTap={{ scale: 0.97 }}
            className={`btn btn-success w-100 fw-bold ${uploading ? "disabled" : ""}`}  >
            {uploading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Analyzing...
              </>
            ) : (
              "Start Analysis"
            )}
          </motion.button>
          {uploading && (
            <motion.div
              className="text-center mt-3 text-dark fw-semibold"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}  >
              Please wait while we analyze your image...
            </motion.div>
          )}
        </motion.div>
      </div>
      </div>
    </Layout>
  );
};
export default DeepfakeAnalyzer;