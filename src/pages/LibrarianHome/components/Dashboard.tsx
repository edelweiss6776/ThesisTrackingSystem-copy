import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import LibSearchBar from "./LibSearchBar";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'; // Importing the Notifications Icon

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "550px",
        minWidth: "100%",
        backgroundColor: "#9689C2",
        paddingTop: "100px",
        textAlign: "center",
        position: "relative", 
      }}
    >
      {/* Notification Icon */}
      <Box
        sx={{
          position: "absolute",
          top: "110px",
          right: "50px",
          cursor: "pointer",
          color: "#605585",
        }}
      >
        <NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }} />
      </Box>

        {/* Search Bar */}
        <LibSearchBar />

      {/* Stats Boxes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          width: "90%",
          padding: "20px",
        }}
      >
        {[ 
          { label: "Total Thesis Files", count: "1234", Icon: FolderOutlinedIcon },
          { label: "Pending Approvals", count: "56", Icon: AccessTimeOutlinedIcon },
          { label: "Revisions Required", count: "12", Icon: EditNoteOutlinedIcon },
          { label: "Categories Managed", count: "8", Icon: FileOpenOutlinedIcon },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#D3C5FF",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              height: "220px",
            }}
          >
            {/* Icon */}
            <item.Icon
              sx={{
                width: "50px",
                height: "50px",
                color: "#605585",
                marginBottom: "10px",
              }}
            />
            {/* Count */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#49454F",
              }}
            >
              {item.count}
            </Typography>
            {/* Label */}
            <Typography
              variant="subtitle1"
              sx={{
                color: "#49454F",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
