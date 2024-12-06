import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Modal,
  TextField as MuiTextField,
} from "@mui/material";
import LibNavBar from "./components/LibNavBar";
import LibSearchBar from "./components/LibSearchBar";

const ThesisCategories: React.FC = () => {
    const [createNewModal, setCreateNewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const categories = ["Thesis Category 1", "Thesis Category 2", "Thesis Category 3", "Thesis Category 4"];
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    const openCreateNewModal = () => setCreateNewModal(true);
    const closeCreateNewModal = () => setCreateNewModal(false);
    const openEditModal = () => setEditModal(true);
    const closeEditModal = () => setEditModal(false);
    const openDeleteModal = () => setDeleteModal(true);
    const closeDeleteModal = () => setDeleteModal(false);
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
        <Box sx={{ marginTop: "25px", marginBottom: "5px" }}>
          <LibSearchBar searchQuery={""} setSearchQuery={() => {}} />
        </Box>

        {/* Create New Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginRight: "225px",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6A5ACD" }}
            onClick={openCreateNewModal}
          >
            Create New
          </Button>
        </Box>

        {/* Table for Thesis Categories */}
        <Paper sx={{ width: "85%", margin: "0 auto" }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Thesis Category
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{category}</TableCell>
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

        {/* Edit and Delete Buttons */}
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
          <Button variant="contained" sx={{ backgroundColor: "#6A5ACD" }} onClick={openEditModal}>
            Edit
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#605585" }} color="error" onClick={openDeleteModal}>
            Delete
          </Button>
        </Box>
      </Box>

      <Modal open={createNewModal} onClose={closeCreateNewModal}>
        <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#D3C5FF",
            borderRadius: 2,
            p: 4,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            New Thesis Category
            </Typography>
            <MuiTextField
            label="Enter New Category"
            fullWidth
            sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "gray",
                },
                "&:hover fieldset": {
                    borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "black",
                },
                },
                "& .MuiInputBase-input": {
                color: "black",
                },
                "& .MuiInputLabel-root": {
                color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
                },
            }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
                variant="outlined"
                sx={{
                color: "black",
                borderColor: "gray",
                "&:hover": {
                    borderColor: "black",
                },
                }}
                onClick={closeCreateNewModal}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                sx={{
                backgroundColor: "#6A5ACD",
                "&:hover": {
                    backgroundColor: "#5A4EB0",
                },
                }}
            >
                Submit
            </Button>
            </Box>
        </Box>
        </Modal>


      {/* Edit Modal */}
      <Modal open={editModal} onClose={closeEditModal}>
      <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#D3C5FF",
            borderRadius: 2,
            p: 4,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Edit Thesis Category
            </Typography>
            <MuiTextField
            label="Select Thesis Category"
            fullWidth
            sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "gray",
                },
                "&:hover fieldset": {
                    borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "black",
                },
                },
                "& .MuiInputBase-input": {
                color: "black",
                },
                "& .MuiInputLabel-root": {
                color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
                },
            }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
                variant="outlined"
                sx={{
                color: "black",
                borderColor: "gray",
                "&:hover": {
                    borderColor: "black",
                },
                }}
                onClick={closeEditModal}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                sx={{
                backgroundColor: "#6A5ACD",
                "&:hover": {
                    backgroundColor: "#5A4EB0",
                },
                }}
            >
                Save changes
            </Button>
            </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModal} onClose={closeDeleteModal}>
        <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#D3C5FF",
            borderRadius: 2,
            p: 4,
            }}
        >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: 2 }}>
            Are you sure you want to delete this category?
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "gray", marginBottom: 2 }}>
            All theses within this category will be unassigned
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
                variant="outlined"
                sx={{
                color: "black",
                borderColor: "gray",
                "&:hover": {
                    borderColor: "black",
                },
                }}
                onClick={closeDeleteModal}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                sx={{
                backgroundColor: "#6A5ACD",
                "&:hover": {
                    backgroundColor: "#5A4EB0",
                },
                }}
            >
                Continue
            </Button>
            </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ThesisCategories;
