// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   CircularProgress,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
// import WarningIcon from '@mui/icons-material/Warning';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { motion } from 'framer-motion';
// import Papa from 'papaparse';

// function UploadCSV() {
//   const [file, setFile] = useState(null);
//   const [csvPreview, setCsvPreview] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('all');

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: '.csv',
//     onDrop: (acceptedFiles) => {
//       const uploadedFile = acceptedFiles[0];
//       setFile(uploadedFile);
//       Papa.parse(uploadedFile, {
//         header: true,
//         complete: (res) => setCsvPreview(res.data.slice(0, 5)), // preview first 5 rows
//       });
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       toast.error('Please upload a CSV file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     setLoading(true);

//     try {
//       const res = await axios.post('http://localhost:8000/upload-csv/', formData);
//       setResults(res.data);
//       toast.success('Classification completed!');
//     } catch (error) {
//       console.error(error);
//       toast.error('Error uploading or processing file');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredResults =
//     filter === 'all'
//       ? results
//       : results.filter((item) => (filter === 'spam' ? item.is_spam : !item.is_spam));

//   const spamCount = results.filter((item) => item.is_spam).length;
//   const legitCount = results.length - spamCount;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       style={{ padding: '30px', fontFamily: 'Segoe UI' }}
//     >
//       <Typography variant="h4" gutterBottom>
//         📂 Email Spam Classifier
//       </Typography>

//       <Box
//         {...getRootProps()}
//         sx={{
//           border: '2px dashed #1976d2',
//           padding: '20px',
//           borderRadius: '10px',
//           backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
//           textAlign: 'center',
//           cursor: 'pointer',
//           marginBottom: '20px'
//         }}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the CSV file here...</p>
//         ) : (
//           <p>Drag & drop a CSV file here, or click to select</p>
//         )}
//       </Box>

//       {csvPreview.length > 0 && (
//         <Box mb={3}>
//           <Typography variant="h6">📊 CSV Preview (First 5 Rows)</Typography>
//           <TableContainer component={Paper}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   {Object.keys(csvPreview[0]).map((header) => (
//                     <TableCell key={header}>{header}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {csvPreview.map((row, idx) => (
//                   <TableRow key={idx}>
//                     {Object.values(row).map((val, i) => (
//                       <TableCell key={i}>{val}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}

//       <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : 'Upload & Classify'}
//       </Button>

//       {results.length > 0 && (
//         <Box mt={4}>
//           <Typography variant="h6">📈 Summary</Typography>
//           <Typography>Total: {results.length} | 🚨 Spam: {spamCount} | ✅ Legit: {legitCount}</Typography>

//           <FormControl style={{ marginTop: '15px', minWidth: '200px' }}>
//             <InputLabel>Filter</InputLabel>
//             <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
//               <MenuItem value="all">All</MenuItem>
//               <MenuItem value="spam">Spam Only</MenuItem>
//               <MenuItem value="legit">Legit Only</MenuItem>
//             </Select>
//           </FormControl>

//           <Box mt={3}>
//             {filteredResults.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <Card
//                   style={{
//                     marginBottom: '15px',
//                     backgroundColor: item.is_spam ? '#ffebee' : '#e8f5e9',
//                     borderLeft: `6px solid ${item.is_spam ? '#d32f2f' : '#388e3c'}`,
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="subtitle1">
//                       <MarkEmailUnreadIcon fontSize="small" /> <strong>Subject:</strong> {item.subject}
//                     </Typography>
//                     <Typography variant="subtitle2">
//                       <strong>Sender:</strong> {item.sender}
//                     </Typography>
//                     <Accordion>
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography>View Content</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         <Typography>{item.content}</Typography>
//                       </AccordionDetails>
//                     </Accordion>
//                     <Typography variant="body2" mt={1}>
//                       <strong>Status:</strong> {item.is_spam ? <><WarningIcon color="error" /> Spam</> : <><CheckCircleIcon color="success" /> Legit</>}
//                     </Typography>
//                     <Typography variant="caption" display="block">
//                       <strong>Timestamp:</strong> {item.timestamp}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </Box>
//         </Box>
//       )}

//       <ToastContainer />
//     </motion.div>
//   );
// }

// export default UploadCSV;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   CircularProgress,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Tabs,
//   Tab,
//   TextField
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
// import WarningIcon from '@mui/icons-material/Warning';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { motion } from 'framer-motion';
// import Papa from 'papaparse';

// function UploadCSV() {
//   const [file, setFile] = useState(null);
//   const [csvPreview, setCsvPreview] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('all');
//   const [tabIndex, setTabIndex] = useState(0);
//   const [manualSubject, setManualSubject] = useState('');
//   const [manualSender, setManualSender] = useState('');
//   const [manualContent, setManualContent] = useState('');

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: '.csv',
//     onDrop: (acceptedFiles) => {
//       const uploadedFile = acceptedFiles[0];
//       setFile(uploadedFile);
//       Papa.parse(uploadedFile, {
//         header: true,
//         complete: (res) => setCsvPreview(res.data.slice(0, 5)),
//       });
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       toast.error('Please upload a CSV file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     setLoading(true);

//     try {
//       const res = await axios.post('http://localhost:8000/upload-csv/', formData);
//       setResults(res.data);
//       toast.success('Classification completed!');
//     } catch (error) {
//       console.error(error);
//       toast.error('Error uploading or processing file');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleManualSubmit = async () => {
//     if (!manualSubject || !manualSender || !manualContent) {
//       toast.error('Please fill all fields for manual classification');
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:8000/manual-classify/', {
//         subject: manualSubject,
//         sender: manualSender,
//         content: manualContent
//       });
//       setResults(prev => [...prev, res.data]);
//       toast.success('Manual email classified!');
//       setManualSubject('');
//       setManualSender('');
//       setManualContent('');
//     } catch (error) {
//       console.error(error);
//       toast.error('Error during manual classification');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredResults =
//     filter === 'all'
//       ? results
//       : results.filter((item) => (filter === 'spam' ? item.is_spam : !item.is_spam));

//   const spamCount = results.filter((item) => item.is_spam).length;
//   const legitCount = results.length - spamCount;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       style={{ padding: '30px', fontFamily: 'Segoe UI' }}
//     >
//       <Typography variant="h4" gutterBottom>
//         📂 Email Spam Classifier
//       </Typography>

//       <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} sx={{ mb: 3 }}>
//         <Tab label="📁 Upload CSV" />
//         <Tab label="✍️ Manual Entry" />
//       </Tabs>

//       {tabIndex === 0 && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <Box
//             {...getRootProps()}
//             sx={{
//               border: '2px dashed #1976d2',
//               padding: '20px',
//               borderRadius: '10px',
//               backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
//               textAlign: 'center',
//               cursor: 'pointer',
//               marginBottom: '20px'
//             }}
//           >
//             <input {...getInputProps()} />
//             {isDragActive ? (
//               <p>Drop the CSV file here...</p>
//             ) : (
//               <p>Drag & drop a CSV file here, or click to select</p>
//             )}
//           </Box>

//           {csvPreview.length > 0 && (
//             <Box mb={3}>
//               <Typography variant="h6">📊 CSV Preview (First 5 Rows)</Typography>
//               <TableContainer component={Paper}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       {Object.keys(csvPreview[0]).map((header) => (
//                         <TableCell key={header}>{header}</TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {csvPreview.map((row, idx) => (
//                       <TableRow key={idx}>
//                         {Object.values(row).map((val, i) => (
//                           <TableCell key={i}>{val}</TableCell>
//                         ))}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           )}

//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//             {loading ? <CircularProgress size={24} /> : 'Upload & Classify'}
//           </Button>
//         </motion.div>
//       )}

//       {tabIndex === 1 && (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Subject"
//               variant="outlined"
//               margin="normal"
//               value={manualSubject}
//               onChange={(e) => setManualSubject(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               label="Sender"
//               variant="outlined"
//               margin="normal"
//               value={manualSender}
//               onChange={(e) => setManualSender(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               label="Content"
//               variant="outlined"
//               margin="normal"
//               multiline
//               rows={4}
//               value={manualContent}
//               onChange={(e) => setManualContent(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleManualSubmit}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Classify Manually'}
//             </Button>
//           </Box>
//         </motion.div>
//       )}

//       {results.length > 0 && (
//         <Box mt={4}>
//           <Typography variant="h6">📈 Summary</Typography>
//           <Typography>Total: {results.length} | 🚨 Spam: {spamCount} | ✅ Legit: {legitCount}</Typography>

//           <FormControl style={{ marginTop: '15px', minWidth: '200px' }}>
//             <InputLabel>Filter</InputLabel>
//             <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
//               <MenuItem value="all">All</MenuItem>
//               <MenuItem value="spam">Spam Only</MenuItem>
//               <MenuItem value="legit">Legit Only</MenuItem>
//             </Select>
//           </FormControl>

//           <Box mt={3}>
//             {filteredResults.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <Card
//                   style={{
//                     marginBottom: '15px',
//                     backgroundColor: item.is_spam ? '#ffebee' : '#e8f5e9',
//                     borderLeft: `6px solid ${item.is_spam ? '#d32f2f' : '#388e3c'}`,
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="subtitle1">
//                       <MarkEmailUnreadIcon fontSize="small" /> <strong>Subject:</strong> {item.subject}
//                     </Typography>
//                     <Typography variant="subtitle2">
//                       <strong>Sender:</strong> {item.sender}
//                     </Typography>
//                     <Accordion>
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography>View Content</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         <Typography>{item.content}</Typography>
//                       </AccordionDetails>
//                     </Accordion>
//                     <Typography variant="body2" mt={1}>
//                       <strong>Status:</strong> {item.is_spam ? <><WarningIcon color="error" /> Spam</> : <><CheckCircleIcon color="success" /> Legit</>}
//                     </Typography>
//                     <Typography variant="caption" display="block">
//                       <strong>Timestamp:</strong> {item.timestamp}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </Box>
//         </Box>
//       )}

//       <ToastContainer />
//     </motion.div>
//   );
// }

// export default UploadCSV;




import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import Layout from '../components/Layout';
import 'react-toastify/dist/ReactToastify.css';
import {
  CircularProgress,
  Typography,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function UploadCSV() {
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const [manualSubject, setManualSubject] = useState('');
  const [manualSender, setManualSender] = useState('');
  const [manualContent, setManualContent] = useState('');
  const navigate = useNavigate();


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.csv',
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      Papa.parse(uploadedFile, {
        header: true,
        complete: (res) => setCsvPreview(res.data.slice(0, 5)),
      });
    },
  });

  const handleSubmitCSV = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload a CSV file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/upload-csv/', formData);
      setResults(res.data);
      toast.success('Classification completed!');
    } catch (error) {
      console.error(error);
      toast.error('Error uploading or processing file');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitManual = async () => {
    if (!manualSubject || !manualSender || !manualContent) {
      toast.warning('Please fill in all manual entry fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/manual-classify/', {
        subject: manualSubject,
        sender: manualSender,
        content: manualContent,
      });
      setResults([...results, res.data]);
      toast.success('Manual entry classified!');
      setManualSubject('');
      setManualSender('');
      setManualContent('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to classify manual entry');
    } finally {
      setLoading(false);
    }
  };

  const filteredResults =
    filter === 'all'
      ? results
      : results.filter((item) => (filter === 'spam' ? item.is_spam : !item.is_spam));

  const spamCount = results.filter((item) => item.is_spam).length;
  const legitCount = results.length - spamCount;

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
    <Box sx={{ padding: '30px', fontFamily: 'Segoe UI' }}>
      <Typography variant="h4" gutterBottom>
        📂 Email Spam Classifier
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newVal) => setTab(newVal)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="📁 Upload CSV" />
        <Tab label="✍️ Manual Entry" />
      </Tabs>

      {tab === 0 && (
        <motion.div
          key="upload-tab"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #1976d2',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the CSV file here...</p> : <p>Drag & drop a CSV file here, or click to select</p>}
          </Box>

          {csvPreview.length > 0 && (
            <Box mb={3}>
              <Typography variant="h6">📊 CSV Preview (First 5 Rows)</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(csvPreview[0]).map((header) => (
                        <TableCell key={header}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {csvPreview.map((row, idx) => (
                      <TableRow key={idx}>
                        {Object.values(row).map((val, i) => (
                          <TableCell key={i}>{val}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmitCSV} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Upload & Classify'}
          </Button>
        </motion.div>
      )}

      {tab === 1 && (
        <motion.div
          key="manual-tab"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <Box mb={2}>
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={manualSubject}
              onChange={(e) => setManualSubject(e.target.value)}
            />
            <TextField
              label="Sender"
              fullWidth
              margin="normal"
              value={manualSender}
              onChange={(e) => setManualSender(e.target.value)}
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={manualContent}
              onChange={(e) => setManualContent(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleSubmitManual} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Classify Manually'}
            </Button>
          </Box>
        </motion.div>
      )}

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">📈 Summary</Typography>
          <Typography>Total: {results.length} | 🚨 Spam: {spamCount} | ✅ Legit: {legitCount}</Typography>

          <FormControl style={{ marginTop: '15px', minWidth: '200px' }}>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="spam">Spam Only</MenuItem>
              <MenuItem value="legit">Legit Only</MenuItem>
            </Select>
          </FormControl>

          <Box mt={3}>
            {filteredResults.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  style={{
                    marginBottom: '15px',
                    backgroundColor: item.is_spam ? '#ffebee' : '#e8f5e9',
                    borderLeft: `6px solid ${item.is_spam ? '#d32f2f' : '#388e3c'}`,
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1">
                      <MarkEmailUnreadIcon fontSize="small" /> <strong>Subject:</strong> {item.subject}
                    </Typography>
                    <Typography variant="subtitle2">
                      <strong>Sender:</strong> {item.sender}
                    </Typography>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>View Content</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{item.content}</Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Typography variant="body2" mt={1}>
                      <strong>Status:</strong>{' '}
                      {item.is_spam ? <><WarningIcon color="error" /> Spam</> : <><CheckCircleIcon color="success" /> Legit</>}
                    </Typography>
                    <Typography variant="caption" display="block">
                      <strong>Timestamp:</strong> {item.timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
      )}

      <ToastContainer />
    </Box>
    </Layout>
  );
}

export default UploadCSV;
