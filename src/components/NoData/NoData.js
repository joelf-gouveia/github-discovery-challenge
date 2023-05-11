import { Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";

const NoData = ({ title, sx }) => {
  return (
    <Typography sx={{ height: 50, display: "flex", alignItems: "center", ...sx }} color="primary.main">
      {title}
    </Typography>
  )
}

NoData.propTypes = {
  title: PropTypes.string,
  sx: PropTypes.any
}

export default NoData;