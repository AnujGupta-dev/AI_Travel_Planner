import React, { useState, useEffect } from 'react';

const AutoComplete = ({setDestination}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestioncheck, setsuggestioncheck] = useState(true)

    useEffect(() => {
        if(suggestioncheck){
            if (query.length > 0) {
                const fetchSuggestions = async () => {
                    setLoading(true);
                    setError(null); 
                    try {
                        const response = await fetch(
                            `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${query}&key=${import.meta.env.VITE_gomapskey}`
                        );
                        const data = await response.json();
    
                        if (data.status === "OK") {
                            setSuggestions(data.predictions);
                        } else {
                            setSuggestions([]);
                        }
                    } catch (error) {
                        setError('Failed to fetch suggestions');
                    } finally {
                        setLoading(false);
                    }
                };
    
                fetchSuggestions();
            } else {
                setSuggestions([]);
            }
        }
    }, [query]);

    const selectFunction = (suggestion) => {
        setsuggestioncheck(false);
        setSuggestions([]);
        setQuery(suggestion.structured_formatting.main_text);
        setDestination(suggestion.structured_formatting.main_text);
    };

    return (
        <div>
            <input type="text" placeholder="Search for a location..." value={query} onChange={(e) => setQuery(e.target.value)}   className="w-full" />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {suggestions.length > 0 && !loading && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <button onClick={() => selectFunction(suggestion)} className="w-full" >
                                {suggestion.structured_formatting.main_text}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
