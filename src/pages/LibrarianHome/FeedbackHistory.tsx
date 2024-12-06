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
import LibNavBar from "./components/LibNavBar";
import LibSearchBar from "./components/LibSearchBar";

const FeedbackHistory: React.FC = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const categories = [
        { title: "Machine Learning", student: "Juan Dela Cruz", feedback: "Wow!" },
        { title: "Library Management System", student: "Leo Gabriel", feedback: "Send copy." },
        { title: "Mini Compiler", student: "Jairus Ramos", feedback: "Borrow." },
        { title: "Cybersecurity", student: "Alyssa San Pedro", feedback: "Nice." },
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
          <LibNavBar />
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
          <LibSearchBar searchQuery={""} setSearchQuery={() => {}} />
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
                            Thesis Title
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "33%", borderRight: "1px solid #ccc" }}
                        >
                            Student Name
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "33%" }}
                        >
                            Feedback
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                        <TableRow key={index}>
                        <TableCell align="left" sx={{ width: "33%", borderRight: "1px solid #ccc" }}>
                            {row.title}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "33%", borderRight: "1px solid #ccc" }}>
                            {row.student}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "33%" }}>
                            {row.feedback}
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

        {/* Submit and Cancel Buttons */}
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
          <Button variant="contained" sx={{ backgroundColor: "#6A5ACD" }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#605585" }}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FeedbackHistory;
