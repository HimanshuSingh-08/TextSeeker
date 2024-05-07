import React from "react";

export default function SearchHistory({ searchHistory, setSearchTerm }) {
  return (
    <div>
      {searchHistory.length > 0 ? (
        <div className="mt-6 font-bold md:mt-0">Past Searches</div>
      ) : (
        <></>
      )}
      {searchHistory.map((term) => {
        return (
          <>
            <div
              key={term + Date.now()}
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSearchTerm(term);
              }}
            >
              {term}
            </div>
          </>
        );
      })}
    </div>
  );
}
