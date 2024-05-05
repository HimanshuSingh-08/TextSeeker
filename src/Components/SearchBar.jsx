import { useState } from "react";
import '../CSS/SearchBar.css';
import Filehandler from "./Filehandler";


export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState();

    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    return (
        <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
          placeholder="Search..."
        />
        <button className="search-button">Search</button>
        <Filehandler keyword={searchQuery}/>
      </div>
    );
}
