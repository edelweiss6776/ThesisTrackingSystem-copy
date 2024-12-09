import React from "react";
import { AppBar, Toolbar, CssBaseline, Box, Container } from "@mui/material";
import LibNavBar from "./components/LibNavBar";
import Dashboard from "./components/Dashboard";
import LastActSummary from "./components/LastActSummary";

const LibrarianHome: React.FC = () => {
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
                    <LibNavBar />
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

                {/* Dashboard */}
                <Box
                    sx={{
                        minWidth: "100%",
                        backgroundColor: "#9689C2",
                        marginBottom: "40px"
                    }}
                >
                    <Dashboard />
                </Box>

                {/* Last Activity Summary */}
                <Container
                    sx={{
                        minWidth: "95%",
                        backgroundColor: "#9689C2",
                    }}
                >
                    <LastActSummary />
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default LibrarianHome;
