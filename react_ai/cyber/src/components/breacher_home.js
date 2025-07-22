// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Button,
//   Form,
//   Alert,
//   Row,
//   Col,
//   Card,
// } from "react-bootstrap";
// import '../styling/BreachChecker.css';

// function BreachChecker() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [visibleInput, setVisibleInput] = useState(null);
//   const [flip, setFlip] = useState(false);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const toggleInput = (type) => {
//     if (visibleInput === type) {
//       setVisibleInput(null);
//     } else {
//       setFlip(true);
//       setTimeout(() => {
//         setVisibleInput(type);
//         setFlip(false);
//         setError(null);
//         setResult(null);
//       }, 300); // matches animation duration
//     }
//   };

//   const handleCheck = async (type) => {
//     setError(null);
//     setResult(null);

//     try {
//       if ((type === "email" || type === "analytics") && !isValidEmail(email)) {
//         setError("Please enter a valid email.");
//         return;
//       }

//       let url = "";
//       let data = {};
//       if (type === "email") {
//         url = "http://localhost:8000/check-email-breaches/";
//         data = { email };
//       } else if (type === "analytics") {
//         url = "http://localhost:8000/email-breach-analytics/";
//         data = { email };
//       } else if (type === "password") {
//         if (!password) {
//           setError("Please enter a password to check.");
//           return;
//         }
//         url = "http://localhost:8000/check-password-leak/";
//         data = { password };
//       }

//       const response = await axios.post(url, data);
//       setResult(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   return (

//     <div className="breach-checker-bg" > 
    
//             <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

//         <Card className="shadow-lg rounded-4 p-4 glass-card">
//             <h2 className="text-center mb-4 animated-heading">
//             🛡️ Breach Checker Dashboard
//             </h2>

//             <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
//             <Button
//                 variant="dark"
//                 onClick={() => toggleInput("email")}
//                 active={visibleInput === "email"}
//             >
//                 🔍 Check Email Breaches
//             </Button>
//             <Button
//                 variant="secondary"
//                 onClick={() => toggleInput("analytics")}
//                 active={visibleInput === "analytics"}
//             >
//                 📊 Breach Analytics
//             </Button>
//             <Button
//                 variant="danger"
//                 onClick={() => toggleInput("password")}
//                 active={visibleInput === "password"}
//             >
//                 🔐 Password Leak
//             </Button>
//             </div>

//             {/* Animated Input Section */}
//             <div className={`flip-container ${flip ? "flip" : ""}`}>
//             {visibleInput === "email" && (
//                 <Form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleCheck("email");
//                 }}
//                 >
//                 <Form.Group controlId="formEmail" className="mb-3">
//                     <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Button type="submit" variant="dark" className="w-100">
//                     Submit
//                 </Button>
//                 </Form>
//             )}

//             {visibleInput === "analytics" && (
//                 <Form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleCheck("analytics");
//                 }}
//                 >
//                 <Form.Group controlId="formAnalytics" className="mb-3">
//                     <Form.Control
//                     type="email"
//                     placeholder="Enter email for analytics"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Button type="submit" variant="secondary" className="w-100">
//                     Submit
//                 </Button>
//                 </Form>
//             )}

//             {visibleInput === "password" && (
//                 <Form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     handleCheck("password");
//                 }}
//                 >
//                 <Form.Group controlId="formPassword" className="mb-3">
//                     <Form.Control
//                     type="password"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Button type="submit" variant="danger" className="w-100">
//                     Submit
//                 </Button>
//                 </Form>
//             )}
//             </div>

//             {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

//             {result && (
//             <Card className="mt-4 p-3 border-info result-box">
//                 <h5 className="mb-3 text-primary">Result for {visibleInput}:</h5>
//                 <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
//                 {JSON.stringify(result, null, 2)}
//                 </pre>
//             </Card>
//             )}
//         </Card>
//         </Container>
//     </div>
    
//   );
// }

// export default BreachChecker;





// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Card,
//   Button,
//   TextField,
//   Alert,
//   Typography,
//   Grid,
//   Box,
//   useTheme,
// } from "@mui/material";
// import { Mail, BarChart2, Lock } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Fade } from "react-awesome-reveal";
// import PasswordStrengthBar from "react-password-strength-bar";

// function BreachChecker() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [visibleInput, setVisibleInput] = useState(null);
//   const [flip, setFlip] = useState(false);

//   const theme = useTheme();

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const toggleInput = (type) => {
//     if (visibleInput === type) {
//       setVisibleInput(null);
//     } else {
//       setFlip(true);
//       setTimeout(() => {
//         setVisibleInput(type);
//         setFlip(false);
//         setError(null);
//         setResult(null);
//       }, 300);
//     }
//   };

//   const handleCheck = async (type) => {
//     setError(null);
//     setResult(null);

//     try {
//       if ((type === "email" || type === "analytics") && !isValidEmail(email)) {
//         setError("Please enter a valid email.");
//         return;
//       }

//       if (type === "password" && !password) {
//         setError("Please enter a password to check.");
//         return;
//       }

//       let url = "";
//       let data = {};
//       if (type === "email") {
//         url = "http://localhost:8000/check-email-breaches/";
//         data = { email };
//       } else if (type === "analytics") {
//         url = "http://localhost:8000/email-breach-analytics/";
//         data = { email };
//       } else if (type === "password") {
//         url = "http://localhost:8000/check-password-leak/";
//         data = { password };
//       }

//       const response = await axios.post(url, data);
//       setResult(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   // Animation variants for flipping container
//   const flipVariants = {
//     front: { rotateY: 0, opacity: 1 },
//     back: { rotateY: 180, opacity: 0 },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//         p: 4,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Card
//         sx={{
//           bgcolor: "rgba(255, 255, 255, 0.08)",
//           backdropFilter: "blur(16px)",
//           borderRadius: 4,
//           boxShadow: 6,
//           width: { xs: "95%", sm: 600 },
//           color: "white",
//           p: 4,
//           textAlign: "center",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{
//             fontWeight: "bold",
//             fontFamily: "'Segoe UI', sans-serif",
//             animation: "pulse 2s infinite",
//           }}
//         >
//           🛡️ Breach Checker Dashboard
//         </Typography>

//         <Grid container spacing={2} justifyContent="center" mb={3}>
//           <Grid item xs={12} sm={4}>
//             <Button
//               variant={visibleInput === "email" ? "contained" : "outlined"}
//               color="primary"
//               fullWidth
//               startIcon={<Mail size={18} />}
//               onClick={() => toggleInput("email")}
//             >
//               Check Email Breaches
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Button
//               variant={visibleInput === "analytics" ? "contained" : "outlined"}
//               color="secondary"
//               fullWidth
//               startIcon={<BarChart2 size={18} />}
//               onClick={() => toggleInput("analytics")}
//             >
//               Breach Analytics
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Button
//               variant={visibleInput === "password" ? "contained" : "outlined"}
//               color="error"
//               fullWidth
//               startIcon={<Lock size={18} />}
//               onClick={() => toggleInput("password")}
//             >
//               Password Leak
//             </Button>
//           </Grid>
//         </Grid>

//         <AnimatePresence mode="wait">
//           {visibleInput && (
//             <motion.div
//               key={visibleInput}
//               initial={{ rotateY: 90, opacity: 0 }}
//               animate={{ rotateY: 0, opacity: 1 }}
//               exit={{ rotateY: -90, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               <Fade triggerOnce duration={500}>
//                 <Box
//                   component="form"
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleCheck(visibleInput);
//                   }}
//                   sx={{ mb: 2 }}
//                 >
//                   {(visibleInput === "email" || visibleInput === "analytics") && (
//                     <TextField
//                       fullWidth
//                       type="email"
//                       label={
//                         visibleInput === "email"
//                           ? "Enter email"
//                           : "Enter email for analytics"
//                       }
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       margin="normal"
//                       InputLabelProps={{ style: { color: "#eee" } }}
//                       sx={{
//                         input: { color: "white" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#555" },
//                           "&:hover fieldset": { borderColor: "#aaa" },
//                           "&.Mui-focused fieldset": { borderColor: "#fff" },
//                         },
//                       }}
//                     />
//                   )}

//                   {visibleInput === "password" && (
//                     <>
//                       <TextField
//                         fullWidth
//                         type="password"
//                         label="Enter password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         margin="normal"
//                         InputLabelProps={{ style: { color: "#eee" } }}
//                         sx={{
//                           input: { color: "white" },
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: "#555" },
//                             "&:hover fieldset": { borderColor: "#aaa" },
//                             "&.Mui-focused fieldset": { borderColor: "#fff" },
//                           },
//                         }}
//                       />
//                       <Box sx={{ mt: 1 }}>
//                         <PasswordStrengthBar password={password} />
//                       </Box>
//                     </>
//                   )}

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color={
//                       visibleInput === "email"
//                         ? "primary"
//                         : visibleInput === "analytics"
//                         ? "secondary"
//                         : "error"
//                     }
//                     fullWidth
//                     sx={{ mt: 2 }}
//                   >
//                     Submit
//                   </Button>
//                 </Box>
//               </Fade>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         {error && (
//           <Alert
//             severity="error"
//             sx={{
//               mt: 3,
//               bgcolor: "rgba(255,0,0,0.1)",
//               color: "white",
//               fontWeight: "bold",
//             }}
//           >
//             {error}
//           </Alert>
//         )}
//         {result && (
//           <Card
//             variant="outlined"
//             sx={{
//               mt: 3,
//               bgcolor: "#ffffffee",
//               color: "#111",
//               maxHeight: 300,
//               overflowY: "auto",
//               p: 2,
//               borderRadius: 2,
//               textAlign: "left",
//               fontFamily: "'Courier New', monospace",
//               fontSize: "0.9rem",
//               whiteSpace: "pre-wrap",
//               wordWrap: "break-word",
//             }}
//           >
//             <Typography variant="h6" color="primary" gutterBottom>
//               Result for {visibleInput}:
//             </Typography>
//             <pre>{JSON.stringify(result, null, 2)}</pre>
//           </Card>
//         )}
//       </Card>
//       <style>{`
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.03); }
//           100% { transform: scale(1); }
//         }
//       `}</style>
//     </Box>
//   );
// }
// export default BreachChecker;


// import React, { useState, useMemo } from "react";
// import axios from "axios";
// import {
//   Container,
//   Card,
//   Button,
//   TextField,
//   Alert,
//   Typography,
//   Grid,
//   Box,
//   IconButton,
//   CssBaseline,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";
// import { Mail, BarChart2, Lock, Sun, Moon } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Fade } from "react-awesome-reveal";
// import PasswordStrengthBar from "react-password-strength-bar";

// function BreachChecker() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [visibleInput, setVisibleInput] = useState(null);
//   const [flip, setFlip] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);

//   // Create theme with darkMode toggle and better typography
//   const theme = useMemo(() => 
//     createTheme({
//       palette: {
//         mode: darkMode ? "dark" : "light",
//         primary: { main: darkMode ? "#bb86fc" : "#1976d2" },
//         secondary: { main: darkMode ? "#03dac6" : "#9c27b0" },

//         error: { main: "#d32f2f" },
//         background: {
//           default: darkMode ? "#121212" : "#fafafa",
//           paper: darkMode ? "rgba(255, 255, 255, 0.08)" : "#fff",
//         },
//         text: {
//           primary: darkMode ? "#fff" : "#000",
//           secondary: darkMode ? "#bbb" : "#555",
//         },
//       },
//       typography: {
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         h4: {
//           fontWeight: 700,
//           letterSpacing: "0.05em",
//         },
//         button: {
//           textTransform: "none",
//           fontWeight: 600,
//         },
//       },
//       components: {
//         MuiCard: {
//           styleOverrides: {
//             root: {
//               backdropFilter: darkMode ? "blur(16px)" : "none",
//               borderRadius: 16,
//             },
//           },
//         },
//       },
//     }),
//   [darkMode]);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const toggleInput = (type) => {
//     if (visibleInput === type) {
//       setVisibleInput(null);
//     } else {
//       setFlip(true);
//       setTimeout(() => {
//         setVisibleInput(type);
//         setFlip(false);
//         setError(null);
//         setResult(null);
//       }, 300);
//     }
//   };

//   const handleCheck = async (type) => {
//     setError(null);
//     setResult(null);

//     try {
//       if ((type === "email" || type === "analytics") && !isValidEmail(email)) {
//         setError("Please enter a valid email.");
//         return;
//       }

//       if (type === "password" && !password) {
//         setError("Please enter a password to check.");
//         return;
//       }

//       let url = "";
//       let data = {};
//       if (type === "email") {
//         url = "http://localhost:8000/check-email-breaches/";
//         data = { email };
//       } else if (type === "analytics") {
//         url = "http://localhost:8000/email-breach-analytics/";
//         data = { email };
//       } else if (type === "password") {
//         url = "http://localhost:8000/check-password-leak/";
//         data = { password };
//       }

//       const response = await axios.post(url, data);
//       setResult(response.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: darkMode
//             ? "linear-gradient(135deg, #1c1c1c, #2c2c2c)"
//             : "linear-gradient(135deg, #a8edea, #fed6e3)",

//           p: 4,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           position: "relative",
//         }}
//       >
//         {/* Dark Mode Toggle Button */}
//         <IconButton
//           onClick={() => setDarkMode(!darkMode)}
//           sx={{
//             position: "absolute",
//             top: 16,
//             right: 16,
//             color: "text.primary",
//             bgcolor: "background.paper",
//             "&:hover": { bgcolor: "background.default" },
//           }}
//           aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//         >
//           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </IconButton>

//         <Card
//           sx={{
//             width: { xs: "95%", sm: 600 },
//             color: "text.primary",
//             p: 4,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h4" component="h1" gutterBottom>
//             🛡️ Breach Checker Dashboard
//           </Typography>

//           <Grid container spacing={2} justifyContent="center" mb={3}>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant={visibleInput === "email" ? "contained" : "outlined"}
//                 color="primary"
//                 fullWidth
//                 startIcon={<Mail size={18} />}
//                 onClick={() => toggleInput("email")}
//               >
//                 Check Email Breaches
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant={visibleInput === "analytics" ? "contained" : "outlined"}
//                 color="secondary"
//                 fullWidth
//                 startIcon={<BarChart2 size={18} />}
//                 onClick={() => toggleInput("analytics")}
//               >
//                 Breach Analytics
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant={visibleInput === "password" ? "contained" : "outlined"}
//                 color="error"
//                 fullWidth
//                 startIcon={<Lock size={18} />}
//                 onClick={() => toggleInput("password")}
//               >
//                 Password Leak
//               </Button>
//             </Grid>
//           </Grid>

//           <AnimatePresence mode="wait">
//             {visibleInput && (
//               <motion.div
//                 key={visibleInput}
//                 initial={{ rotateY: 90, opacity: 0 }}
//                 animate={{ rotateY: 0, opacity: 1 }}
//                 exit={{ rotateY: -90, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <Fade triggerOnce duration={500}>
//                   <Box
//                     component="form"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handleCheck(visibleInput);
//                     }}
//                     sx={{ mb: 2 }}
//                   >
//                     {(visibleInput === "email" || visibleInput === "analytics") && (
//                       <TextField
//                         fullWidth
//                         type="email"
//                         label={
//                           visibleInput === "email"
//                             ? "Enter email"
//                             : "Enter email for analytics"
//                         }
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         margin="normal"
//                         InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
//                         sx={{
//                           input: { color: theme.palette.text.primary },
//                           "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: theme.palette.divider },
//                             "&:hover fieldset": { borderColor: theme.palette.text.primary },
//                             "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
//                           },
//                         }}
//                       />
//                     )}

//                     {visibleInput === "password" && (
//                       <>
//                         <TextField
//                           fullWidth
//                           type="password"
//                           label="Enter password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           margin="normal"
//                           InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
//                           sx={{
//                             input: { color: theme.palette.text.primary },
//                             "& .MuiOutlinedInput-root": {
//                               "& fieldset": { borderColor: theme.palette.divider },
//                               "&:hover fieldset": { borderColor: theme.palette.text.primary },
//                               "&.Mui-focused fieldset": { borderColor: theme.palette.error.main },
//                             },
//                           }}
//                         />
//                         <Box sx={{ mt: 1 }}>
//                           <PasswordStrengthBar password={password} />
//                         </Box>
//                       </>
//                     )}

//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color={
//                         visibleInput === "email"
//                           ? "primary"
//                           : visibleInput === "analytics"
//                           ? "secondary"
//                           : "error"
//                       }
//                       fullWidth
//                       sx={{ mt: 2 }}
//                     >
//                       Submit
//                     </Button>
//                   </Box>
//                 </Fade>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {error && (
//             <Alert
//               severity="error"
//               sx={{
//                 mt: 3,
//                 bgcolor: "rgba(255,0,0,0.1)",
//                 color: theme.palette.error.main,
//                 fontWeight: "bold",
//               }}
//             >
//               {error}
//             </Alert>
//           )}

//           {result && (
//             <Card
//               variant="outlined"
//               sx={{
//                 mt: 3,
//                 bgcolor: theme.palette.background.paper,
//                 color: theme.palette.text.primary,
//                 maxHeight: 300,
//                 overflowY: "auto",
//                 p: 2,
//                 borderRadius: 2,
//                 textAlign: "left",
//                 fontFamily: "'Courier New', monospace",
//                 fontSize: "0.9rem",
//                 whiteSpace: "pre-wrap",
//                 wordWrap: "break-word",
//               }}
//             >
//               <Typography variant="h6" color="primary" gutterBottom>
//                 Result for {visibleInput}:
//               </Typography>
//               <pre>{JSON.stringify(result, null, 2)}</pre>
//             </Card>
//           )}
//         </Card>

//         <style>{`
//           @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.03); }
//             100% { transform: scale(1); }
//           }
//         `}</style>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default BreachChecker;









// import React, { useState, useMemo } from "react";
// import axios from "axios";
// import {
//   Container,
//   Card,
//   Button,
//   TextField,
//   Alert,
//   Typography,
//   Grid,
//   Box,
//   IconButton,
//   CssBaseline,
//   createTheme,
//   ThemeProvider,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import { Mail, BarChart2, Lock, Sun, Moon } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Fade } from "react-awesome-reveal";
// import PasswordStrengthBar from "react-password-strength-bar";
// // import '../styling/result_card';
// import ResultCard from "../styling/result_card";


// function BreachChecker() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [visibleInput, setVisibleInput] = useState(null);
//   const [flip, setFlip] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const theme = useMemo(() =>
//     createTheme({
//       palette: {
//         mode: darkMode ? "dark" : "light",
//         primary: { main: darkMode ? "#bb86fc" : "#1976d2" },
//         secondary: { main: darkMode ? "#03dac6" : "#9c27b0" },
//         error: { main: "#d32f2f" },
//         background: {
//           default: darkMode ? "#121212" : "#fafafa",
//           paper: darkMode ? "rgba(255, 255, 255, 0.08)" : "#fff",
//         },
//         text: {
//           primary: darkMode ? "#fff" : "#000",
//           secondary: darkMode ? "#bbb" : "#555",
//         },
//       },
//       typography: {
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         h4: {
//           fontWeight: 700,
//           letterSpacing: "0.05em",
//         },
//         button: {
//           textTransform: "none",
//           fontWeight: 600,
//         },
//       },
//     }),
//     [darkMode]
//   );

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const toggleInput = (type) => {
//     if (visibleInput === type) {
//       setVisibleInput(null);
//     } else {
//       setFlip(true);
//       setTimeout(() => {
//         setVisibleInput(type);
//         setFlip(false);
//         setError(null);
//         setResult(null);
//       }, 300);
//     }
//   };

//   const handleCheck = async (type) => {
//     setError(null);
//     setResult(null);
//     setLoading(true);

//     try {
//       if ((type === "email" || type === "analytics") && !isValidEmail(email)) {
//         setError("Please enter a valid email.");
//         setLoading(false);
//         return;
//       }

//       if (type === "password" && !password) {
//         setError("Please enter a password to check.");
//         setLoading(false);
//         return;
//       }

//       let url = "";
//       let data = {};
//       if (type === "email") {
//         url = "http://localhost:8000/check-email-breaches/";
//         data = { email };
//       } else if (type === "analytics") {
//         url = "http://localhost:8000/email-breach-analytics/";
        
//         data = { email };
//       } else if (type === "password") {
//         url = "http://localhost:8000/check-password-leak/";
//         data = { password };
//       }

//       const response = await axios.post(url, data);
//       console.log("Response from backend:", response.data); // <-- Debug print
//       setResult(response.data);
//     } catch (err) {
//       console.error("Error response:", err.response?.data); // <-- Error debug
//       setError(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: darkMode
//             ? "linear-gradient(135deg, #1c1c1c, #2c2c2c)"
//             : "linear-gradient(135deg, #a8edea, #fed6e3)",
//           p: 4,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           position: "relative",
//         }}
//       >
//         <IconButton
//           onClick={() => setDarkMode(!darkMode)}
//           sx={{
//             position: "absolute",
//             top: 16,
//             right: 16,
//             color: "text.primary",
//             bgcolor: "background.paper",
//             "&:hover": { bgcolor: "background.default" },
//           }}
//         >
//           {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </IconButton>

//         <Card
//           sx={{
//             width: { xs: "95%", sm: 600 },
//             color: "text.primary",
//             p: 4,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h4" component="h1" gutterBottom>
//             🛡️ Breach Checker Dashboard
//           </Typography>

//           <Grid container spacing={2} justifyContent="center" mb={3}>
//             {["email", "analytics", "password"].map((type, i) => (
//               <Grid item xs={12} sm={4} key={type}>
//                 <Button
//                   variant={visibleInput === type ? "contained" : "outlined"}
//                   color={type === "email" ? "primary" : type === "analytics" ? "secondary" : "error"}
//                   fullWidth
//                   startIcon={type === "email" ? <Mail size={18} /> : type === "analytics" ? <BarChart2 size={18} /> : <Lock size={18} />}
//                   onClick={() => toggleInput(type)}
//                 >
//                   {type === "email" ? "Check Email Breaches" : type === "analytics" ? "Breach Analytics" : "Password Leak"}
//                 </Button>
//               </Grid>
//             ))}
//           </Grid>

//           <AnimatePresence mode="wait">
//             {visibleInput && (
//               <motion.div
//                 key={visibleInput}
//                 initial={{ rotateY: 90, opacity: 0 }}
//                 animate={{ rotateY: 0, opacity: 1 }}
//                 exit={{ rotateY: -90, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 style={{ transformStyle: "preserve-3d" }}
//               >
//                 <Fade triggerOnce duration={500}>
//                   <Box
//                     component="form"
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       handleCheck(visibleInput);
//                     }}
//                     sx={{ mb: 2 }}
//                   >
//                     {(visibleInput === "email" || visibleInput === "analytics") && (
//                       <TextField
//                         fullWidth
//                         type="email"
//                         label={visibleInput === "email" ? "Enter email" : "Enter email for analytics"}
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         margin="normal"
//                       />
//                     )}

//                     {visibleInput === "password" && (
//                       <>
//                         <TextField
//                           fullWidth
//                           type="password"
//                           label="Enter password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           margin="normal"
//                         />
//                         <Box sx={{ mt: 1 }}>
//                           <PasswordStrengthBar password={password} />
//                         </Box>
//                       </>
//                     )}

//                     <Button
//                       type="submit"
//                       variant="contained"
//                       fullWidth
//                       sx={{ mt: 2 }}
//                       disabled={loading}
//                     >
//                       {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                     </Button>
//                   </Box>
//                 </Fade>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {error && (
//             <Alert severity="error" sx={{ mt: 3 }}>
//               {error}
//             </Alert>
//           )}

// {/* 
//           {result && (
//             <>
//               {console.log("Rendering ResultCard with data:", result)}
//               {visibleInput === "analytics" ? (
//                 <ResultCard result={result} type="structured-analytics" theme={theme} />
//           ) : (
//       <ResultCard result={result} type={visibleInput} theme={theme} />
//     )}
//   </>
// )} */}


//           {result && (
//           <>
//           {console.log("Rendering ResultCard with dataaaaa:", result)}
//           <ResultCard result={result} type={visibleInput} theme={theme} />
//           </>
//           )}

//           {/* {result && 
//           <ResultCard result={result} type={visibleInput} theme={theme} />} */}
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default BreachChecker;




import Layout from '../components/Layout';
import React, { useState, useMemo } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  TextField,
  Alert,
  Typography,
  Grid,
  Box,
  IconButton,
  CssBaseline,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import { Mail, BarChart2, Lock, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import PasswordStrengthBar from "react-password-strength-bar";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// REMOVE OLD CARD
// import ResultCard from "../styling/result_card";

// ✅ Import new cards
import EmailBreachCard from "../styling/EmailBreachCard";
import BreachAnalyticsCard from "../styling/BreachAnalyticsCard";
import PasswordCheckCard from "../styling/PasswordCheckCard";

function BreachChecker() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [visibleInput, setVisibleInput] = useState(null);
  const [flip, setFlip] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: { main: darkMode ? "#bb86fc" : "#1976d2" },
        secondary: { main: darkMode ? "#03dac6" : "#9c27b0" },
        error: { main: "#d32f2f" },
        background: {
          default: darkMode ? "#121212" : "#fafafa",
          paper: darkMode ? "rgba(255, 255, 255, 0.08)" : "#fff",
        },
        text: {
          primary: darkMode ? "#fff" : "#000",
          secondary: darkMode ? "#bbb" : "#555",
        },
      },
      typography: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        h4: {
          fontWeight: 700,
          letterSpacing: "0.05em",
        },
        button: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    }),
    [darkMode]
  );

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const toggleInput = (type) => {
    if (visibleInput === type) {
      setVisibleInput(null);
    } else {
      setFlip(true);
      setTimeout(() => {
        setVisibleInput(type);
        setFlip(false);
        setError(null);
        setResult(null);
      }, 300);
    }
  };

  const handleCheck = async (type) => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      if ((type === "email" || type === "analytics") && !isValidEmail(email)) {
        setError("Please enter a valid email.");
        setLoading(false);
        return;
      }

      if (type === "password" && !password) {
        setError("Please enter a password to check.");
        setLoading(false);
        return;
      }

      let url = "";
      let data = {};
      if (type === "email") {
        url = "http://localhost:8000/check-email-breaches/";
        data = { email };
      } else if (type === "analytics") {
        url = "http://localhost:8000/email-breach-analytics/";
        data = { email };
      } else if (type === "password") {
        url = "http://localhost:8000/check-password-leak/";
        data = { password };
      }

      const response = await axios.post(url, data);
      console.log("Response from backend:::", response.data);
      setResult(response.data);
    } catch (err) {
      console.error("Error response:", err.response?.data);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
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

  return (
    <Layout>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #1c1c1c, #2c2c2c)"
            : "linear-gradient(135deg, #a8edea, #fed6e3)",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "text.primary",
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.default" },
          }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>

        <Card
          sx={{
            width: { xs: "95%", sm: 600 },
            color: "text.primary",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            🛡️ Breach Checker Dashboard
          </Typography>

          <Grid container spacing={2} justifyContent="center" mb={3}>
            {["email", "analytics", "password"].map((type) => (
              <Grid item xs={12} sm={4} key={type}>
                <Button
                  variant={visibleInput === type ? "contained" : "outlined"}
                  color={
                    type === "email"
                      ? "primary"
                      : type === "analytics"
                      ? "secondary"
                      : "error"
                  }
                  fullWidth
                  startIcon={
                    type === "email" ? (
                      <Mail size={18} />
                    ) : type === "analytics" ? (
                      <BarChart2 size={18} />
                    ) : (
                      <Lock size={18} />
                    )
                  }
                  onClick={() => toggleInput(type)}
                >
                  {type === "email"
                    ? "Check Email Breaches"
                    : type === "analytics"
                    ? "Breach Analytics"
                    : "Password Leak"}
                </Button>
              </Grid>
            ))}
          </Grid>

          <AnimatePresence mode="wait">
            {visibleInput && (
              <motion.div
                key={visibleInput}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Fade triggerOnce duration={500}>
                  <Box
                    component="form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCheck(visibleInput);
                    }}
                    sx={{ mb: 2 }}
                  >
                    {(visibleInput === "email" ||
                      visibleInput === "analytics") && (
                      <TextField
                        fullWidth
                        type="email"
                        label={
                          visibleInput === "email"
                            ? "Enter email"
                            : "Enter email for analytics"
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                      />
                    )}

                    {visibleInput === "password" && (
                      <>
                        <TextField
                          fullWidth
                          type="password"
                          label="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          margin="normal"
                        />
                        <Box sx={{ mt: 1 }}>
                          <PasswordStrengthBar password={password} />
                        </Box>
                      </>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Box>
                </Fade>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {result && (
            <>
              {console.log("Rendering card for:", visibleInput)}
              {visibleInput === "email" && (
                <EmailBreachCard result={result} theme={theme} />
              )}
              {visibleInput === "analytics" && (
                <BreachAnalyticsCard data={result} theme={theme} />
              )}
              {visibleInput === "password" && (
                <PasswordCheckCard result={result} theme={theme} />
              )}
            </>
          )}
        </Card>
      </Box>
    </ThemeProvider>
    </Layout>
  );
}

export default BreachChecker;
