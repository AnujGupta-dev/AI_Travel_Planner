import React, { useState, useEffect } from 'react';

const AutoComplete = ({setDestination}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestioncheck, setsuggestioncheck] = useState(true)

    useEffect(() => {
    if (suggestioncheck) {
        if (query.length > 3) {
            const fetchSuggestions = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(
                        `/api/autocomplete?q=${encodeURIComponent(query)}`
                    );
                    const data = await response.json();

                    if (data.suggestions) {
                        setSuggestions(data.suggestions);
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
        setQuery(`${suggestion.name}${suggestion.country ? `, ${suggestion.country}` : ''}`);
        setDestination(`${suggestion.name}${suggestion.country ? `, ${suggestion.country}` : ''}`);
    };

    return (
        <div>
            <input type="text" placeholder="Search for a location..." value={query} onChange={(e) => setQuery(e.target.value)}   className="w-full" onClick={()=>{setsuggestioncheck(true)}} />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {suggestions.length > 0 && !loading && (
                <ul className="suggestions-list max-h-40 overflow-y-scroll pb-5">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className=''>
                            <button onClick={() => selectFunction(suggestion)} className="w-full text-md text-left pl-5 " >
                               {suggestion.name}{suggestion.country ? `, ${suggestion.country}` : ''}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
