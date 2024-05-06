import { useState } from "react";
import '../CSS/SearchBar.css';
import Filehandler from "./Filehandler";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const handleSearchInputChange = (event) => {
        const keyword = event.target.value;
        setSearchQuery(keyword);
        // Update history if this is a new keyword or first input
        if (keyword && !searchHistory.some(item => item.keyword.toLowerCase() === keyword.toLowerCase())) {
            setSearchHistory(prevHistory => [
                ...prevHistory, 
                { keyword: keyword, occurrences: 0 } // Initialize with zero occurrences
            ]);
        }
    };

    const handleCountUpdate = (occurrences) => {
        // Update occurrences for the latest keyword
        setSearchHistory(prevHistory => prevHistory.map(item =>
            item.keyword.toLowerCase() === searchQuery.toLowerCase() ? 
            { ...item, occurrences } : 
            item
        ));
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchQuery || ''}
                onChange={handleSearchInputChange}
                className="search-input"
                placeholder="Search..."
            />
            <Filehandler keyword={searchQuery} onCountUpdate={handleCountUpdate} />
            <div className="search-history">
                <h3>Search History:</h3>
                <ul>
                    {searchHistory.map((item, index) => (
                        <li key={index}>
                            {item.keyword} ({item.occurrences} occurrences in text)
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
