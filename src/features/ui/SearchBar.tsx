import React from "react";

import { SearchBarProps } from "../Types/searchBar.d";

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by brand or model..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;
