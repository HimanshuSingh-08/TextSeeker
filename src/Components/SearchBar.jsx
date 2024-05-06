import { useState, useEffect, useCallback, useRef } from "react";
import '../CSS/SearchBar.css';
import Filehandler from "./Filehandler";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [timer, setTimer] = useState(null);
    const searchInputRef = useRef(null);  // Ref for the search input
    const fileInputRef = useRef(null);  // Ref for the file input

    // to make create a time gap 
    const debounceSearch = useCallback((keyword) => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            updateSearchHistory(keyword);
        }, 2000); // 2 seconds delay
        setTimer(newTimer);
    }, [timer]);

    // to update the history 
    const updateSearchHistory = (keyword) => {
        if (keyword && !searchHistory.some(item => item.keyword.toLowerCase() === keyword.toLowerCase())) {
            setSearchHistory(prevHistory => [
                ...prevHistory, 
                { keyword: keyword, occurrences: 0 }
            ]);
        }
    };

    //to set the value from the input taken
    const handleSearchInputChange = (event) => {
        const keyword = event.target.value;
        setSearchQuery(keyword);
        debounceSearch(keyword);
    };

    // to handle the search history
    const handleCountUpdate = (occurrences) => {
        setSearchHistory(prevHistory => prevHistory.map(item =>
            item.keyword.toLowerCase() === searchQuery.toLowerCase() ? 
            { ...item, occurrences } : 
            item
        ));
    };

    //to handle the keyboards shortcut
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ' ' && document.activeElement !== searchInputRef.current) {
                event.preventDefault();  // Prevent the default action (scrolling the page)
                searchInputRef.current.focus();
            } else if (event.key.toLowerCase() === 'u') {
                fileInputRef.current.click();  // Simulate a click on the hidden file input
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    

    return (
        <div className="search-container">
            <input
                ref={searchInputRef}
                type="text"
                value={searchQuery || ''}
                onChange={handleSearchInputChange}
                className="search-input"
                placeholder="Search..."
            />
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}  // Hide the file input
                onChange={e => console.log("File selected:", e.target.files[0])}
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
