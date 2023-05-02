import React, { useState } from 'react';
import { PsostRadioChecked } from '@components/Atoms/PsostRadioChecked';
import { PsostRadio } from '@components/Atoms/PsostRadio';
import { FlexColumn } from '@components/Atoms/Flex';

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
  const starStyle = { cursor: 'pointer', transition: 'color 0.3s easeInOut' };
  return (
    <FlexColumn
      style={{ justifyContent: ' center', gap: '10px', marginBottom: '20px' }}
    >
      {ratings.map((rating) => (
        <label
          key={rating.value}
          style={{
            font: `var(--label2-regular) Pretendard sans-serif`,
          }}
        >
          <input
            style={{ width: '0px', height: '0px' }}
            type="radio"
            name={name}
            value={rating.value}
            checked={rating.value === checkedState}
            onChange={() => handleRatingChange(rating.value)}
            required
          />
          <span className="radio-icon" style={{ marginRight: '4px' }}>
            {rating.value === checkedState ? (
              <PsostRadioChecked />
            ) : (
              <PsostRadio />
            )}
          </span>
          <span
            className="radio-label"
            style={{ width: '0px', height: '18px' }}
          >
            {rating.label}
          </span>
        </label>
      ))}
    </FlexColumn>
  );
};
