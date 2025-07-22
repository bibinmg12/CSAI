// import React, { useState } from "react";
// import {
//   Box,TextField,Button,Typography,Card,CardContent,Chip,CircularProgress,Alert
// } from "@mui/material";
// import { FaShieldAlt, FaBug, FaLink, FaSearch } from "react-icons/fa";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Layout from '../components/Layout';
// const PhishingChecker = () => {
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const handleAnalyze = async () => {
//     setLoading(true);
//     setError("");
//     setResult(null);
//     try {
//       const response = await axios.post("http://localhost:8000/analyze-url/", { url });
//       setResult(response.data);    
//     } catch (err) {
//       setError("Failed to analyze the URL.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const getRiskColor = (risk) => {
//     switch (risk) {
//       case "Safe":
//         return "success";
//       case "Suspicious":
//         return "warning";
//       case "Phishing":
//         return "error";
//       default:
//         return "default";
//     }
//   };
//   return (
//     <Layout>
//       <section>
//     <Box
//       sx={{
//         maxWidth: 600,margin: "auto",p: 4,
//         textAlign: "center",
//       }}
//     >
//       <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
//         <Typography variant="h4" gutterBottom>
//           <FaShieldAlt /> Phishing URL Analyzer
//         </Typography>
//         <Typography variant="subtitle1" gutterBottom>
//           Enter a URL to analyze if it's safe or suspicious.
//         </Typography>
//       </motion.div>
//       <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
//         <Box display="flex" gap={2} mt={3} justifyContent="center">
//           <TextField
//             fullWidth
//             label="Enter URL"
//             variant="outlined"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)} />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAnalyze}
//             disabled={!url || loading}
//             startIcon={loading ? <CircularProgress size={20} /> : <FaSearch />} >
//             {loading ? "Analyzing..." : "Analyze"}
//           </Button>
//         </Box>
//       </motion.div>
//       {error && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 20 }}>
//           <Alert severity="error">{error}</Alert>
//         </motion.div>
//       )}
//       {result && (
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}>
//           <Card sx={{ mt: 4, p: 2, boxShadow: 4 }}>
//             <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                     <FaLink /> URL: {result.url}
//                 </Typography>
//                 <Chip
//                     label={result.risk_level}
//                     color={getRiskColor(result.risk_level)}
//                     variant="outlined"
//                     sx={{ mb: 2 }} />
//                 {result.timestamp && (
//                     <Typography variant="body2" gutterBottom>
//                     ⏰ Analyzed at: {result.timestamp}
//                     </Typography>
//                 )}
//                 <Box mt={2} textAlign="left">
//                     <Typography variant="subtitle1" gutterBottom>
//                     <FaBug /> Reasons:
//                     </Typography>
//                     <ul>
//                     {result.reasons.map((reason, idx) => (
//                         <li key={idx}>
//                         <Typography variant="body2">🔹 {reason}</Typography>
//                         </li>
//                     ))}
//                     </ul>
//                 </Box>
//                 {result.phishing_detected && (
//                     <Box mt={2}>
//                     <Typography variant="subtitle1" gutterBottom>
//                         🚨 Google Safe Browsing Match:
//                     </Typography>
//                     <ul>
//                         {result.phishing_details.map((match, idx) => (
//                         <li key={idx}>
//                             <Typography variant="body2">
//                             Type: {match.threatType}, Platform: {match.platformType}
//                             </Typography>
//                         </li>
//                         ))}
//                     </ul>
//                     </Box>
//                 )}
//                 {result.url_info && (
//                     <Box mt={2}>
//                     <Typography variant="subtitle1" gutterBottom>
//                         🌐 URL Info:
//                     </Typography>
//                     <Typography variant="body2">Final URL: {result.url_info.final_url}</Typography>
//                     <Typography variant="body2">Status Code: {result.url_info.status_code}</Typography>
//                     <Typography variant="body2">Redirected: {result.url_info.redirected ? "Yes" : "No"}</Typography>
//                     <Typography variant="body2">Domain: {result.url_info.domain}</Typography>
//                     </Box>
//                 )}
//                 </CardContent>
//                 {result.screenshot_base64 && (
//                 <Box mt={2}>
//                     <Typography variant="subtitle1">Screenshot:</Typography>
//                     <img
//                     src={`data:image/png;base64,${result.screenshot_base64}`}
//                     alt="Website Screenshot"
//                     style={{ width: "100%", borderRadius: 8, marginTop: 10 }} />
//                 </Box>
//                 )}     
//           </Card>
//         </motion.div>
//       )}
//     </Box>
//     </section>
//     </Layout>
//   );
// };
// export default PhishingChecker;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Typography, Card, CardContent, Chip, Alert, Autocomplete, Dialog, DialogContent,
  LinearProgress, Paper,CircularProgress
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FaShieldAlt, FaBug, FaLink, FaSearch, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import Layout from "../components/Layout";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const PhishingChecker = () => {
  const [url, setUrl] = useState("");
  const [recentUrls, setRecentUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [screenshotOpen, setScreenshotOpen] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
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

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem("recentUrls") || "[]");
    setRecentUrls(storedUrls);

    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      color: 0x0ff1ce,
      backgroundColor: 0x000000,
    });

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    if (!/^https?:\/\//.test(url)) {
      setError("URL must start with http:// or https://");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/analyze-url/", { url });
      setResult(response.data);
      const updated = [url, ...recentUrls.filter(u => u !== url)].slice(0, 5);
      localStorage.setItem("recentUrls", JSON.stringify(updated));
      setRecentUrls(updated);
    } catch (err) {
      setError("Failed to analyze the URL.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Suspicious": return "warning";
      case "Suspicious": return "warning";
      case "Phishing": return "error";
      default: return "default";
    }
  };

  return (
    <Layout>
      <div
        ref={vantaRef}
        style={{
          minHeight: "100vh",
          padding: "40px 16px",
          backgroundColor: "#000", // removes React default white background
          overflowX: "hidden"
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            backdropFilter: "blur(8px)",
            bgcolor: "rgba(0,0,0,0.6)",
            borderRadius: 4,
            p: 4,
            color: "#fff"
          }}
        >
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Typography variant="h3" gutterBottom fontWeight={600} sx={{ color: "#0ff1ce" }}>
              <FaShieldAlt /> Cyber Sentinel - URL Analyzer
            </Typography>
            <Typography variant="h6" sx={{ color: "#ccc" }}>
              Enter a URL to detect if it’s Safe, Suspicious or Malicious.
            </Typography>
          </motion.div>

          <Fade delay={300}>
            <Box mt={4}>
              <Autocomplete
                freeSolo
                options={recentUrls}
                inputValue={url}
                onInputChange={(e, newVal) => setUrl(newVal)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter URL"
                    variant="filled"
                    fullWidth
                    autoFocus
                    sx={{
                      input: { color: "#fff" },
                      label: { color: "#aaa" },
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: 1
                    }}
                    helperText="Must start with http:// or https://"
                  />
                )}
              />

              <LoadingButton
  loading={loading}
  loadingIndicator={
    <CircularProgress
      size={22}
      thickness={5}
      // sx={{ color: "#000" }} // Black spinner (good contrast on neon background)
      sx={{ color: "#D4AF37" }}
    />
  }
  loadingPosition="start"
  startIcon={<FaSearch />}
  onClick={handleAnalyze}
  variant="contained"
  fullWidth
  sx={{
    mt: 2,
    bgcolor: "#0ff1ce",
    color: "#000",
    fontWeight: 600,
    ":hover": { bgcolor: "#00e6e6" },
    '& .MuiLoadingButton-loadingIndicator': {
      marginRight: 1,
    },
  }}
>
  {loading ? "Analyzing..." : "Analyze"}
</LoadingButton>


            </Box>
          </Fade>

          {error && (
            <Fade>
              <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            </Fade>
          )}

          {result && (
            <Fade delay={400}>
              <Card
                sx={{
                  mt: 4,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: `2px solid ${result.risk_level === "Phishing" ? "#ff1744" : "#0ff1ce"}`,
                  backdropFilter: "blur(10px)",
                  borderRadius: 4,
                  transition: "0.3s ease",
                  color: "#fff",
                  ":hover": { transform: "scale(1.01)" }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    <FaLink /> URL: <span style={{ wordBreak: "break-all" }}>{result.url}</span>
                  </Typography>

                  <Chip
                    label={result.risk_level}
                    color={getRiskColor(result.risk_level)}
                    icon={<FaGlobe />}
                    sx={{ mt: 1, mb: 2 }}
                  />

                  <LinearProgress
                    variant="determinate"
                    value={
                      result.risk_level === "Phishing" ? 100 :
                        result.risk_level === "Suspicious" ? 60 : 20
                    }
                    sx={{ height: 8, borderRadius: 5, mb: 2 }}
                  />

                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    ⏰ Analyzed at: {result.timestamp}
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="subtitle1" sx={{ color: "#fff" }}><FaBug /> Reasons:</Typography>
                    <ul>
                      {result.reasons.map((r, i) => (
                        <li key={i}>
                          <Typography variant="body2" sx={{ color: "#ddd" }}>🔹 {r}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>

                  {result.phishing_detected && (
                    <Box mt={2}>
                      <Typography variant="subtitle1" sx={{ color: "#ff5252" }}>
                        🚨 Google Safe Browsing Match:
                      </Typography>
                      {result.phishing_details.map((match, idx) => (
                        <Chip
                          key={idx}
                          label={`${match.threatType} - ${match.platformType}`}
                          color="error"
                          size="small"
                          sx={{ mr: 1, mt: 1 }}
                        />
                      ))}
                    </Box>
                  )}

                  {result.url_info && (
                    <Box mt={2}>
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>🌐 URL Info:</Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>Final URL: {result.url_info.final_url}</Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>Status Code: {result.url_info.status_code}</Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>Redirected: {result.url_info.redirected ? "Yes" : "No"}</Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>Domain: {result.url_info.domain}</Typography>
                    </Box>
                  )}

                  {result.screenshot_base64 && (
                    <Box mt={3}>
                      <Typography variant="subtitle1" sx={{ color: "#fff" }}>📷 Screenshot Preview:</Typography>
                      <Paper
                        elevation={3}
                        sx={{ mt: 1, overflow: "hidden", borderRadius: 2, cursor: "pointer" }}
                        onClick={() => setScreenshotOpen(true)}
                      >
                        <img
                          src={`data:image/png;base64,${result.screenshot_base64}`}
                          alt="Website Screenshot"
                          style={{ width: "100%", transition: "0.3s", display: "block" }}
                        />
                      </Paper>
                    </Box>
                  )}
                </CardContent>
              </Card>

              <Dialog open={screenshotOpen} onClose={() => setScreenshotOpen(false)} maxWidth="lg">
                <DialogContent sx={{ backgroundColor: "#000" }}>
                  <img
                    src={`data:image/png;base64,${result.screenshot_base64}`}
                    alt="Full Screenshot"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </DialogContent>
              </Dialog>
            </Fade>
          )}
        </Box>
      </div>
    </Layout>
  );
};

export default PhishingChecker;
