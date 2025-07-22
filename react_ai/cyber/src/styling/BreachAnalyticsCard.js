// // components/BreachAnalyticsCard.js
// import React from "react";
// import {
//   Box, Typography, Divider, Grid, Chip, Accordion,
//   AccordionSummary, AccordionDetails, Paper
// } from "@mui/material";
// import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from "@mui/lab";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Fade } from "react-awesome-reveal";

// const ResultItem = ({ title, data }) => (
//   <Grid item xs={12} sm={6}>
//     <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
//     <Typography variant="body1" gutterBottom>{data || "N/A"}</Typography>
//   </Grid>
// );

// export default function BreachAnalyticsCard({ data }) {
//   const { BreachMetrics = {}, BreachesSummary = {}, ExposedBreaches = {} } = data;

//   const industryData = BreachMetrics.industry?.[0] || [];
//   const passwordStats = BreachMetrics.passwords_strength?.[0] || {};
//   const risk = BreachMetrics.risk?.[0] || {};
//   const xposed = BreachMetrics.xposed_data?.[0]?.children || [];
//   const yearwise = BreachMetrics.yearwise_details?.[0] || {};
//   const breachDetails = ExposedBreaches.breaches_details || [];

//   return (
//     <Box sx={{ my: 4 }}>
//       <Fade>
//         <Typography variant="h5" gutterBottom>
//           🛡️ Breach Summary for {BreachesSummary.site || "Unknown"}
//         </Typography>
//       </Fade>

//       <Grid container spacing={2}>
//         <ResultItem title="Risk Level" data={`${risk.risk_label} (${risk.risk_score})`} />
//         <ResultItem title="Easy to Crack Passwords" data={passwordStats.EasyToCrack} />
//         <ResultItem title="Plaintext Passwords" data={passwordStats.PlainText} />
//       </Grid>

//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>Industry Impact</Typography>
//       <Grid container spacing={1}>
//         {industryData.map(([code, count]) => (
//           <Grid item key={code}>
//             <Chip label={`${code.toUpperCase()}: ${count}`} color={count > 0 ? "error" : "default"} />
//           </Grid>
//         ))}
//       </Grid>

//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>📂 Exposed Data Types</Typography>
//       {xposed.map((section) => (
//         <Accordion key={section.name}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>{section.name}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {section.children.map((item) => (
//               <Typography key={item.name}>- {item.name}: {item.value}</Typography>
//             ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>📅 Breaches Over the Years</Typography>
//       <Timeline>
//         {Object.entries(yearwise).map(([year, value]) =>
//           value > 0 && (
//             <TimelineItem key={year}>
//               <TimelineSeparator>
//                 <TimelineDot />
//                 <TimelineConnector />
//               </TimelineSeparator>
//               <TimelineContent>
//                 <Typography>{year.replace("y", "")}: {value} Breaches</Typography>
//               </TimelineContent>
//             </TimelineItem>
//           )
//         )}
//       </Timeline>

//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>🔍 Detailed Breach Information</Typography>
//       {breachDetails.map((breach) => (
//         <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }} key={breach.breach}>
//           <Typography variant="subtitle1">{breach.breach}</Typography>
//           <Typography variant="body2">{breach.details}</Typography>
//           <Typography variant="caption">Industry: {breach.industry}</Typography>
//           <br />
//           <a href={breach.references} target="_blank" rel="noopener noreferrer">Learn More</a>
//         </Paper>
//       ))}
//     </Box>
//   );
// }
// components/BreachAnalyticsCard.js

// import React from "react";
// import {
//   Box, Typography, Divider, Grid, Chip, Accordion,
//   AccordionSummary, AccordionDetails, Paper
// } from "@mui/material";
// import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from "@mui/lab";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Fade } from "react-awesome-reveal";

// const ResultItem = ({ title, data }) => (
//   <Grid item xs={12} sm={6}>
//     <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
//     <Typography variant="body1" gutterBottom>{data || "N/A"}</Typography>
//   </Grid>
// );

// export default function BreachAnalyticsCard({ data }) {
//   console.log("BreachAnalyticsCard data:", data); // Debug log
//   if (!data) return null;

//   const {
//     breach_summary = {},
//     risk_assessment = {},
//     password_strength = {},
//     exposed_categories = [],
//     yearwise_breach_distribution = {},
//     industry_exposure = [],
//   } = data;

//   return (
//     <Box sx={{ my: 4 }}>
//       <Fade>
//         <Typography variant="h5" gutterBottom>
//           🛡️ Breach Summary for {breach_summary.site || "Unknown"}
//         </Typography>
//       </Fade>

//       <Grid container spacing={2}>
//         <ResultItem title="Risk Level" data={`${risk_assessment.risk_label} (${risk_assessment.risk_score})`} />
//         <ResultItem title="Easy to Crack Passwords" data={password_strength.easy_to_crack} />
//         <ResultItem title="Plaintext Passwords" data={password_strength.plain_text} />
//       </Grid>

//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>Industry Impact</Typography>
//       <Grid container spacing={1}>
//         {industry_exposure.map((entry) => (
//           <Grid item key={entry.industry_code}>
//             <Chip label={`${entry.industry_code.toUpperCase()}: ${entry.breach_count}`} color={entry.breach_count > 0 ? "error" : "default"} />
//           </Grid>
//         ))}
//       </Grid>

//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>📂 Exposed Data Types</Typography>
//       {exposed_categories.map((section) => (
//         <Accordion key={section.category}>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography>{section.category}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {section.items.map((item) => (
//               <Typography key={item}>- {item}</Typography>
//             ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>📅 Breaches Over the Years</Typography>
//       <Timeline>
//         {Object.entries(yearwise_breach_distribution).map(([year, count]) =>
//           count > 0 && (
//             <TimelineItem key={year}>
//               <TimelineSeparator>
//                 <TimelineDot />
//                 <TimelineConnector />
//               </TimelineSeparator>
//               <TimelineContent>
//                 <Typography>{year}: {count} Breaches</Typography>
//               </TimelineContent>
//             </TimelineItem>
//           )
//         )}
//       </Timeline>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>🔍 Detailed Breach Information</Typography>
//       <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
//         <Typography variant="subtitle1">{breach_summary.site}</Typography>
//         <Typography variant="body2">{breach_summary.details}</Typography>
//         <Typography variant="caption">Industry: {breach_summary.industry}</Typography>
//         <br />
//         <a href={breach_summary.reference_link} target="_blank" rel="noopener noreferrer">Learn More</a>
//       </Paper>
//     </Box>
//   );
// }


// import React from 'react';
// import { Card, CardContent } from '../styling/card';
// import { Badge } from '../styling/badge';
// import { Progress } from '../styling/progress';

// const BreachAnalyticsCard = ({ data }) => {
//   console.log("Incoming data to BreachAnalyticsCard:", data);
//   const riskData = data.BreachMetrics.risk[0];


//   // Safely access risk details from the nested MongoDB-like object
//   // const risk = data?.results?.BreachMetrics?.risk?.[0] || {
//   //   risk_label: 'Unknown',
//   //   risk_score: 0
//   // };

//   return (
//     <Card className="max-w-md mx-auto mt-6">
//       <CardContent>
//         <h2 className="text-xl font-semibold mb-2">Risk Score</h2>
//         <p className="mb-2">
//           Level: <Badge>{riskData.risk_label}</Badge>
//         </p>
//         <Progress value={riskData.risk_score} max={100} className="h-4" />
//         <p className="mt-2 text-sm text-gray-500">Score: {riskData.risk_score}/100</p>
//       </CardContent>
//     </Card>
//   );
// };

// export default BreachAnalyticsCard;



// import React from 'react';
// import { Card, CardContent } from '../styling/card';
// import { Badge } from '../styling/badge';
// import { Progress } from '../styling/progress';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend } from 'recharts';
// import { Separator } from '../styling/separator';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const industryColors = COLORS.concat(COLORS);

// const BreachAnalyticsCard = ({ data }) => {

//   console.log("Received Analytics Dataa123:", data);

//   // const breachMetrics = data.results.BreachMetrics;
//   // const industryData = breachMetrics.industry[0].map(([name, value]) => ({ name, value }));
//   // const passwordStrength = Object.entries(breachMetrics.passwords_strength[0]).map(([name, value]) => ({ name, value }));
//   // const risk = breachMetrics.risk[0];
//   // const exposedDataTree = breachMetrics.xposed_data[0].children;
//   // const yearwiseDetails = Object.entries(breachMetrics.yearwise_details[0]).map(([year, count]) => ({ year, count }));

//   const breachMetrics = data?.results?.BreachMetrics || {};

//   const industryData = Array.isArray(breachMetrics.industry?.[0])
//     ? breachMetrics.industry[0].map(([name, value]) => ({ name, value }))
//     : [];

//   const passwordStrength = breachMetrics.passwords_strength?.[0]
//     ? Object.entries(breachMetrics.passwords_strength[0]).map(([name, value]) => ({ name, value }))
//     : [];

//   const risk = breachMetrics.risk?.[0] || { risk_label: "Unknown", risk_score: 0 };

//   const exposedDataTree = breachMetrics.xposed_data?.[0]?.children || [];

//   const yearwiseDetails = breachMetrics.yearwise_details?.[0]
//     ? Object.entries(breachMetrics.yearwise_details[0]).map(([year, count]) => ({
//         year: year.replace(/^y/, ''), // remove 'y' prefix like y2024 → 2024
//         count,
//       }))
//     : [];
  
//   const breaches = data?.results?.ExposedBreaches?.breaches_details || [];
//   const pasteCount = data?.results?.PastesSummary?.cnt || 0;

//   // const breaches = data.results.ExposedBreaches.breaches_details || [];
//   // const pasteCount = data.results.PastesSummary.cnt;

//   return (
    
//     <div className="p-6 space-y-6">
//       <header className="text-center space-y-2">
//         <h1 className="text-3xl font-bold">📬 Breach Analytics for {data.email}</h1>
//         {/* console.log("Results Structure:", data?.results); */}

//         <p className="text-gray-500">
//           {/* Timestamp: {new Date(data.timestamp.$date).toLocaleString()} */}

//           Timestamp: {data.timestamp?.$date ? new Date(data.timestamp.$date).toLocaleString() : "N/A"}
//           </p>
//         <Badge variant="secondary">
//           {/* Summary Site: {data.results.BreachesSummary.site} */}
//           Summary Site: {data?.results?.BreachesSummary?.site || 'N/A'}
//           </Badge>
//       </header>

//       <Separator />

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-2">Industry Categories</h2>
//             <BarChart width={400} height={250} data={industryData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Bar dataKey="value" fill="#8884d8">
//                 {industryData.map((_, index) => (
//                   <Cell key={`cell-${index}`} fill={industryColors[index % industryColors.length]} />
//                 ))}
//               </Bar>
//               <Tooltip />
//             </BarChart>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-2">Password Strength</h2>
//             <PieChart width={400} height={250}>
//               <Pie
//                 data={passwordStrength}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name }) => name}
//               >
//                 {passwordStrength.map((_, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-2">Risk Score</h2>
//             <p className="mb-2">Level: <Badge>{risk.risk_label}</Badge></p>
//             <Progress value={risk.risk_score} max={100} className="h-4" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-2">Yearwise Breach Timeline</h2>
//             <LineChart width={400} height={250} data={yearwiseDetails}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="count" stroke="#8884d8" />
//             </LineChart>
//           </CardContent>
//         </Card>
//       </section>

//       <section>
//         <h2 className="text-2xl font-bold mb-4">📊 Exposed Data</h2>
//         <div className="space-y-4">
//           {exposedDataTree.map((item, idx) => (
//             <Card key={idx}>
//               <CardContent>
//                 <h3 className="text-lg font-semibold">{item.name}</h3>
//                 <ul className="list-disc ml-5 mt-2">
//                   {item.children.map((child, index) => (
//                     <li key={index}>{child.name} — Value: {child.value}</li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="text-2xl font-bold mb-4">🔐 Breach Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {breaches.map((b, i) => (
//             <Card key={i}>
//               <CardContent>
//                 <div className="flex items-center space-x-4">
//                   <img src={b.logo} alt="logo" className="w-16 h-16 object-contain" />
//                   <div>
//                     <h3 className="text-lg font-semibold">{b.breach}</h3>
//                     <p className="text-sm text-gray-500">{b.domain}</p>
//                   </div>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-700">{b.details}</p>
//                 <ul className="list-disc ml-5 text-sm mt-2">
//                   <li>Risk: {b.password_risk}</li>
//                   <li>Records: {b.xposed_records}</li>
//                   <li>Verified: {b.verified}</li>
//                   <li>Searchable: {b.searchable}</li>
//                   <li>Xposed: {b.xposed_data} ({b.xposed_date})</li>
//                 </ul>
//                 <a href={b.references} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">More Info</a>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       <footer className="mt-6 text-center text-gray-500">
//         Paste Exposure Count: <Badge variant="outline">{pasteCount}</Badge>
        
//       </footer>
//     </div>
//   );
// };

// export default BreachAnalyticsCard;



// import React from 'react';

// const BreachAnalyticsCard = ({ data }) => {
//   if (!data || !data.BreachMetrics) return <div>No data available</div>;

//   const { BreachMetrics, BreachesSummary, ExposedBreaches, PastesSummary } = data;

//   const industryData = BreachMetrics.industry?.[0] || [];
//   const passwordStrength = BreachMetrics.passwords_strength?.[0] || {};
//   const risk = BreachMetrics.risk?.[0] || {};
//   const xposedData = BreachMetrics.xposed_data?.[0]?.children || [];
//   const yearwise = BreachMetrics.yearwise_details?.[0] || {};

//   const exposedBreach = ExposedBreaches?.breaches_details?.[0];

//   return (
//     <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-100 to-white">
//       <h2 className="text-2xl font-bold mb-4">📊 Breach Analytics for Email</h2>

//       {/* Industry exposure */}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">Exposed Industries</h3>
//         <ul className="list-disc pl-6">
//           {industryData
//             .filter(([_, count]) => count > 0)
//             .map(([industry, count]) => (
//               <li key={industry}>
//                 <span className="font-medium">{industry.toUpperCase()}</span>: {count}
//               </li>
//             ))}
//         </ul>
//       </div>

//       {/* Password Strength */}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">Password Strength Metrics</h3>
//         <ul className="list-disc pl-6">
//           {Object.entries(passwordStrength).map(([key, value]) => (
//             <li key={key}>
//               <span className="font-medium">{key}</span>: {value}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Risk Level */}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">Overall Risk</h3>
//         <p>⚠️ Risk Level: <strong>{risk.risk_label}</strong></p>
//         <p>📈 Risk Score: <strong>{risk.risk_score}</strong></p>
//       </div>

//       {/* Xposed Data */}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">🕵️‍♂️ Exposed Data Types</h3>
//         <ul className="list-disc pl-6">
//           {xposedData.map((category) => (
//             <li key={category.name}>
//               <span className="font-bold">{category.name}</span>
//               <ul className="pl-4 list-square">
//                 {category.children.map((item) => (
//                   <li key={item.name}>
//                     {item.name} - Exposed: {item.value}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Yearwise breach distribution */}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">📆 Yearwise Breach Details</h3>
//         <div className="grid grid-cols-3 gap-2">
//           {Object.entries(yearwise).map(([year, count]) => (
//             <div key={year} className="text-sm">
//               {year.replace('y', '')}: <strong>{count}</strong>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Breach Summary */}
//       {BreachesSummary && (
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold">📌 Breach Summary</h3>
//           <p>🕵️ Site: <strong>{BreachesSummary.site}</strong></p>
//         </div>
//       )}

//       {/* Exposed Breach Details */}
//       {exposedBreach && (
//         <div className="mb-4 p-4 border rounded-lg bg-white shadow-md">
//           <h3 className="text-xl font-semibold">🔍 Exposed Breach: {exposedBreach.breach}</h3>
//           <img src={exposedBreach.logo} alt={exposedBreach.breach} className="w-32 h-auto my-2" />
//           <p><strong>Domain:</strong> {exposedBreach.domain}</p>
//           <p><strong>Industry:</strong> {exposedBreach.industry}</p>
//           <p><strong>Password Risk:</strong> {exposedBreach.password_risk}</p>
//           <p><strong>Xposed Data:</strong> {exposedBreach.xposed_data}</p>
//           <p><strong>Records Exposed:</strong> {exposedBreach.xposed_records.toLocaleString()}</p>
//           <p><strong>Date:</strong> {exposedBreach.xposed_date}</p>
//           <p className="mt-2"><strong>Details:</strong> {exposedBreach.details}</p>
//           <a href={exposedBreach.references} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
//             🔗 Read More
//           </a>
//         </div>
//       )}

//       {/* Paste Summary */}
//       {PastesSummary?.cnt > 0 && (
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold">📋 Paste Summary</h3>
//           <p><strong>Count:</strong> {PastesSummary.cnt}</p>
//           <p><strong>Domain:</strong> {PastesSummary.domain}</p>
//           <p><strong>Timestamp:</strong> {PastesSummary.tmpstmp}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BreachAnalyticsCard;




// import React, { useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend
// } from 'recharts';
// import { FaExclamationTriangle, FaShieldAlt, FaAngleDown, FaAngleUp } from 'react-icons/fa';

// const BreachAnalyticsCard = ({ data }) => {
//   // if (!data || !data.BreachMetrics) return <div>No data available</div>;

//   const { BreachMetrics, BreachesSummary, ExposedBreaches, PastesSummary } = data;

//   const industryData = BreachMetrics.industry?.[0] || [];
//   const passwordStrength = BreachMetrics.passwords_strength?.[0] || {};
//   const risk = BreachMetrics.risk?.[0] || {};
//   const xposedData = BreachMetrics.xposed_data?.[0]?.children || [];
//   const yearwise = BreachMetrics.yearwise_details?.[0] || {};

//   const exposedBreach = ExposedBreaches?.breaches_details?.[0];
//   const [expandBreach, setExpandBreach] = useState(false);

//   const formattedIndustryData = industryData
//     .filter(([_, count]) => count > 0)
//     .map(([name, value]) => ({ name, value }));

//   const formattedPasswordData = Object.entries(passwordStrength).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const formattedYearwiseData = Object.entries(yearwise).map(([year, value]) => ({
//     year: year.replace('y', ''),
//     count: value,
//   }));

//   return (
//     <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-white space-y-6">
//       <h2 className="text-3xl font-bold flex items-center gap-2">
//         📊 Breach Analytics for Email
//       </h2>

//       {/* Exposed Industries */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Exposed Industries</h3>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={formattedIndustryData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Password Strength */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">Password Strength Metrics</h3>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={formattedPasswordData} layout="vertical">
//             <XAxis type="number" />
//             <YAxis type="category" dataKey="name" />
//             <Tooltip />
//             <Bar dataKey="value" fill="#f87171" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Risk Level */}
//       <div className="flex items-center justify-between gap-6">
//         <div className="flex flex-col">
//           <h3 className="text-xl font-semibold">Overall Risk</h3>
//           <p className="flex items-center gap-2 text-lg mt-1">
//             ⚠️ Risk Level: <strong>{risk.risk_label}</strong>
//           </p>
//           <p className="text-md">📈 Risk Score: <strong>{risk.risk_score}</strong></p>
//         </div>
//         <div className="relative w-40 h-40 bg-white border-4 border-yellow-300 rounded-full flex items-center justify-center text-xl font-bold">
//           <FaShieldAlt className="text-yellow-600 text-4xl" />
//           <span className="absolute text-black bottom-4 text-2xl">{risk.risk_score}</span>
//         </div>
//       </div>

//       {/* Exposed Data Types */}
//       <div>
//         <h3 className="text-xl font-semibold">🕵️‍♂️ Exposed Data Types</h3>
//         {xposedData.map(category => (
//           <div key={category.name} className="my-2">
//             <div className="font-bold mb-1">{category.name}</div>
//             <div className="flex flex-wrap gap-2 pl-2">
//               {category.children.map(item => (
//                 <span key={item.name} className="px-3 py-1 rounded-full bg-blue-100 text-sm shadow">
//                   📁 {item.name} - {item.value}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Yearwise Breach Details */}
//       <div>
//         <h3 className="text-xl font-semibold mb-2">📆 Yearwise Breach Details</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={formattedYearwiseData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="year" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="count" stroke="#10b981" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Breach Summary */}
//       {BreachesSummary && (
//         <div>
//           <h3 className="text-xl font-semibold">📌 Breach Summary</h3>
//           <div className="flex flex-wrap gap-2 mt-2">
//             <span className="bg-indigo-200 px-3 py-1 rounded-full text-sm">{BreachesSummary.site}</span>
//             <span className="bg-indigo-200 px-3 py-1 rounded-full text-sm">{BreachesSummary.domain}</span>
//           </div>
//         </div>
//       )}

//       {/* Highlighted Breach */}
//       {exposedBreach && (
//         <div className="p-4 bg-white shadow rounded-xl">
//           <button
//             onClick={() => setExpandBreach(prev => !prev)}
//             className="w-full text-left flex justify-between items-center text-xl font-semibold"
//           >
//             🔍 Exposed Breach: {exposedBreach.breach}
//             {expandBreach ? <FaAngleUp /> : <FaAngleDown />}
//           </button>
//           {expandBreach && (
//             <div className="mt-4">
//               <img src={exposedBreach.logo} alt={exposedBreach.breach} className="w-32 h-auto my-2" />
//               <p><strong>Domain:</strong> {exposedBreach.domain}</p>
//               <p><strong>Industry:</strong> {exposedBreach.industry}</p>
//               <p><strong>Password Risk:</strong> {exposedBreach.password_risk}</p>
//               <p><strong>Xposed Data:</strong> {exposedBreach.xposed_data}</p>
//               <p><strong>Records Exposed:</strong> {exposedBreach.xposed_records.toLocaleString()}</p>
//               <p><strong>Date:</strong> {exposedBreach.xposed_date}</p>
//               <p className="mt-2"><strong>Details:</strong> {exposedBreach.details}</p>
//               <a href={exposedBreach.references} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block">
//                 🔗 Read More
//               </a>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Paste Summary */}
//       {PastesSummary?.cnt > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold">📋 Paste Summary</h3>
//           <p><strong>Count:</strong> {PastesSummary.cnt}</p>
//           <p><strong>Domain:</strong> {PastesSummary.domain}</p>
//           <p><strong>Timestamp:</strong> {PastesSummary.tmpstmp}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BreachAnalyticsCard;




import React from 'react';
import {
  Card, CardContent, Typography, Chip, Box, LinearProgress, Divider, Button, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ExpandMore, Security, Insights, DataObject, EventNote } from '@mui/icons-material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BreachAnalyticsCard = ({ data }) => {
  if (!data || !data.BreachMetrics) return <Typography>No data available</Typography>;

  const { BreachMetrics, BreachesSummary, ExposedBreaches, PastesSummary } = data;
  const industryData = BreachMetrics.industry?.[0] || [];
  const passwordStrength = BreachMetrics.passwords_strength?.[0] || {};
  const risk = BreachMetrics.risk?.[0] || {};
  const xposedData = BreachMetrics.xposed_data?.[0]?.children || [];
  const yearwise = BreachMetrics.yearwise_details?.[0] || {};
  const exposedBreach = ExposedBreaches?.breaches_details?.[0];

  // Prepare chart data
  const industryChart = industryData
    .filter(([_, count]) => count > 0)
    .map(([name, count]) => ({ name, count }));

  const passwordStrengthChart = Object.entries(passwordStrength).map(([key, value]) => ({
    name: key,
    value
  }));

  const yearwiseChart = Object.entries(yearwise).map(([year, count]) => ({
    year: year.replace('y', ''),
    count
  }));

  return (
    <Card sx={{ margin: 4, padding: 2, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom><Insights /> Breach Analytics for Email</Typography>

        {/* Exposed Industries */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">🏭 Exposed Industries</Typography>

        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
          {industryChart.map(item => (
            <Chip key={item.name} label={`${item.name.toUpperCase()} (${item.count})`} color="primary" />
          ))}
        </Box> */}

        // Inside Exposed Industries section:
<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
  {industryChart.map(item => (
    <Chip
      key={item.name}
      label={`${item.name.toUpperCase()} (${item.count})`}
      color="primary"
      onClick={() => console.log("Clicked industry:", item.name)} // ✅ Safe function
    />
  ))}
</Box>


        {/* Password Strength */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">🔐 Password Strength Metrics</Typography>
        {passwordStrengthChart.map(item => (
          <Box key={item.name} sx={{ my: 1 }}>
            <Typography>{item.name}</Typography>
            <LinearProgress variant="determinate" value={Math.min(item.value, 100)} />
          </Box>
        ))}

        {/* Risk & Score */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">⚠️ Overall Risk & Score</Typography>
        {/* <Chip label={`Risk Level: ${risk.risk_label || 'Unknown'}`} color="error" sx={{ mr: 1 }} /> */}
<Chip
  label={`Risk Level: ${risk.risk_label || 'Unknown'}`}
  color="error"
  sx={{ mr: 1 }}
  onClick={() => console.log("Clicked risk level:", risk.risk_label)} // ✅ Safe
/>

        <Box sx={{ width: '50%', mt: 1 }}>
          <Typography>Risk Score: {risk.risk_score}</Typography>
          <LinearProgress variant="determinate" value={risk.risk_score || 0} />
        </Box>

        {/* Exposed Data */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">🧾 Exposed Data Types</Typography>
        {xposedData.map((category) => (
          <Accordion key={category.name}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography><DataObject /> {category.name}</Typography>
            </AccordionSummary>

            {/* <AccordionDetails>
              {category.children.map((item) => (
                <Chip key={item.name} label={`${item.name}: ${item.value}`} sx={{ mr: 1, mb: 1 }} />
              ))}
            </AccordionDetails> */}

<AccordionDetails>
  {category.children.map((item) => (
    <Chip
      key={item.name}
      label={`${item.name}: ${item.value}`}
      sx={{ mr: 1, mb: 1 }}
      onClick={() => console.log("Clicked data type:", item.name)} // ✅ Safe
    />
  ))}
</AccordionDetails>


          </Accordion>
        ))}

        {/* Yearwise Trend */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">📆 Yearwise Breach Details</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={yearwiseChart}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        {/* Breach Summary */}
        {BreachesSummary && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">📌 Breach Summary</Typography>
            {/* <Chip label={`🕵️ ${BreachesSummary.site}`} color="info" /> */}
<Chip
  label={`🕵️ ${BreachesSummary.site}`}
  color="info"
  onClick={() => console.log("Clicked site:", BreachesSummary.site)} // ✅ Safe
/>

          </>
        )}

        {/* Highlighted Breach */}
        {exposedBreach && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">🔍 Highlighted Breach</Typography>
            <Card variant="outlined" sx={{ p: 2, my: 2 }}>
              <Typography variant="h6">{exposedBreach.breach}</Typography>
              <img src={exposedBreach.logo} alt="logo" style={{ width: 100, marginTop: 10 }} />
              <Typography>Domain: {exposedBreach.domain}</Typography>
              <Typography>Industry: {exposedBreach.industry}</Typography>
              <Typography>Password Risk: {exposedBreach.password_risk}</Typography>
              <Typography>Exposed Records: {exposedBreach.xposed_records.toLocaleString()}</Typography>
              <Typography>Date: {exposedBreach.xposed_date}</Typography>
              <Typography sx={{ mt: 1 }}>{exposedBreach.details}</Typography>
              <Button href={exposedBreach.references} target="_blank" sx={{ mt: 1 }}>
                🔗 Read More
              </Button>
            </Card>
          </>
        )}

        {/* Paste Summary */}
        {PastesSummary?.cnt > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">📋 Paste Summary</Typography>
            <Typography>Count: {PastesSummary.cnt}</Typography>
            <Typography>Domain: {PastesSummary.domain}</Typography>
            <Typography>Timestamp: {PastesSummary.tmpstmp}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BreachAnalyticsCard;
