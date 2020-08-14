import React from "react";
import Typography from "@material-ui/core/Typography";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <a href="https://entlin.com/">
        <i>Entlin Pvt Ltd.</i>
      </a>
    </Typography>
  );
};
