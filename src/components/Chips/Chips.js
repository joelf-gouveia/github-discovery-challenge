import React from "react";
import PropTypes from "prop-types";
import { Chip, useTheme } from "@mui/material";

const listTopics = ["React", "Django", "Typescript", "AWS"];

const Chips = ({ topics, onClick }) => {
  const theme = useTheme();
  return listTopics.map((topic, index) => {
    const isSelected = topics.includes(topic);

    return (
      <Chip
        key={index}
        onClick={() => onClick(topic, isSelected)}
        label={topic}
        sx={{
          mr: 2,
          color: `${isSelected ? "white" : theme.palette.primary.main}`,
          border: `1px solid ${theme.palette.primary.main}`,
          backgroundColor: `${isSelected ? theme.palette.primary.main : "transparent"}`,
        }}
      />
    );
  });
};

Chips.propTypes = {
  topics: PropTypes.array,
  onClick: PropTypes.func,
};

export default Chips;
