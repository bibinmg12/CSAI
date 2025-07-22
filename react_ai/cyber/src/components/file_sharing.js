// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Card, CardContent, Typography, Button, Snackbar, IconButton, TextField, CircularProgress,
//   Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions,
//   Autocomplete, LinearProgress, Grid, Tooltip, CardHeader,Stack,Badge
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import MuiAlert from '@mui/material/Alert';
// import { useDropzone } from 'react-dropzone';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import SendIcon from '@mui/icons-material/Send';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import FolderIcon from '@mui/icons-material/Folder';
// import KeyIcon from '@mui/icons-material/VpnKey';
// import DownloadIcon from '@mui/icons-material/Download';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import Layout from '../components/Layout';
// import { useNavigate } from 'react-router-dom';
// const API_BASE = 'http://localhost:8000';
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// const SecureFileSharePage = () => {
//   const [loginid, setLoginid] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [recipientLoginId, setRecipientLoginId] = useState('');
//   const [sharedFiles, setSharedFiles] = useState([]);
//   const [key, setKey] = useState('');
//   const [filename, setFilename] = useState('');
//   const [decryptionKey, setDecryptionKey] = useState('');
//   const [decryptedFile, setDecryptedFile] = useState('');
//   const [keyVault, setKeyVault] = useState([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [loading, setLoading] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [keyVaultExpanded, setKeyVaultExpanded] = useState(true);
//   const [userMap, setUserMap] = useState({});
//   const [vaultDialogOpen, setVaultDialogOpen] = useState(false);
//   const [vaultKey, setVaultKey] = useState('');
//   const [fileKeys, setFileKeys] = useState({});
//   const [vaultFilename, setVaultFilename] = useState('');
//   const [otpDialogOpen, setOtpDialogOpen] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpInput, setOtpInput] = useState('');
//   const [currentFileId, setCurrentFileId] = useState('');
//   const navigate = useNavigate();
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/check-session/', {
//           withCredentials: true,
//         });
//         if (!res.data.valid) {
//           navigate('/');
//         }
//       } catch (err) {
//         navigate('/log');
//       }
//     };
//     checkSession();
//   }, []);
//   useEffect(() => {
//     const storedLoginid = localStorage.getItem('loginid');
//     if (storedLoginid) {
//       setLoginid(storedLoginid);
//     } else {
//       setSnackbar({ open: true, message: 'Login ID not found. Please login first.', severity: 'error' });
//     }
//   }, []);
//   useEffect(() => {
//     if (loginid) {
//       fetchUsers();
//       fetchReceivedFiles();
//       fetchKeyVault();
//     }
//   }, [loginid]);
//   const fetchUsers = async () => {
//   try {
//     const res = await axios.get(`${API_BASE}/fetch-users/`);
//     setUsers(res.data);
//     const map = {};
//     res.data.forEach(u => { map[u.loginid] = u.name });
//     setUserMap(map);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//   }
// };
//   const fetchReceivedFiles = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/fetch-received-files/`, { headers: { loginid } });
//       setSharedFiles(res.data.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)));
//     } catch (err) {
//       console.error('Error fetching received files:', err);
//     }
//   };
//   const fetchKeyVault = async () => {
//   try {
//     const res = await axios.get(`${API_BASE}/get-file-keys/`, { headers: { loginid } });
//     console.log('Key Vault Data:', res.data); // <--- add this
//     setKeyVault(res.data.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)));
//   } catch (err) {
//     console.error('Error fetching key vault:', err);
//   }
// };
// const handleRequestOTP = async (file_id) => {
//   const cleanFileId = typeof file_id === 'object' && file_id.$oid ? file_id.$oid : file_id;
//   try {
//     await axios.post(`${API_BASE}/send-otp/`, { loginid, file_id: cleanFileId });
//     setCurrentFileId(cleanFileId);
//     setOtpDialogOpen(true);
//     setOtpSent(true);
//     setSnackbar({ open: true, message: 'OTP sent to your registered email.', severity: 'info' });
//   } catch (err) {
//     setSnackbar({ open: true, message: 'Failed to send OTP.', severity: 'error' });
//     console.error(err);
//   }
// };
// const handleVerifyOTP = async () => {
//   try {
//     const res = await axios.post(`${API_BASE}/verify-otp-key/`, {
//       loginid,
//       file_id: currentFileId,
//       otp: otpInput
//     });
//     const decryptionKey = res.data.key;
//     setFileKeys((prev) => ({
//       ...prev,
//       [currentFileId]: decryptionKey,
//     }));
//     setDecryptionKey(decryptionKey);
//     setOtpDialogOpen(false);
//     setSnackbar({ open: true, message: 'OTP verified. Key retrieved.', severity: 'success' });
//   } catch (err) {
//     setSnackbar({ open: true, message: 'Invalid OTP or verification failed.', severity: 'error' });
//     console.error(err);
//   }
// };
// const fetchKeyForFile = async (filename) => {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/fetch-file-key/`,
//       { filename },
//       { headers: { loginid } }
//     );
//     setFileKeys((prev) => ({
//       ...prev,
//       [filename]: res.data.key,
//     }));
//   } catch (err) {
//     alert("Unable to fetch key.");
//     console.error(err);
//   }
// };
//   const handleOpenVaultForFile = (filename) => {
//   const match = keyVault.find(k => k.filename === filename && k.receiver_loginid === loginid);
//   if (match) {
//     setVaultKey(match.key);
//     setVaultFilename(filename);
//     setVaultDialogOpen(true);
//   } else {
//     setSnackbar({ open: true, message: 'Key not found in vault for this file.', severity: 'warning' });
//   }
// };
//   const handleUpload = async () => {
//     if (!selectedFile || !recipientLoginId) {
//       return setSnackbar({ open: true, message: 'File or recipient missing', severity: 'error' });
//     }
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('recipient_loginid', recipientLoginId);
//     try {
//       const res = await axios.post(`${API_BASE}/upload-and-encrypt/`, formData, {
//         headers: { loginid, 'Content-Type': 'multipart/form-data' },
//       });
//       setFilename(res.data.encrypted_filename);
//       console.log("Encrypted filename:", res.data.encrypted_filename);
//       console.log("Encrypted filename:", res.data);
//       setKey(res.data.key);
//       navigator.clipboard.writeText(res.data.key);
//       setSnackbar({ open: true, message: res.data.message + ' Key copied to clipboard.', severity: 'success' });
//       fetchKeyVault();
//       setSelectedFile(null);
//     } catch (err) {
//       console.error('Error uploading file:', err);
//       setSnackbar({ open: true, message: 'Upload failed', severity: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleDecrypt = async () => {
//     if (!filename || !decryptionKey) {
//       return setSnackbar({ open: true, message: 'Missing filename or key', severity: 'error' });
//     }
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('filename', filename);
//     formData.append('key', decryptionKey);
//     try {
//       const res = await axios.post(`${API_BASE}/decrypt-file/`, formData);
//       setDecryptedFile(res.data.file_data);
//       setPreviewOpen(true);
//     } 
//     catch (err) {
//       setSnackbar({ open: true, message: 'Decryption failed', severity: 'error' });
//       console.error('Error decrypting file:', err);
//     } 
//     finally {
//       setLoading(false);
//     }
//   };
//   const onDrop = (acceptedFiles) => {
//     if (acceptedFiles.length) {
//       setSelectedFile(acceptedFiles[0]);
//     }
//   };
//   const getMimeType = (base64) => {
//   const prefix = base64.substring(0, 5);
//   if (prefix.startsWith('/9j')) return 'image/jpeg';
//   if (prefix.startsWith('iVB')) return 'image/png';
//   if (prefix.startsWith('AAAAF')) return 'video/mp4';
//   return 'application/octet-stream';
// };
// const getFileExtension = (mimeType) => {
//   switch (mimeType) {
//     case 'image/jpeg': return 'jpg';
//     case 'image/png': return 'png';
//     case 'video/mp4': return 'mp4';
//     default: return 'bin';
//   }
// };
// const mimeType = getMimeType(decryptedFile);
// const fileExtension = getFileExtension(mimeType);
// const dataUrl = `data:${mimeType};base64,${decryptedFile}`;
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//   return (
//     <>
//     <Layout> 
//     <Box sx={{
//       padding: 4,
//       minHeight: '100vh',
//       background: 'linear-gradient(to right, #f0f2f5, #d6e4f0)',
//     }}>
//       <Typography variant="h4" gutterBottom>🔐 Secure File Sharing</Typography>
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom><SendIcon sx={{ mr: 1 }} /> Encrypt & Share Panel</Typography>
//           <Box {...getRootProps()} sx={{ border: '2px dashed gray', p: 2, mb: 2, textAlign: 'center' }}>
//             <input {...getInputProps()} />
//             {isDragActive ? 'Drop the file here...' : (selectedFile ? selectedFile.name : 'Drag & drop or click to select file')}
//           </Box>
//           {selectedFile && selectedFile.type.startsWith("image") && (
//             <Box sx={{
//               mb: 2, textAlign: 'center',
//               border: '1px solid #ccc',
//               borderRadius: '12px',
//               padding: 1,
//               maxWidth: 400,
//               margin: 'auto',
//               backgroundColor: '#f9f9f9'
//             }}>
//               <img
//                 src={URL.createObjectURL(selectedFile)}
//                 alt="Preview"
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                   borderRadius: '10px',
//                   objectFit: 'contain'
//                 }}/>
//             </Box>
//           )}
//           <Autocomplete
//             options={users.map(u => ({ label: u.name, value: u.loginid }))}
//             onChange={(e, val) => setRecipientLoginId(val?.value || '')}
//             renderInput={(params) => <TextField {...params} label="Select Recipient" fullWidth />}
//             sx={{ mb: 2 }}/>
//           <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
//             {loading ? <CircularProgress size={24} color="inherit" /> : 'Encrypt & Share'}</Button>
//           {key && filename && (
//             <Box mt={2}>
//               <Typography>Encrypted File: {filename}</Typography>
//               <Typography>Key: {key} <Tooltip title="Copy to clipboard"><IconButton onClick={() => navigator.clipboard.writeText(key)}><FileCopyIcon /></IconButton></Tooltip></Typography>
//               <Button href={`http://localhost:8000/media/encrypted/${filename}`} download>Download</Button>
//             </Box>
//           )}
//         </CardContent> </Card>
//     <Card sx={{ mb: 4, borderLeft: '5px solid #3f51b5', backgroundColor: '#f5f7fa' }}>
//   <CardHeader
//     avatar={<FolderIcon color="primary" />}
//     title="📁 Received Files Section"
//     titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}  />
//   <CardContent>
//     {sharedFiles.map(file => {
//       const fileId = file._id?.$oid || file._id;
//       const decryptionKeyValue = fileKeys[fileId] || decryptionKey;
//       return (
//         <Accordion key={file.filename} TransitionProps={{ unmountOnExit: true }}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Badge
//                 // badgeContent="Encrypted"
//                 color="secondary"
//                 sx={{ ml: 1 }}  >
//                 <Typography fontWeight="bold">
//                   {file.original_filename}
//                 </Typography>
//               </Badge>
//               <Typography sx={{ ml: 2 }} color="text.secondary">
//                 from {userMap[file.sender_loginid] || file.sender_loginid}
//               </Typography>
//             </Stack>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Stack spacing={2}>
//               <Stack direction="row" spacing={2}>
//                 <Button
//                   href={`http://localhost:8000/media/encrypted/${file.filename}`}
//                   download
//                   startIcon={<DownloadIcon />}
//                   variant="outlined"
//                   color="success"   >
//                   Download
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={() => {
//                     setFilename(file.filename);
//                     handleDecrypt();
//                   }}
//                   startIcon={<LockOpenIcon />}
//                   disabled={loading}  >
//                   {loading ? <CircularProgress size={20} /> : 'Decrypt'}
//                 </Button>
//               </Stack>
//               <TextField
//   label="Enter decryption key"
//   fullWidth
//   sx={{ my: 1 }}
//   value={fileKeys[file._id?.$oid || file._id] || ''}
//   onChange={(e) => {
//     const id = file._id?.$oid || file._id;
//     setFileKeys(prev => ({
//       ...prev,
//       [id]: e.target.value,
//     }));
//   }}
//   InputProps={{
//     startAdornment: <KeyIcon sx={{ mr: 1 }} color="action" />
//   }}
// />
//               {fileKeys[fileId] && (
//                 <Alert severity="success" icon={<VerifiedIcon fontSize="inherit" />}>
//                   Decryption Key: <strong>{fileKeys[fileId]}</strong>
//                 </Alert>
//               )}
//               <Tooltip title="Enter OTP to retrieve file decryption key from Key Vault">
//                 <Button
//                   onClick={() => {
//                     const id = typeof file._id === 'object' && file._id.$oid ? file._id.$oid : file._id;
//                     console.log("full details::", file);
//                     console.log("allo::", id);
//                     handleRequestOTP(id);
//                     setCurrentFileId(id);
//                     setOtpDialogOpen(true);
//                   }}
//                   sx={{
//                     mt: 1,
//                     background: 'linear-gradient(to right, #6a11cb, #2575fc)',
//                     color: 'white',
//                     '&:hover': {
//                       background: 'linear-gradient(to right, #5f0ac6, #1f65fc)',
//                     },
//                   }}
//                   variant="contained"
//                   color="info"  >
//                   Key Vault
//                 </Button>
//               </Tooltip>
//             </Stack>
//           </AccordionDetails>
//         </Accordion>
//       );
//     })}
//   </CardContent>
//   <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
//     <DialogTitle>
//       🔐 Enter OTP
//     </DialogTitle>
//     <DialogContent>
//       {otpSent && (
//         <TextField
//           label="Enter OTP"
//           fullWidth
//           value={otpInput}
//           onChange={(e) => setOtpInput(e.target.value)}
//           sx={{ mt: 1 }}  />
//       )}
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
//       <Button
//         variant="contained"
//         onClick={handleVerifyOTP}   >
//         Verify & Get Key
//       </Button>
//     </DialogActions>
//   </Dialog>
// </Card>
//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom><KeyIcon sx={{ mr: 1 }} /> Key Vault Section</Typography>
//           <Button onClick={() => setKeyVaultExpanded(!keyVaultExpanded)}>{keyVaultExpanded ? 'Collapse' : 'Expand'} Vault</Button>
//           {keyVaultExpanded && (
//             <Box mt={2} style={{ height: 300 }}>
//               <DataGrid
//                 rows={keyVault.map((k, i) => ({ id: i, ...k }))}
//                 columns={[
//   { field: 'original_filename', headerName: 'Filename', flex: 1 },
//   { field: 'key', headerName: 'Key', flex: 1 },
//   {
//     field: 'receiver_loginid',
//     headerName: 'Recipient',
//     flex: 1,
//     renderCell: (params) => userMap[params.value] || params.value
//   },
// ]}
//                 pageSize={5}/>
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//       <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>📂 Decrypted File Preview</DialogTitle>
//         <DialogContent>
//           <img
//             src={`data:image/*;base64,${decryptedFile}`}
//             alt="Preview"
//             width="100%"
//             onError={(e) => e.target.style.display = 'none'} />
//           <video
//             controls
//             width="100%"
//             src={`data:video/mp4;base64,${decryptedFile}`}
//             onError={(e) => e.target.style.display = 'none'}/> </DialogContent>
//         <DialogActions>
//           <a href={dataUrl} download={`decrypted_file.${fileExtension}`} style={{ display: 'block', marginTop: '10px' }}>
//   <Button variant="outlined" fullWidth>Download Decrypted File</Button> </a>
//           <Button onClick={() => setPreviewOpen(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={vaultDialogOpen} onClose={() => setVaultDialogOpen(false)}>
//   <DialogTitle>🔑 Key Vault</DialogTitle>
//   <DialogContent>
//     <Typography gutterBottom>
//       <strong>File:</strong> {vaultFilename}
//     </Typography>
//     <Typography gutterBottom>
//       <strong>Decryption Key:</strong> {vaultKey}
//     </Typography>
//     <Button
//       variant="outlined"
//       fullWidth
//       startIcon={<FileCopyIcon />}
//       onClick={() => {
//         navigator.clipboard.writeText(vaultKey);
//         setSnackbar({ open: true, message: 'Key copied to clipboard', severity: 'info' });
//       }}
//     >Copy Key</Button>
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setVaultDialogOpen(false)}>Close</Button>
//   </DialogActions>
// </Dialog>
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//     </Layout>
//     </>
//   );
// };
// export default SecureFileSharePage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, Typography, Button, Snackbar, IconButton, TextField, CircularProgress,
  Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions,
  Autocomplete, LinearProgress, Grid, Tooltip, CardHeader,Stack,Badge
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';
import { useDropzone } from 'react-dropzone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SendIcon from '@mui/icons-material/Send';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FolderIcon from '@mui/icons-material/Folder';
import KeyIcon from '@mui/icons-material/VpnKey';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
const API_BASE = 'http://localhost:8000';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SecureFileSharePage = () => {
  const [loginid, setLoginid] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipientLoginId, setRecipientLoginId] = useState('');
  const [sharedFiles, setSharedFiles] = useState([]);
  const [key, setKey] = useState('');

  const [filename, setFilename] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedFile, setDecryptedFile] = useState('');

  const [previewData, setPreviewData] = useState({
  open: false,
  fileId: '',
  fileData: '',
  mimeType: '',
  extension: '',
});

  const [keyVault, setKeyVault] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [keyVaultExpanded, setKeyVaultExpanded] = useState(true);
  const [userMap, setUserMap] = useState({});
  const [vaultDialogOpen, setVaultDialogOpen] = useState(false);
  const [vaultKey, setVaultKey] = useState('');
  const [fileKeys, setFileKeys] = useState({});
  const [vaultFilename, setVaultFilename] = useState('');
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [currentFileId, setCurrentFileId] = useState('');
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
    const storedLoginid = localStorage.getItem('loginid');
    if (storedLoginid) {
      setLoginid(storedLoginid);
    } else {
      setSnackbar({ open: true, message: 'Login ID not found. Please login first.', severity: 'error' });
    }
  }, []);
  useEffect(() => {
    if (loginid) {
      fetchUsers();
      fetchReceivedFiles();
      fetchKeyVault();
    }
  }, [loginid]);
  const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_BASE}/fetch-users/`);
    setUsers(res.data);
    const map = {};
    res.data.forEach(u => { map[u.loginid] = u.name });
    setUserMap(map);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};
  const fetchReceivedFiles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/fetch-received-files/`, { headers: { loginid } });
      setSharedFiles(res.data.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)));
    } catch (err) {
      console.error('Error fetching received files:', err);
    }
  };
  const fetchKeyVault = async () => {
  try {
    const res = await axios.get(`${API_BASE}/get-file-keys/`, { headers: { loginid } });
    console.log('Key Vault Data:', res.data); // <--- add this
    setKeyVault(res.data.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)));
  } catch (err) {
    console.error('Error fetching key vault:', err);
  }
};
const handleRequestOTP = async (file_id) => {
  const cleanFileId = typeof file_id === 'object' && file_id.$oid ? file_id.$oid : file_id;
  try {
    await axios.post(`${API_BASE}/send-otp/`, { loginid, file_id: cleanFileId });
    setCurrentFileId(cleanFileId);
    setOtpDialogOpen(true);
    setOtpSent(true);
    setSnackbar({ open: true, message: 'OTP sent to your registered email.', severity: 'info' });
  } catch (err) {
    setSnackbar({ open: true, message: 'Failed to send OTP.', severity: 'error' });
    console.error(err);
  }
};
const handleVerifyOTP = async () => {
  try {
    const res = await axios.post(`${API_BASE}/verify-otp-key/`, {
      loginid,
      file_id: currentFileId,
      otp: otpInput
    });
    const decryptionKey = res.data.key;
    setFileKeys((prev) => ({
      ...prev,
      [currentFileId]: decryptionKey,
    }));
    setDecryptionKey(decryptionKey);
    setOtpDialogOpen(false);
    setSnackbar({ open: true, message: 'OTP verified. Key retrieved.', severity: 'success' });
  } catch (err) {
    setSnackbar({ open: true, message: 'Invalid OTP or verification failed.', severity: 'error' });
    console.error(err);
  }
};
const fetchKeyForFile = async (filename) => {
  try {
    const res = await axios.post(
      `${API_BASE}/fetch-file-key/`,
      { filename },
      { headers: { loginid } }
    );
    setFileKeys((prev) => ({
      ...prev,
      [filename]: res.data.key,
    }));
  } catch (err) {
    alert("Unable to fetch key.");
    console.error(err);
  }
};
  const handleOpenVaultForFile = (filename) => {
  const match = keyVault.find(k => k.filename === filename && k.receiver_loginid === loginid);
  if (match) {
    setVaultKey(match.key);
    setVaultFilename(filename);
    setVaultDialogOpen(true);
  } else {
    setSnackbar({ open: true, message: 'Key not found in vault for this file.', severity: 'warning' });
  }
};
  const handleUpload = async () => {
    if (!selectedFile || !recipientLoginId) {
      return setSnackbar({ open: true, message: 'File or recipient missing', severity: 'error' });
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('recipient_loginid', recipientLoginId);
    try {
      const res = await axios.post(`${API_BASE}/upload-and-encrypt/`, formData, {
        headers: { loginid, 'Content-Type': 'multipart/form-data' },
      });
      setFilename(res.data.encrypted_filename);
      console.log("Encrypted filename:", res.data.encrypted_filename);
      console.log("Encrypted filename:", res.data);
      setKey(res.data.key);
      navigator.clipboard.writeText(res.data.key);
      setSnackbar({ open: true, message: res.data.message + ' Key copied to clipboard.', severity: 'success' });
      fetchKeyVault();
      setSelectedFile(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      setSnackbar({ open: true, message: 'Upload failed', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };


  const handleDecrypt = async (filename, key, fileId) => {
  setLoading(true);
  const formData = new FormData();
  formData.append('filename', filename);
  formData.append('key', key);
  try {
    const res = await axios.post(`${API_BASE}/decrypt-file/`, formData);
    // const base64 = res.data.file_data;
    // const mimeType = getMimeType(base64);
    // const extension = getFileExtension(mimeType);
    const base64 = res.data.file_data;
const mimeType = res.data.mime_type || getMimeType(base64); // fallback
const extension = getFileExtension(mimeType);

    setPreviewData({
      open: true,
      fileId,
      fileData: base64,
      mimeType,
      extension,
    });
  } catch (err) {
    console.error('Decryption error:', err);
    setSnackbar({ open: true, message: 'Decryption failed', severity: 'error' });
  } finally {
    setLoading(false);
  }
};


  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      setSelectedFile(acceptedFiles[0]);
    }
  };
  const getMimeType = (base64) => {
  const prefix = base64.substring(0, 5);
  if (prefix.startsWith('/9j')) return 'image/jpeg';
  if (prefix.startsWith('iVB')) return 'image/png';
  if (prefix.startsWith('AAAAF')) return 'video/mp4';
  return 'application/octet-stream';
};
const getFileExtension = (mimeType) => {
  switch (mimeType) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'video/mp4': return 'mp4';
    default: return 'bin';
  }
};
const mimeType = getMimeType(decryptedFile);
const fileExtension = getFileExtension(mimeType);
const dataUrl = `data:${mimeType};base64,${decryptedFile}`;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
    <Layout> 
    <Box sx={{
      padding: 4,
      minHeight: '100vh',
      background: 'linear-gradient(to right, #f0f2f5, #d6e4f0)',
    }}>
      <Typography variant="h4" gutterBottom>🔐 Secure File Sharing</Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom><SendIcon sx={{ mr: 1 }} /> Encrypt & Share Panel</Typography>
          <Box {...getRootProps()} sx={{ border: '2px dashed gray', p: 2, mb: 2, textAlign: 'center' }}>
            <input {...getInputProps()} />
            {isDragActive ? 'Drop the file here...' : (selectedFile ? selectedFile.name : 'Drag & drop or click to select file')}
          </Box>
          {selectedFile && selectedFile.type.startsWith("image") && (
            <Box sx={{
              mb: 2, textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: 1,
              maxWidth: 400,
              margin: 'auto',
              backgroundColor: '#f9f9f9'
            }}>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  objectFit: 'contain'
                }}/>
            </Box>
          )}
          <Autocomplete
            options={users.map(u => ({ label: u.name, value: u.loginid }))}
            onChange={(e, val) => setRecipientLoginId(val?.value || '')}
            renderInput={(params) => <TextField {...params} label="Select Recipient" fullWidth />}
            sx={{ mb: 2 }}/>
          <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Encrypt & Share'}</Button>
          {key && filename && (
            <Box mt={2}>
              <Typography>Encrypted File: {filename}</Typography>
              <Typography>Key: {key} <Tooltip title="Copy to clipboard"><IconButton onClick={() => navigator.clipboard.writeText(key)}><FileCopyIcon /></IconButton></Tooltip></Typography>
              <Button href={`http://localhost:8000/media/encrypted/${filename}`} download>Download</Button>
            </Box>
          )}
        </CardContent> </Card>
    <Card sx={{ mb: 4, borderLeft: '5px solid #3f51b5', backgroundColor: '#f5f7fa' }}>
  <CardHeader
    avatar={<FolderIcon color="primary" />}
    title="📁 Received Files Section"
    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}  />
  <CardContent>
    {sharedFiles.map(file => {
      const fileId = file._id?.$oid || file._id;
      const decryptionKeyValue = fileKeys[fileId] || decryptionKey;
      return (
        <Accordion key={file.filename} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Badge
                // badgeContent="Encrypted"
                color="secondary"
                sx={{ ml: 1 }}  >
                <Typography fontWeight="bold">
                  {file.original_filename}
                </Typography>
              </Badge>
              <Typography sx={{ ml: 2 }} color="text.secondary">
                from {userMap[file.sender_loginid] || file.sender_loginid}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Button
                  href={`http://localhost:8000/media/encrypted/${file.filename}`}
                  download
                  startIcon={<DownloadIcon />}
                  variant="outlined"
                  color="success"   >
                  Download
                </Button>

                {/* <Button
                  variant="outlined"
                  onClick={() => {
                    setFilename(file.filename);
                    handleDecrypt();
                  }}
                  startIcon={<LockOpenIcon />}
                  disabled={loading}  >
                  {loading ? <CircularProgress size={20} /> : 'Decrypt'}
                </Button> */}

                <Button
  variant="outlined"
  onClick={() => {
    const key = fileKeys[fileId];
    if (!key) {
      setSnackbar({ open: true, message: 'Enter decryption key first.', severity: 'error' });
      return;
    }
    handleDecrypt(file.filename, key, fileId);
  }}
  startIcon={<LockOpenIcon />}
  disabled={loading}>
  {loading ? <CircularProgress size={20} /> : 'Decrypt'}
</Button>


              </Stack>
              <TextField
  label="Enter decryption key"
  fullWidth
  sx={{ my: 1 }}
  value={fileKeys[file._id?.$oid || file._id] || ''}
  onChange={(e) => {
    const id = file._id?.$oid || file._id;
    setFileKeys(prev => ({
      ...prev,
      [id]: e.target.value,
    }));
  }}
  InputProps={{
    startAdornment: <KeyIcon sx={{ mr: 1 }} color="action" />
  }}
/>
              {fileKeys[fileId] && (
                <Alert severity="success" icon={<VerifiedIcon fontSize="inherit" />}>
                  Decryption Key: <strong>{fileKeys[fileId]}</strong>
                </Alert>
              )}
              <Tooltip title="Enter OTP to retrieve file decryption key from Key Vault">
                <Button
                  onClick={() => {
                    const id = typeof file._id === 'object' && file._id.$oid ? file._id.$oid : file._id;
                    console.log("full details::", file);
                    console.log("allo::", id);
                    handleRequestOTP(id);
                    setCurrentFileId(id);
                    setOtpDialogOpen(true);
                  }}
                  sx={{
                    mt: 1,
                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(to right, #5f0ac6, #1f65fc)',
                    },
                  }}
                  variant="contained"
                  color="info"  >
                  Key Vault
                </Button>
              </Tooltip>
            </Stack>
          </AccordionDetails>
        </Accordion>
      );
    })}
  </CardContent>
  <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
    <DialogTitle>
      🔐 Enter OTP
    </DialogTitle>
    <DialogContent>
      {otpSent && (
        <TextField
          label="Enter OTP"
          fullWidth
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          sx={{ mt: 1 }}  />
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
      <Button
        variant="contained"
        onClick={handleVerifyOTP}   >
        Verify & Get Key
      </Button>
    </DialogActions>
  </Dialog>
</Card>


      {/* <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom><KeyIcon sx={{ mr: 1 }} /> Key Vault Section</Typography>
          <Button onClick={() => setKeyVaultExpanded(!keyVaultExpanded)}>{keyVaultExpanded ? 'Collapse' : 'Expand'} Vault</Button>
          {keyVaultExpanded && (
            <Box mt={2} style={{ height: 300 }}>
              <DataGrid
                rows={keyVault.map((k, i) => ({ id: i, ...k }))}
                columns={[
  { field: 'original_filename', headerName: 'Filename', flex: 1 },
  { field: 'key', headerName: 'Key', flex: 1 },
  {
    field: 'receiver_loginid',
    headerName: 'Recipient',
    flex: 1,
    renderCell: (params) => userMap[params.value] || params.value
  },
]}
                pageSize={5}/>
            </Box>
          )}
        </CardContent>
      </Card> */}

      {/* <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>📂 Decrypted File Preview</DialogTitle>
        <DialogContent>
          <img
            src={`data:image/*;base64,${decryptedFile}`}
            alt="Preview"
            width="100%"
            onError={(e) => e.target.style.display = 'none'} />
          <video
            controls
            width="100%"
            src={`data:video/mp4;base64,${decryptedFile}`}
            onError={(e) => e.target.style.display = 'none'}/> </DialogContent>
        <DialogActions>
          <a href={dataUrl} download={`decrypted_file.${fileExtension}`} style={{ display: 'block', marginTop: '10px' }}>
  <Button variant="outlined" fullWidth>Download Decrypted File</Button> </a>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog> */}

      <Dialog open={previewData.open} onClose={() => setPreviewData({ ...previewData, open: false })} fullWidth maxWidth="sm">
  <DialogTitle>📂 Decrypted File Preview</DialogTitle>
  <DialogContent>
    {previewData.mimeType.startsWith('image') && (
      <img
        src={`data:${previewData.mimeType};base64,${previewData.fileData}`}
        alt="Preview"
        width="100%"
        onError={(e) => e.target.style.display = 'none'}
      />
    )}
    {previewData.mimeType.startsWith('video') && (
      <video
        controls
        width="100%"
        src={`data:${previewData.mimeType};base64,${previewData.fileData}`}
        onError={(e) => e.target.style.display = 'none'}
      />
    )}
  </DialogContent>
  <DialogActions>
    <a
      href={`data:${previewData.mimeType};base64,${previewData.fileData}`}
      download={`decrypted_file.${previewData.extension}`}
      style={{ display: 'block', marginTop: '10px' }}
    >
      <Button variant="outlined" fullWidth>Download Decrypted File</Button>
    </a>
    <Button onClick={() => setPreviewData({ ...previewData, open: false })}>Close</Button>
  </DialogActions>
</Dialog>

      <Dialog open={vaultDialogOpen} onClose={() => setVaultDialogOpen(false)}>
  <DialogTitle>🔑 Key Vault</DialogTitle>
  <DialogContent>
    <Typography gutterBottom>
      <strong>File:</strong> {vaultFilename}
    </Typography>
    <Typography gutterBottom>
      <strong>Decryption Key:</strong> {vaultKey}
    </Typography>
    <Button
      variant="outlined"
      fullWidth
      startIcon={<FileCopyIcon />}
      onClick={() => {
        navigator.clipboard.writeText(vaultKey);
        setSnackbar({ open: true, message: 'Key copied to clipboard', severity: 'info' });
      }}
    >Copy Key</Button>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setVaultDialogOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    </Layout>
    </>
  );
};
export default SecureFileSharePage;


















































