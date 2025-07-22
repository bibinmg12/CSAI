// // components/PasswordCheckCard.js
// import React from "react";
// import {
//   Paper,
//   Box,
//   Typography,
//   Divider,
//   Grid,
// } from "@mui/material";
// import { CheckCircle, Error as ErrorIcon, Info } from "@mui/icons-material";

// const getStatusIcon = (type) => {
//   switch (type) {
//     case "safe":
//       return <CheckCircle color="success" />;
//     case "danger":
//       return <ErrorIcon color="error" />;
//     default:
//       return <Info color="info" />;
//   }
// };

// const ResultItem = ({ title, data }) => (
//   <Grid item xs={12} sm={6}>
//     <Typography variant="subtitle2" color="text.secondary">
//       {title}
//     </Typography>
//     <Typography variant="body1" gutterBottom>
//       {data || "N/A"}
//     </Typography>
//   </Grid>
// );

// export default function PasswordCheckCard({ result }) {
//   console.log("password leaked is:::",result)
//   const status = result?.leaked ? "danger" : "safe";

//   return (
//     <Paper elevation={6} sx={{ mt: 4, p: 2, borderRadius: 3, background: "linear-gradient(45deg, #f44336, #e57373)", color: "#fff" }}>
//       <Box display="flex" alignItems="center" mb={2}>
//         {getStatusIcon(status)}
//         <Typography variant="h6" ml={1}>Password Exposure</Typography>
//       </Box>

//       <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />

//       <Typography variant="h6">
//         {result?.leaked ? "Leaked Password!" : "Safe Password"}
//       </Typography>

//       <Grid container spacing={2} mt={2}>
//         <ResultItem title="Hash" data={result?.hash} />
//       </Grid>
//     </Paper>
//   );
// }



// components/PasswordCheckCard.js
import React from "react";
import {
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { CheckCircle, Error as ErrorIcon, Info } from "@mui/icons-material";

const getStatusIcon = (type) => {
  switch (type) {
    case "safe":
      return <CheckCircle color="success" />;
    case "danger":
      return <ErrorIcon color="error" />;
    default:
      return <Info color="info" />;
  }
};

const ResultItem = ({ title, data }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {data !== undefined ? data : "N/A"}
    </Typography>
  </Grid>
);

export default function PasswordCheckCard({ result }) {
  console.log("password leaked is:::", result);

  // ✅ Fix: use correct field from response
  const status = result?.password_leaked ? "danger" : "safe";

  return (
    <Paper elevation={6} sx={{
      mt: 4, p: 2, borderRadius: 3,
      background: status === "danger"
        ? "linear-gradient(45deg, #f44336, #e57373)"
        : "linear-gradient(45deg, #4caf50, #81c784)",
      color: "#fff"
    }}>
      <Box display="flex" alignItems="center" mb={2}>
        {getStatusIcon(status)}
        <Typography variant="h6" ml={1}>Password Exposure</Typography>
      </Box>

      <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />

      <Typography variant="h6">
        {result?.password_leaked ? "Leaked Password!" : "Safe Password"}
      </Typography>

      <Grid container spacing={2} mt={2}>
        {/* <ResultItem title="Hash" data={result?.hash} /> */}
        <ResultItem title="Leak Count" data={result?.leak_count} />
      </Grid>
    </Paper>
  );
}
