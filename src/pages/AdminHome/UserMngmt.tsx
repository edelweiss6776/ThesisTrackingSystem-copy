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
  Typography,
  TablePagination,
  Modal,
  TextFieldProps,
  TextField as MuiTextField,
} from "@mui/material";
import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";

const UserMngmt: React.FC = () => {
    const [editUserModal, setEditUserModal] = useState(false);
    const [deactivateModal, setDeactivateModal] = useState(false);

    const CustomTextField: React.FC<TextFieldProps> = (props) => (
        <MuiTextField
          {...props}
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
      );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const categories = [
        { username: "JuanDelaCruz", email: "jdelacruz@neu.edu.ph", role: "student", status: "Inactive" },
        { username: "LeoGabriel", email: "lrentazida@neu.edu.ph", role: "librarian", status: "Active" },
        { username: "JairusRamos", email: "jramos@neu.edu.ph", role: "librarian", status: "Inactive" },
        { username: "AlyssaSanPedro", email: "asanpedro@neu.edu.ph", role: "student", status: "Active" },
      ];
      
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openEditUserModal = () => setEditUserModal(true);
    const closeEditUserModal = () => setEditUserModal(false);
    const openDeactivateModal = () => setDeactivateModal(true);
    const closeDeactivateModal = () => setDeactivateModal(false);

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
                            sx={{ fontWeight: "bold", width: "25%", borderRight: "1px solid #ccc" }}
                        >
                            Username
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "25%", borderRight: "1px solid #ccc" }}
                        >
                            Email
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "25%" }}
                        >
                            Role
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{ fontWeight: "bold", width: "25%" }}
                        >
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                        <TableRow key={index}>
                        <TableCell align="left" sx={{ width: "25%", borderRight: "1px solid #ccc" }}>
                            {row.username}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "25%", borderRight: "1px solid #ccc" }}>
                            {row.email}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "25%", borderRight: "1px solid #ccc" }}>
                            {row.role}
                        </TableCell>
                        <TableCell align="left" sx={{ width: "25%" }}>
                            {row.status}
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
          <Button variant="contained" sx={{ backgroundColor: "#6A5ACD" }} onClick={openEditUserModal}>
            Edit
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#605585" }} onClick={openDeactivateModal}>
            Deactivate
          </Button>
        </Box>
      </Box>

      {/* Edit Modal */}
      <Modal open={editUserModal} onClose={closeEditUserModal}>
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
            Edit User
          </Typography>

          <CustomTextField label="Name" />
          <CustomTextField label="Email" />
          <CustomTextField label="Password" type="password" />
          <CustomTextField label="Role" />

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
              onClick={closeEditUserModal}
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

      {/* Deactivate Modal */}
      <Modal open={deactivateModal} onClose={closeDeactivateModal}>
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
            Are you sure you want to deactivate this user?
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "gray", marginBottom: 2 }}>
            This action cannot be undone. This will permanently delete the users account and remove the users data from our servers.
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
                onClick={closeDeactivateModal}
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

export default UserMngmt;
