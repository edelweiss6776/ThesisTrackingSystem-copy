import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";

const ActivityLogs: React.FC = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const categories = [
        { username: "JuanDelaCruz", logtime: "06-12-2024", activity: "edit" },
        { username: "LeoGabriel", logtime: "07-12-2024", activity: "delete" },
        { username: "JairusRamos", logtime: "08-12-2024", activity: "view" },
        { username: "AlyssaSanPedro", logtime: "09-12-2024", activity: "add" },
      ];
      
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  return (
    <>
      <CssBaseline />
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

      <Box
        sx={{
          minHeight: "100vh",
          paddingTop: "100px",
          backgroundColor: "#9689C2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Search Bar */}
        <Box sx={{ marginTop: "25px", marginBottom: "20px" }}>
          <AdminSearchBar searchQuery={""} setSearchQuery={() => {}} />
        </Box>

        {/* Table for Thesis Categories */}
        <Paper sx={{ width: "85%", margin: "0 auto" }}>
          <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "33%", borderRight: "1px solid #ccc" }}
                        >
                            Username
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "33%", borderRight: "1px solid #ccc" }}
                        >
                            Login Time
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "33%" }}
                        >
                            Activity
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                        <TableRow key={index}>
                        <TableCell align="left" sx={{ width: "33%", borderRight: "1px solid #ccc" }}>
                            {row.username}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "33%", borderRight: "1px solid #ccc" }}>
                            {row.logtime}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "33%" }}>
                            {row.activity}
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Export Logs Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "20px",
            marginRight: "225px",
            marginBottom: "20px",
            gap: "10px"
          }}
        >
          <Button variant="contained" sx={{ backgroundColor: "#605585" }}>
          Export Logs
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ActivityLogs;
