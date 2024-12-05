import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSearch = () => {
    onSearch(city, state, country);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Estado (opcional)"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código do país (ex: BR)"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
