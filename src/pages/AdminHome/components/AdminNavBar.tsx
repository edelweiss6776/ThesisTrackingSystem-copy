import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import AdminAcctHover from "./AdminAcctHover";

interface NavBarProps {
  id?: string;
}

const AdminNavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabValue = (path: string) => {
    if (path.includes("UserMngmt")) return "UserManagement";
    if (path.includes("ActivityLogs")) return "ActivityLogs";
    if (path.includes("LibrarianRequests")) return "LibrarianRequests";
    return "Admin Dashboard";
  };

  const [value, setValue] = React.useState(getTabValue(location.pathname));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDashboardClick = () => {
    navigate("/AdminHome"); 
  };

  React.useEffect(() => {
    setValue(getTabValue(location.pathname)); 
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
      {/* Admin Dashboard Title */}
      <Box onClick={handleDashboardClick} sx={{ cursor: "pointer" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
          Admin Dashboard
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
            value="UserManagement"
            label="User Management"
            onClick={() => navigate("/UserMngmt")}
          />
          <Tab
            value="ActivityLogs"
            label="Activity Logs"
            onClick={() => navigate("/ActivityLogs")}
          />
          <Tab
            value="LibrarianRequests"
            label="Librarian Requests"
            onClick={() => navigate("/LibrarianRequests")}
          />
        </Tabs>
        <AdminAcctHover />
      </Box>
    </Box>
  );
};

export default AdminNavBar;
