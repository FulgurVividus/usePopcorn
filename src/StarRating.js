import { useState } from "react";
import PropTypes from "prop-types";

// StarRating component
// must be completely reusable & flexible

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const starContainerStyle = {
  display: "flex",
};

// PropTypes - giving types to props
StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

// Improve Reusability of this component with Props
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };

  const handleRating = function (rating) {
    setRating(rating);
    // to set external rating
    // onSetRating(rating);
  };

  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxRating }, (_, index) => (
            <span>
              <Star
                key={index}
                full={
                  tempRating ? tempRating >= index + 1 : rating >= index + 1
                }
                onRate={() => handleRating(index + 1)}
                onHoverIn={() => setTempRating(index + 1)}
                onHoverOut={() => setTempRating(0)}
                color={color}
                size={size}
              />
            </span>
          ))}
        </div>
        <p style={textStyle}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
    </>
  );
}

// Star component
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    display: "block",
    cursor: "pointer",
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <>
      <span
        role="button"
        style={starStyle}
        onClick={onRate}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
      >
        {full ? (
          // full star svg
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke={color}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          // empty star svg
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
      </span>
    </>
  );
}

//! SOME NOTES
// 1. Props as a Component API
// It means the user-creator connection of component. User gives some props to the component (they serve like APIs) and creator accepts them.
// We need to find the right balance between too little and too many props, that works for both the consumer and the creator

// 2. Improving Reusability with Props (related to 1)
// If we need accept many props from the user, we should give some default values to these props and types too
