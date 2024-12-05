import React from "react";
import { Box, Typography } from "@mui/material";
import AdminSearchBar from "./AdminSearchBar";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'; // Importing the Notifications Icon

const AdminDashboard: React.FC = () => {
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
        <AdminSearchBar searchQuery={""} setSearchQuery={() => {}} />

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
          { label: "Total Users", count: "46", Icon: PermIdentityOutlinedIcon },
          { label: "Pending Librarian Requests", count: "9", Icon: FolderOutlinedIcon },
          { label: "Recent Logins", count: "33", Icon: TimelineOutlinedIcon },
          { label: "Recent Changes", count: "4", Icon: EditNoteOutlinedIcon },
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

export default AdminDashboard;
