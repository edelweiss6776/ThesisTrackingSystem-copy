import React from "react";
import { Box, TextField } from "@mui/material";

interface LibSearchBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearch: (query: string) => void; // Update to pass the query as an argument
}

const LibSearchBar: React.FC<LibSearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
    const handleSearchClick = () => {
        onSearch(searchQuery); // Pass the current search query when clicking the search button
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        onSearch(newQuery); // Optionally trigger search dynamically while typing
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px auto",
                gap: "10px",
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange} // Update query on input change
                sx={{
                    minWidth: "350px",
                    height: "45px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                        height: "100%",
                    },
                    "& .MuiInputBase-input": {
                        padding: "0 14px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            />
            <Box
                component="button"
                onClick={handleSearchClick} // Trigger search explicitly on button click
                sx={{
                    height: "45px",
                    padding: "0 20px",
                    backgroundColor: "#605585",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "#504674",
                    },
                }}
            >
                Search
            </Box>
        </Box>
    );
};

export default LibSearchBar;
