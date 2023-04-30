import React, { useRef } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Star } from "@mui/icons-material";
import placeholder from "../../assets/download.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.scss";

const Slider = ({ cache, savedBookmarks, onBookmarkChange, onLoadMore }) => {
  const swiperRef = useRef(null);

  const onReachEnd = () => {
    onLoadMore();
  };

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        600: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
        2000: {
          slidesPerView: 6,
          slidesPerGroup: 3,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="customSwiper"
      onReachEnd={onReachEnd}
    >
      {cache.map((card) => {
        const isBookmarked = Boolean(
          savedBookmarks.find((bks) => bks.id === card.id)
        );

        return (
          <SwiperSlide key={card.id} className="customSwiperSlide">
            <>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "5%",
                  right: "2%",
                  backgroundColor: "tertiary.main",
                }}
                onClick={() => onBookmarkChange(card, isBookmarked)}
              >
                <Star className={isBookmarked ? "gold" : "grey"} />
              </IconButton>
              <a href={card.html_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={card.image_url}
                  className="imageContainer"
                  onError={(e) => (e.target.src = placeholder)}
                />
              </a>
            </>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

Slider.defaultProps = {
  showOrderBy: true,
};

Slider.propTypes = {
  cache: PropTypes.array,
  showOrderBy: PropTypes.bool,
  handleOptionSelect: PropTypes.func,
  savedBookmarks: PropTypes.array,
  onBookmarkChange: PropTypes.func,
  onLoadMore: PropTypes.func,
};

export default Slider;
