import React, { useState } from 'react';
import { PsostRadioChecked } from '@components/Atoms/PsostRadioChecked';
import { PsostRadio } from '@components/Atoms/PsostRadio';

const ratings = [
  { value: 5, label: '아주 좋아요' },
  { value: 4, label: '조금 좋아요' },
  { value: 3, label: '보통이에요' },
  { value: 2, label: '별로에요' },
  { value: 1, label: '싫어요' },
];

export const Rating = ({ name, value, onChange }) => {
  const [checkedState, setCheckedState] = useState(parseInt(value));

  const handleRatingChange = (newValue) => {
    onChange({ [name]: newValue });
    setCheckedState(newValue);
  };

  return (
    <div>
      <span>{name}: </span>
      {ratings.map((rating) => (
        <label key={rating.value}>
          <input
            type="radio"
            name={name}
            value={rating.value}
            checked={rating.value === checkedState}
            onChange={() => handleRatingChange(rating.value)}
          />
          <span className="radio-icon">
            {rating.value === checkedState ? (
              <PsostRadioChecked />
            ) : (
              <PsostRadio />
            )}
          </span>
          <span className="radio-label">{rating.label}</span>
        </label>
      ))}
    </div>
  );
};
