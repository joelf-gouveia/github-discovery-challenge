import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import "./chips.scss";

const listTopics = ["React", "Django", "Typescript", "AWS"];

const Chips = ({ topics, onClick }) => {
  return listTopics.map((topic, index) => {
    const isSelected = topics.includes(topic);

    return (
      <Chip
        key={index}
        onClick={() => onClick(topic, isSelected)}
        label={topic}
        className={`chip ${isSelected ? "chipActive" : ""}`}
      />
    );
  });
};

Chips.propTypes = {
    topics: PropTypes.array,
    onClick: PropTypes.func
}

export default Chips;
