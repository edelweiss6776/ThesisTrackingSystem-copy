import React from "react";
import { Box, TextField } from "@mui/material";

const LibSearchBar: React.FC = () => {
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
