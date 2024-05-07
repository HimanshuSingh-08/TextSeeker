import { useState, useEffect, useRef } from "react";

export default function SearchBar({
  setSearchTerm,
  searchTerm,
  setSearchHistory,
}) {
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const searchRef = useRef(null);

  const handleSumbit = () => {
    setSearchHistory((prevHistory) => {
      return [searchQuery, ...prevHistory];
    });
    setSearchTerm(searchQuery);
  };

  // Shift + f to focus on input box.
  const handleKeyDown = (e) => {
    if (
      e.keyCode === 70 &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      searchRef.current.focus();
    }
  };

  useEffect(() => {
    setSearchQuery(searchTerm);
    window.addEventListener("keydown", handleKeyDown, false);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchTerm]);

  return (
    <>
      <input
        type="text"
        ref={searchRef}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleSumbit();
          }
        }}
        className=" border-1 border-gray-400 rounded-md p-2 mr-2"
        placeholder="Search..."
      />
      <button
        className="border-gray-500 border-1  p-2 rounded-md"
        onClick={() => {
          setSearchHistory((prevHistory) => {
            return [searchQuery, ...prevHistory];
          });
          setSearchTerm(searchQuery);
        }}
      >
        🔍
      </button>
    </>
  );
}
