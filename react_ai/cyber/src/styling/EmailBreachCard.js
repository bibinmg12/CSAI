// components/EmailBreachCard.js
import React from "react";
import {
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CheckCircle, Error as ErrorIcon, Warning as WarningIcon, Info } from "@mui/icons-material";

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

export default function EmailBreachCard({ result }) {
  const breaches = Array.isArray(result?.breaches?.[0]) ? result?.breaches?.[0] : result?.breaches || [];

  return (
    <Paper elevation={6} sx={{ mt: 4, p: 2, borderRadius: 3, background: "linear-gradient(45deg, #2196f3, #21cbf3)", color: "#fff" }}>
      <Box display="flex" alignItems="center" mb={2}>
        {getStatusIcon(result?.status)}
        <Typography variant="h6" ml={1}>Email Breach Results</Typography>
      </Box>

      <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />

      <Grid container spacing={2}>
        <ResultItem title="Email" data={result.email} />
        <ResultItem title="Breach Count" data={breaches.length} />
      </Grid>

      <Box mt={2}>
        {breaches.length > 8 ? (
          <DataGrid
            autoHeight
            rows={breaches.map((b, i) => ({
              id: i,
              name: b.name || b,
              description: b.description || "N/A",
            }))}
            columns={[
              { field: "name", headerName: "Breach", flex: 1 },
              // { field: "description", headerName: "Description", flex: 2 },
            ]}
            disableRowSelectionOnClick
            sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 2 }}
          />
        ) : (
          breaches.map((b, i) => (
            // <Chip key={i} label={b.name || b} sx={{ m: 0.5, bgcolor: "rgba(255,255,255,0.3)", color: "#fff" }} />
            <Chip
  key={i}
  label={b.name || b}
  onClick={() => console.log("Clicked breach:", b.name || b)}
  sx={{ m: 0.5, bgcolor: "rgba(255,255,255,0.3)", color: "#fff", cursor: "pointer" }}
/>

          ))
        )}
      </Box>
    </Paper>
  );
}
