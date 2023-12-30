import { Typography, Link } from "@mui/material";
import React from "react";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://kontorirott.ee/">
        KontoriRotid Lahendavad
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
