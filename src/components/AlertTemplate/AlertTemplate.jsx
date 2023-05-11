import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

const AlertTemplate = ({ style, options, message, close }) => {
  const theme = useTheme();

  return (
    <Box
      style={style}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        border: "1px solid primary.main",
        width: "300px",
        backgroundColor: theme.palette.alert[options.type],
      }}
    >
      <Typography color="tertiary.main">{message}</Typography>
      <Close onClick={close} sx={{ cursor: "pointer", color: "tertiary.main"}} />
    </Box>
  );
};

AlertTemplate.propTypes = {
  style: PropTypes.object,
  options: PropTypes.object,
  message: PropTypes.string,
  close: PropTypes.func,
};

export default AlertTemplate;
