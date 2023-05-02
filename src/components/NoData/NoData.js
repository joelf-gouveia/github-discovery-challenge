import { Box } from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";

const NoData = ({ title, sx }) => {
  return (
    <Box sx={{ height: 50, display: "flex", alignItems: "center", ...sx }}>
      {title}
    </Box>
  )
}

NoData.propTypes = {
  title: PropTypes.string,
  sx: PropTypes.any
}

export default NoData;