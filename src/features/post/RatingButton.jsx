import React, { useState } from 'react';

export const RatingButton = ({ rating, onChange }) => {
  const handleClick = () => {
    onChange(rating);
  };

  return <button onClick={handleClick}>{rating.label}</button>;
};

const ReviewForm = ({ post, onChange, handleRatingChange }) => {
  const [selectedRatings, setSelectedRatings] = useState({
    taste: null,
    service: null,
    atmosphere: null,
    satisfaction: null,
  });

  // const handleRatingChange = (key, rating) => {
  //   setSelectedRatings((prevState) => ({
  //     ...prevState,
  //     [key]: rating,
  //   }));

  //   if (onChange) {
  //     onChange(key, rating.value);
  //   }
  // };

  return (
    <>
      {Object.keys(selectedRatings).map((key) => (
        <div key={key}>
          {ratings.map((rating) => (
            <RatingButton
              key={rating.value}
              rating={rating}
              onChange={(value) => handleRatingChange(key, value)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default ReviewForm;
