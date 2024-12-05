import React from "react";
import { AppBar, Toolbar, CssBaseline, Box, Container } from "@mui/material";
import AdminNavBar from "./components/AdminNavBar";
import AdminDashboard from "./components/AdminDashboard";
import RecentActs from "./components/RecentActs";

const AdminHome: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#D3C5FF",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          {/* Navbar */}
          <AdminNavBar />
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100%",
          backgroundColor: "#D3C5FF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >

        {/* AdminDashboard */}
        <Box
          sx={{
            minWidth: "100%",
            backgroundColor: "#9689C2",
            marginBottom: "40px"
          }}
        >
          <AdminDashboard />
        </Box>

          {/* Last Activity Summary */}
          <Container
            sx={{
              minWidth: "95%",
              backgroundColor: "#9689C2",
            }}
          >
        <RecentActs />
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default AdminHome;
