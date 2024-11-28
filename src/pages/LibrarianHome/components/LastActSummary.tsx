import React from "react";
import { Box, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';

const LastActSummary: React.FC = () => {
  const boxContent = {
    label: "Feedback",
    Icon: EmailOutlinedIcon,
    title: "Title",
    subtitle: "dd-mm-yyyy",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "90%",
        backgroundColor: "#9689C2",
        paddingTop: "50px",
        textAlign: "left",
        position: "relative", 
    }}
  >
    {/* Full Screen Icon */}
    <Box
      sx={{
        position: "absolute",
        top: "18px",
        right: "5px",
        cursor: "pointer",
        color: "#605585",
      }}
    >
      <FullscreenRoundedIcon sx={{ fontSize: 30 }} />
    </Box>

      {/* Title */}
      <Box
        sx={{
          width: "95%",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#49454F",
          }}
        >
          Last Activity Summary
        </Typography>
      </Box>

      {/* Stats Boxes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          width: "100%",
          padding: "20px",
        }}
      >
        {/* Render three identical boxes */}
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "#D3C5FF",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              height: "180px",
              marginLeft: "20px",
            }}
          >
            {/* Feedback Text Above the Icon */}
            <Typography
              variant="h6"
              sx={{
                color: "#49454F",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {boxContent.label}
            </Typography>

            {/* Icon and Text Layout */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Icon */}
              <boxContent.Icon
                sx={{
                  width: "60px",
                  height: "60px",
                  color: "#605585",
                }}
              />
              
              {/* Title and Subtitle */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#49454F",
                    fontWeight: "bold",
                  }}
                >
                  {boxContent.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#49454F",
                  }}
                >
                  {boxContent.subtitle}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LastActSummary;
