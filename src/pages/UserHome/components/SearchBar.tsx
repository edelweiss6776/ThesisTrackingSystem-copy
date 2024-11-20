import React, { useState, useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

interface Suggestion {
    id: string; // Adjust the type as necessary
    THESIS_TITLE: string;
}

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const fetchSuggestions = async (query: string): Promise<void> => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`/search?q=${query}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions(searchQuery);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <Paper
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 500,
                borderRadius: '50px',
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Looking for a Thesis?"
                inputProps={{ 'aria-label': 'Search Thesis' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {suggestions.length > 0 && (
                <Paper sx={{ position: 'absolute', top: '50px', width: '100%', zIndex: 1 }}>
                    {suggestions.map((suggestion) => (
                        <div key={suggestion.id} style={{ padding: '10px' }}>
                            {suggestion.THESIS_TITLE}
                        </div>
                    ))}
                </Paper>
            )}
        </Paper>
    );
}

export default SearchBar;
