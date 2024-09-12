import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background-color: #f0f8ff;
  padding: 10px; 
  border-radius: 5px; 
  display: flex;
  gap: 10px;
  `

const SearchBar = styled.input`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  flex: 1;
`

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`

function CitySearch({ city, setCity, clearAll }) {
  return (
    <SearchContainer>
      <SearchBar 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city"
      />
      <SearchButton onClick={clearAll}>Reset Search</SearchButton>
    </SearchContainer>
  );
}

export default CitySearch;
