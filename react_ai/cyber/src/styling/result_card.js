// import React from "react";
// import {
//   Box,
//   Typography,
//   CardContent,
//   Grid,
//   Chip,
//   Paper,
//   Divider,
//   Tooltip,
//   CircularProgress,
//   useTheme,
// } from "@mui/material";
// import {
//   CheckCircle,
//   Error as ErrorIcon,
//   Warning as WarningIcon,
//   Info,
//   Lock,
//   Email,
//   Security,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { Fade } from "react-awesome-reveal";
// import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab';
// import { DataGrid } from "@mui/x-data-grid";

// // 🎯 Animations
// const fadeMotion = {
//   initial: { opacity: 0, y: 30 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 },
// };

// // ✅ Status Icons
// const getStatusIcon = (type) => {
//   switch (type) {
//     case "safe":
//       return <CheckCircle color="success" />;
//     case "warning":
//       return <WarningIcon color="warning" />;
//     case "danger":
//       return <ErrorIcon color="error" />;
//     default:
//       return <Info color="info" />;
//   }
// };

// // ✅ Title + Data Display
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

// // ✅ Summary Card
// const SummaryCard = ({ result }) => (
//   <Paper
//     elevation={4}
//     sx={{
//       mb: 3,
//       p: 2,
//       borderRadius: 3,
//       background: "linear-gradient(45deg, #283593, #5c6bc0)",
//       color: "#fff",
//     }}
//   >
//     <Grid container spacing={2}>
//       <Grid item xs={4}>
//         <Typography variant="subtitle2">
//           <Email fontSize="small" /> Breaches
//         </Typography>
//         <Typography variant="h6">
//           {result?.breaches?.length || result?.analytics?.breaches?.length || 0}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="subtitle2">
//           <Lock fontSize="small" /> Password Exposed
//         </Typography>
//         <Typography variant="h6">
//           {result?.exposed ? "Yes" : "No"}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="subtitle2">
//           <Security fontSize="small" /> Risk Score
//         </Typography>
//         <Typography variant="h6">
//           {result?.risk_score || "Moderate"}
//         </Typography>
//       </Grid>
//     </Grid>
//   </Paper>
// );

// // ✅ Main Result Card
// export default function ResultCard({ result, type }) {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";

//   const bgGradient =
//     type === "email"
//       ? "linear-gradient(45deg, #2196f3, #21cbf3)"
//       : type === "analytics"
//       ? "linear-gradient(45deg, #9c27b0, #e040fb)"
//       : "linear-gradient(45deg, #f44336, #e57373)";

//   const status = result?.status || "info";

//   // ✅ Optional: DataGrid for large breach lists
//   const renderDataGrid = result?.breaches?.length > 8;

//   return (
//     <motion.div {...fadeMotion}>
//       <Fade triggerOnce>
//         <Paper
//           elevation={6}
//           sx={{
//             mt: 4,
//             borderRadius: 3,
//             background: bgGradient,
//             color: "#fff",
//             p: 2,
//           }}
//         >
//           <CardContent>
//             <Box display="flex" alignItems="center" mb={2}>
//               {getStatusIcon(status)}
//               <Typography variant="h6" ml={1}>
//                 {type === "email"
//                   ? "Email Breach Results"
//                   : type === "analytics"
//                   ? "Breach Analytics"
//                   : "Password Exposure"}
//               </Typography>
//             </Box>

//             <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />

//             <SummaryCard result={result} />

//             <Grid container spacing={2}>
//               {type === "email" && (
//                 <>
//                   <ResultItem title="Email" data={result.email} />
//                   <ResultItem
//                     title="Breach Count"
//                     data={result.breaches?.length}
//                   />
//                   <Grid item xs={12}>
//                     {renderDataGrid ? (
//                       <DataGrid
//                         autoHeight
//                         rows={result.breaches.map((b, i) => ({
//                           id: i,
//                           breach: b,
//                         }))}
//                         columns={[{ field: "breach", headerName: "Breach", flex: 1 }]}
//                         disableRowSelectionOnClick
//                         sx={{
//                           backgroundColor: "#fff",
//                           color: "#000",
//                           borderRadius: 2,
//                         }}
//                       />
//                     ) : (
//                       result.breaches?.map((b, i) => (
//                         <Chip
//                           key={i}
//                           label={b}
//                           sx={{
//                             m: 0.5,
//                             bgcolor: "rgba(255,255,255,0.2)",
//                             color: "#fff",
//                           }}
//                         />
//                       ))
//                     )}
//                   </Grid>
//                 </>
//               )}

//               {type === "analytics" && (
//                 <>
//                   <ResultItem title="Email" data={result.email} />
//                   <ResultItem
//                     title="Exposed In"
//                     data={result.analytics?.breaches?.length || 0}
//                   />
//                   <ResultItem
//                     title="First Breach"
//                     data={result.analytics?.first_breach || "Unknown"}
//                   />
//                   <ResultItem
//                     title="Latest Breach"
//                     data={result.analytics?.last_breach || "Unknown"}
//                   />
//                   <Grid item xs={12}>
//                     <Typography variant="body2">
//                       {result.analytics?.description || "No analytics found."}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="subtitle2" gutterBottom>
//                       Timeline
//                     </Typography>
//                     <Timeline position="right">
//                       {result.analytics?.breaches?.slice(0, 5).map((event, i) => (
//                         <TimelineItem key={i}>
//                           <TimelineSeparator>
//                             <TimelineDot color="secondary" />
//                             {i !== result.analytics.breaches.length - 1 && (
//                               <TimelineConnector />
//                             )}
//                           </TimelineSeparator>
//                           <TimelineContent>{event}</TimelineContent>
//                         </TimelineItem>
//                       ))}
//                     </Timeline>
//                   </Grid>
//                 </>
//               )}

//               {type === "password" && (
//                 <>
//                   <ResultItem
//                     title="Exposed"
//                     data={result.exposed ? "Yes" : "No"}
//                   />
//                   <ResultItem
//                     title="Times Found"
//                     data={result.times_found || 0}
//                   />
//                   {result.advice && (
//                     <Grid item xs={12}>
//                       <Tooltip title="Security Tip" arrow>
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             background: "rgba(255,255,255,0.15)",
//                             p: 1,
//                             borderRadius: 2,
//                           }}
//                         >
//                           🔐 {result.advice}
//                         </Typography>
//                       </Tooltip>
//                     </Grid>
//                   )}
//                 </>
//               )}
//             </Grid>
//           </CardContent>
//         </Paper>
//       </Fade>
//     </motion.div>
//   );
// }

// // ✅ Optional Loading Spinner
// export const LoadingSpinner = () => (
//   <Box textAlign="center" mt={4}>
//     <CircularProgress />
//     <Typography mt={1}>Checking...</Typography>
//   </Box>
// );







import React from "react";
import {
  Box,
  Typography,
  CardContent,
  Grid,
  Chip,
  Paper,
  Divider,
  Tooltip,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info,
  Email,
} from "@mui/icons-material";
import { BarChart as BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
} from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";


// 🎯 Animations
const fadeMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// ✅ Status Icons
const getStatusIcon = (type) => {
  switch (type) {
    case "safe":
      return <CheckCircle color="success" />;
    case "warning":
      return <WarningIcon color="warning" />;
    case "danger":
      return <ErrorIcon color="error" />;
    default:
      return <Info color="info" />;
  }
};

// ✅ Reusable Item Component
const ResultItem = ({ title, data }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {data || "N/A"}
    </Typography>
  </Grid>
);

// ✅ Summary Card
const SummaryCard = ({ result, type }) => (
  <Paper
    elevation={4}
    sx={{
      mb: 3,
      p: 2,
      borderRadius: 3,
      background: "linear-gradient(45deg, #283593, #5c6bc0)",
      color: "#fff",
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="subtitle2">
          <Email fontSize="small" /> {result.label}
        </Typography>

        <Typography variant="h6">
          {type === "password"
            ? result.leaked
              ? "Leaked Password!"
              : "Safe Password"
            : type === "email"
            ? `${result.total} Breaches`
            : result.total || 0}
        </Typography>



        {/* <Typography variant="h6">
          {type === "password"
            ? result.leaked
              ? "Leaked Password!"
              : "Safe Password"
            : result.total || 0}
        </Typography> */}
      </Grid>

      {type === "analytics" && (
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            <BarChart2 fontSize="small" /> Stats
          </Typography>
          <Typography variant="body2">
            Total Sources: {result?.stats?.sourceCount || "N/A"}
            <br />
            Last Breach: {result?.stats?.lastBreach || "N/A"}
          </Typography>
        </Grid>
      )}
    </Grid>
  </Paper>
);

// 🔍 Detailed Analytics View
const DetailedAnalyticsCard = ({ dataaaaa }) => {
  const {
    BreachMetrics = {},
    BreachesSummary = {},
    ExposedBreaches = {},
  } = dataaaaa;

  const industryData = BreachMetrics.industry?.[0] || [];
  const passwordStats = BreachMetrics.passwords_strength?.[0] || {};
  const risk = BreachMetrics.risk?.[0] || {};
  const xposed = BreachMetrics.xposed_data?.[0]?.children || [];
  const yearwise = BreachMetrics.yearwise_details?.[0] || {};
  const breachDetails = ExposedBreaches.breaches_details || [];

  return (
    <Box sx={{ my: 4 }}>
      <Fade>
        <Typography variant="h5" gutterBottom>
          🛡️ Breach Summary for {BreachesSummary.site || "Unknown"}
        </Typography>
      </Fade>

      <Grid container spacing={2}>
        <ResultItem title="Risk Level" data={`${risk.risk_label} (${risk.risk_score})`} />
        <ResultItem title="Easy to Crack Passwords" data={passwordStats.EasyToCrack} />
        <ResultItem title="Plaintext Passwords" data={passwordStats.PlainText} />
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Industry Impact */}
      <Typography variant="h6" gutterBottom>Industry Impact</Typography>
      <Grid container spacing={1}>
        {industryData.map(([industryCode, count]) => (
          <Grid item key={industryCode}>
            <Chip label={`${industryCode.toUpperCase()}: ${count}`} color={count > 0 ? "error" : "default"} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Xposed Data */}
      <Typography variant="h6" gutterBottom>📂 Exposed Data Types</Typography>
      {xposed.map((section) => (
        <Accordion key={section.name}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{section.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.children.map((item) => (
              <Typography key={item.name}>- {item.name}: {item.value}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Yearwise Details */}
      <Typography variant="h6" gutterBottom>📅 Breaches Over the Years</Typography>
      <Timeline>
        {Object.entries(yearwise).map(([year, value]) =>
          value > 0 && (
            <TimelineItem key={year}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>{year.replace("y", "")}: {value} Breaches</Typography>
              </TimelineContent>
            </TimelineItem>
          )
        )}
      </Timeline>

      <Divider sx={{ my: 2 }} />

      {/* Breach Details */}
      <Typography variant="h6" gutterBottom>🔍 Detailed Breach Information</Typography>
      {breachDetails.map((breach) => (
        <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }} key={breach.breach}>
          <Typography variant="subtitle1">{breach.breach}</Typography>
          <Typography variant="body2">{breach.details}</Typography>
          <Typography variant="caption">Industry: {breach.industry}</Typography>
          <br />
          <a href={breach.references} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Paper>
      ))}
    </Box>
  );
};

// ✅ Main Component
export default function ResultCard({ result, type }) {
  const theme = useTheme();
  const status = result?.status || "info";
  let breaches = [];
  let summaryData = {};

  const bgGradient =
    type === "email"
      ? "linear-gradient(45deg, #2196f3, #21cbf3)"
      : type === "analytics"
      ? "linear-gradient(45deg, #9c27b0, #e040fb)"
      : "linear-gradient(45deg, #f44336, #e57373)";


  if (type === "email") {
  const rawBreaches = result?.breaches || [];
  breaches = Array.isArray(rawBreaches[0]) ? rawBreaches[0] : rawBreaches;

  summaryData = {
    total: breaches.length,
    label: "Email Breaches",
  };
}

  // if (type === "email") {
  //   breaches = result?.breaches || [];
  //   summaryData = {
  //     total: breaches.length,
  //     label: "Email Breaches",
  //   };
  // } 
  else if (type === "analytics") {
    breaches = result?.analytics?.breaches || [];
    summaryData = {
      total: breaches.length,
      stats: result?.analytics?.stats || {},
      label: "Breach Analytics",
    };
  } else if (type === "password") {
    summaryData = {
      leaked: result?.leaked,
      hash: result?.hash,
      label: "Password Check",
    };
  }

  const renderDataGrid = breaches.length > 8;

  return (
    <motion.div {...fadeMotion}>
      <Fade triggerOnce>
        <Paper
          elevation={6}
          sx={{
            mt: 4,
            borderRadius: 3,
            background: bgGradient,
            color: "#fff",
            p: 2,
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              {getStatusIcon(status)}
              <Typography variant="h6" ml={1}>
                {type === "email"
                  ? "Email Breach Results"
                  : type === "analytics"
                  ? "Breach Analytics"
                  : "Password Exposure"}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />

            {/* 📊 Summary */}
            <SummaryCard result={summaryData} type={type} />

            {/* 🧩 Details */}
            <Grid container spacing={2}>
              {type === "email" && (
                <>
                  <ResultItem title="Email" data={result.email} />
                  <ResultItem title="Breach Count" data={breaches.length} />
                  <Grid item xs={12}>
                    {renderDataGrid ? (
                      <DataGrid
                        autoHeight
                        rows={breaches.map((b, i) => ({
                          id: i,
                          name: b.name || b,
                          description: b.description || "N/A",
                        }))}
                        columns={[
                          { field: "name", headerName: "Breach", flex: 1 },
                          {
                            field: "description",
                            headerName: "Description",
                            flex: 2,
                          },
                        ]}
                        disableRowSelectionOnClick
                        sx={{
                          backgroundColor: "#fff",
                          color: "#000",
                          borderRadius: 2,
                        }}
                      />
                    ) : (
                      breaches.map((b, i) => (
                        <Chip
                          key={i}
                          label={b.name || b}
                          sx={{
                            m: 0.5,
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "#fff",
                          }}
                        />
                      ))
                    )}
                  </Grid>
                </>
              )}


              {/* 🧩 Details */}
              {type === "analytics" && result?.analytics?.BreachMetrics ? (
                <DetailedAnalyticsCard dataaaaa={result.analytics} />
              ) : (
                <Grid container spacing={2}>
                  {type === "email" && (
                    <>
                      <ResultItem title="Email" data={result.email} />
                      <ResultItem title="Breach Count" data={breaches.length} />
                      <Grid item xs={12}>
                        {renderDataGrid ? (
                          <DataGrid
                            autoHeight
                            rows={breaches.map((b, i) => ({
                              id: i,
                              name: b.name || b,
                              description: b.description || "N/A",
                            }))}
                            columns={[
                              { field: "name", headerName: "Breach", flex: 1 },
                              {
                                field: "description",
                                headerName: "Description",
                                flex: 2,
                              },
                            ]}
                            disableRowSelectionOnClick
                            sx={{
                              backgroundColor: "#fff",
                              color: "#000",
                              borderRadius: 2,
                            }}
                          />
                        ) : (
                          breaches.map((b, i) => (
                            <Chip
                              key={i}
                              label={b.name || b}
                              sx={{
                                m: 0.5,
                                bgcolor: "rgba(255,255,255,0.3)",
                                color: "#fff",
                              }}
                            />
                          ))
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
              )}
              {type === "password" && (
                <>
                  <ResultItem
                    title="Exposed"
                    data={result.leaked ? "Yes" : "No"}
                  />
                  <ResultItem
                    title="Times Found"
                    data={result.times_found || 0}
                  />
                  <ResultItem title="Hash" data={result.hash} />
                  {result.advice && (
                    <Grid item xs={12}>
                      <Tooltip title="Security Tip" arrow>
                        <Typography
                          variant="body2"
                          sx={{
                            background: "rgba(255,255,255,0.15)",
                            p: 1,
                            borderRadius: 2,
                          }}
                        >
                          🔐 {result.advice}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
            {/* 🔍 Expandable Raw JSON */}
<Accordion sx={{ mt: 2, backgroundColor: "rgba(255,255,255,0.05)", color: "#fff" }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
    aria-controls="raw-json-content"
    id="raw-json-header"
  >
    <Typography>
      <CodeIcon fontSize="small" sx={{ mr: 1 }} />
      View Raw JSON
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <JsonViewer data={result} />
  </AccordionDetails>
</Accordion>
          </CardContent>
        </Paper>
      </Fade>
    </motion.div>
  );
}

// ✅ Optional Loading Spinner
export const LoadingSpinner = () => (
  <Box textAlign="center" mt={4}>
    <CircularProgress />
    <Typography mt={2}>Loading...</Typography>
  </Box>
);


export const JsonViewer = ({ data }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#90ee90",
        p: 2,
        mt: 2,
        borderRadius: 2,
        maxHeight: 300,
        overflow: "auto",
        fontSize: "0.75rem",
      }}
    >
      {JSON.stringify(data, null, 2)}
    </Box>
  );
};