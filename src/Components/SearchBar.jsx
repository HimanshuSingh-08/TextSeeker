import { useState, useEffect, useCallback } from "react";
import '../CSS/SearchBar.css';
import Filehandler from "./Filehandler";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [timer, setTimer] = useState(null);

    const debounceSearch = useCallback((keyword) => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            updateSearchHistory(keyword);
        }, 2000); // 2 seconds delay
        setTimer(newTimer);
    }, [timer]);

    const updateSearchHistory = (keyword) => {
        if (keyword && !searchHistory.some(item => item.keyword.toLowerCase() === keyword.toLowerCase())) {
            setSearchHistory(prevHistory => [
                ...prevHistory, 
                { keyword: keyword, occurrences: 0 }
            ]);
        }
    };

    const handleSearchInputChange = (event) => {
        const keyword = event.target.value;
        setSearchQuery(keyword);
        debounceSearch(keyword);
    };

    const handleCountUpdate = (occurrences) => {
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
