import React from "react";
import { CssBaseline, AppBar, Toolbar, Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import LibSearchBar from "./components/LibSearchBar";
import LibNavBar from "./components/LibNavBar";

const ThesisMngmt: React.FC = () => {
  // Dummy data for the table (you would replace this with actual data)
  const thesisData = [
    { title: "Thesis 1", author: "Student A", datePublished: "2024-01-01" },
    { title: "Thesis 2", author: "Student B", datePublished: "2024-03-15" },
    { title: "Thesis 3", author: "Student C", datePublished: "2024-05-22" },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
          backgroundColor: "#9689C2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "150px",
        }}
      >
        {/* Search Bar */}
        <LibSearchBar />

        {/* Buttons (Edit and Add) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "25px",
            marginBottom: "2rem",
            width: "90%",
          }}
        >
          <Button
            component="button"
            sx={{
              height: "45px",
              width: "100px",
              padding: "0 20px",
              backgroundColor: "#D3C5FF",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "normal",
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#B8A8D2",
              },
            }}
          >
            Upload
          </Button>
          <Button
            component="button"
            sx={{
              height: "45px",
              width: "100px",
              padding: "0 20px",
              backgroundColor: "#605585",
              color: "#FFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "normal",
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#504674",
              },
            }}
          >
            Edit
          </Button>
        </Box>

        {/* Table for Thesis Data */}
        <Paper sx={{ width: '85%', margin: '0 auto', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ backgroundColor: "#D3C5FF", borderBottom: "1px solid #B8A8D2", fontWeight: 'bold' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Thesis Title</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#D3C5FF", borderBottom: "1px solid #B8A8D2", fontWeight: 'bold' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Author</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#D3C5FF", borderBottom: "1px solid #B8A8D2", fontWeight: 'bold' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Date Published</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {thesisData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((thesis, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} sx={{ height: "40px" }}>
                      <TableCell align="left">{thesis.title}</TableCell>
                      <TableCell align="left">{thesis.author}</TableCell>
                      <TableCell align="left">{thesis.datePublished}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={thesisData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Delete and Organize Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "25px",
            width: "90%",
            marginTop: "30px"
          }}
        >
          <Button
            component="button"
            sx={{
              height: "45px",
              width: "100px",
              padding: "0 20px",
              backgroundColor: "#D3C5FF",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "normal",
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#B8A8D2",
              },
            }}
          >
            Delete
          </Button>
          <Button
            component="button"
            sx={{
              height: "45px",
              width: "100px",
              padding: "0 20px",
              backgroundColor: "#605585",
              color: "#FFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "normal",
              textTransform: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#504674",
              },
            }}
          >
            Organize
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ThesisMngmt;
