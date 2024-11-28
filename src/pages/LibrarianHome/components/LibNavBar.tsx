import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import LibAcctHover from "./LibAcctHover";
import { UserAuth } from "../../../context/AuthContext";

interface NavBarProps {
  id?: string;
}

const LibNavBar: React.FC<NavBarProps> = ({ id }) => {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get the correct tab value based on pathname
  const getTabValue = (path: string) => {
    if (path.includes("ThesisMngmt")) return "ThesisManagement";
    if (path.includes("ThesisCategories")) return "ThesisCategories";
    if (path.includes("FeedbackHistory")) return "FeedbackHistory";
    return "Librarian Dashboard"; // Default tab when no match is found
  };

  const [value, setValue] = React.useState(getTabValue(location.pathname));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/"); // Navigate to the login page after logout
    } catch (error) {
      console.log(error);
    }
  };

  const handleDashboardClick = () => {
    navigate("/LibrarianHome"); // Navigate to the librarian home page
  };

  React.useEffect(() => {
    setValue(getTabValue(location.pathname)); // Update tab value based on location
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#D3C5FF",
        padding: "0.5rem 1rem",
        width: "100%",
      }}
    >
      {/* Librarian Dashboard Title */}
      <Box onClick={handleDashboardClick} sx={{ cursor: "pointer" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
          Librarian Dashboard
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="navbar tabs"
          sx={{
            "& .MuiTab-root": {
              color: "#000",
              "&.Mui-selected": {
                fontWeight: "bold",
              },
            },
          }}
        >
          <Tab
            value="ThesisManagement"
            label="Thesis Management"
            onClick={() => navigate("/ThesisMngmt")}
          />
          <Tab
            value="ThesisCategories"
            label="Thesis Categories"
            onClick={() => navigate("/ThesisCategories")}
          />
          <Tab
            value="FeedbackHistory"
            label="Feedback History"
            onClick={() => navigate("/FeedbackHistory")}
          />
          <Tab value="Logout" label="Logout" onClick={handleSignOut} />
        </Tabs>
        <LibAcctHover />
      </Box>
    </Box>
  );
};

export default LibNavBar;
