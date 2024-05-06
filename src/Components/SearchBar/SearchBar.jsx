import { useState } from "react";

export default function SearchBar({
  setSearchTerm,
  searchTerm,
  setSearchHistory,
}) {
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  return (
    <>
      <div>SearchBar</div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="search-input"
        placeholder="Search..."
      />
      <button
        onClick={() => {
          setSearchHistory((prevHistory) => {
            return [searchQuery, ...prevHistory];
          });
          setSearchTerm(searchQuery);
        }}
      >
        Search
      </button>
    </>
  );
}
