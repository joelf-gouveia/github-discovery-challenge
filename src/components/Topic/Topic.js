import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, MenuItem, Popover, Typography } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { Slider } from '../';
import "./topic.scss";

const orderBySelection = [
  { label: "Sort by stars", value: "stars" },
  { label: "Sort by forks", value: "forks" },
  { label: "Sort by help wanted issues", value: "help-wanted-issues" },
  { label: "Sort by updated", value: "updated" },
];

const Topic = ({
  title,
  cache,
  onFetch,
  preference,
  showOrderBy,
  shouldLoadMore,
  handleOptionSelect,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option, topic) => {
    setAnchorEl(null);
    handleOptionSelect(option, topic);
  };

  const onLoadMore = () => {
    shouldLoadMore && onFetch(preference.topic, preference.orderBy, true);
  }

  const selectedOrder =
    showOrderBy && orderBySelection.find((obs) => obs.value === preference.orderBy);

  return (
    <div className="sliderMainContainer">
      <div className="header">
        <Typography variant="h6">
          {title}
        </Typography>
        {showOrderBy && (
          <>
            <Button
              endIcon={<ArrowDropDown />}
              onClick={handleClick}
              color="secondary"
              sx={{ ml: 2 }}
            >
              {selectedOrder.label}
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              className="popover"
            >
              {orderBySelection.map((option) => (
                <MenuItem
                  key={option.label}
                  onClick={() => handleSelect(option.value, preference.topic)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Popover>
          </>
        )}
      </div>
      <Slider cache={cache} onLoadMore={onLoadMore} {...props} />
    </div>
  );
};

Topic.defaultProps = {
    showOrderBy: true,
    shouldLoadMore: true
}

Topic.propTypes = {
  cache: PropTypes.array,
  title: PropTypes.string,
  onFetch: PropTypes.func,
  showOrderBy: PropTypes.bool,
  shouldLoadMore: PropTypes.bool,
  preference: PropTypes.object,
  handleOptionSelect: PropTypes.func
};

export default Topic;
