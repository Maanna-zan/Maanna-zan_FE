import React, { useState } from 'react';
import Dropdown from '@components/Molecules/Dropdown';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  const handleQueryChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // 검색 자동완성 후보군 목록을 가져와 options 상태를 업데이트합니다.
    const autoKeywords = getAutoKeywords(value);
    setOptions(autoKeywords);
  };

  const handleSelectOption = (option) => {
    setQuery(option);
    setOptions([]);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Dropdown options={options} onSelect={handleSelectOption} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
