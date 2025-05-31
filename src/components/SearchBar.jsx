import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/products/productSlice';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(inputValue));
      if (onSearch) onSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, dispatch, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;