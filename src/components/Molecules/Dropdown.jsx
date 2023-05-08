import React from 'react';

const Dropdown = ({ options, onSelect }) => {
  const handleSelect = (option) => {
    onSelect(option);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div key={index} onClick={() => handleSelect(option)}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
