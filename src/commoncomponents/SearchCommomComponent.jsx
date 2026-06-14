import React from "react";

const SearchCommomComponent = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Saerch by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchCommomComponent;
