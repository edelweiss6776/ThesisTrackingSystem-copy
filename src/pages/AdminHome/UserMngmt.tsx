import React, { useState, useEffect } from "react";
import axios from "axios";
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
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import AdminNavBar from "./components/AdminNavBar";
import AdminSearchBar from "./components/AdminSearchBar";

// Define interfaces for type safety
interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    roleID: string;
    status: string;
}

interface Role {
    id: string;
    name: string;
}

const UserMngmt: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loggedInUsers, setLoggedInUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editUser, setEditUser] = useState<User | null>(null);

    // Fetch data utility
    const fetchData = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
        try {
            const response = await axios.get(endpoint);
            const data = Array.isArray(response.data) ? response.data : [];
            setter(data);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            setter([]); // Fallback to an empty array on error
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData("/users", setUsers);
        fetchData("/logged-in-users", setLoggedInUsers);
        fetchData("/roles", setRoles);
    }, []);

    // Pagination handlers
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Handle edit button click
    const handleEditClick = (user: User) => {
        setEditUser({ ...user });
    };

    // Handle modal close
    const handleCloseModal = () => {
        setEditUser(null);
    };

    // Handle form submission
    const handleEditSubmit = async () => {
        if (!editUser) return;

        try {
            await axios.put(`/users/${editUser.id}`, editUser);
            fetchData("/users", setUsers); // Refresh the user list
            handleCloseModal();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Render roles in table
    const renderRoleName = (roleID: string) => {
        return roles.find((role) => role.id === roleID)?.name || "Unknown";
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "#D3C5FF" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                <Box sx={{ marginTop: "25px", marginBottom: "20px" }}>
                    <AdminSearchBar searchQuery={""} setSearchQuery={() => { }} />
                </Box>

                <Typography variant="h6" sx={{ marginBottom: "16px", color: "white" }}>
                    All Users
                </Typography>
                <Paper sx={{ width: "85%" }}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Username</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Logged In</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(users) && users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align="center">{user.userName}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{renderRoleName(user.roleID)}</TableCell>
                                        <TableCell align="center">{user.status}</TableCell>
                                        <TableCell align="center">
                                            {loggedInUsers.some((u) => u.id === user.id) ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleEditClick(user)}>Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

            {/* Modal for editing user */}
            <Modal open={!!editUser} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        p: 4,
                        boxShadow: 24,
                        borderRadius: 1,
                        minWidth: 400,
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Edit User
                    </Typography>
                    <TextField
                        fullWidth
                        label="Username"
                        value={editUser?.userName || ""}
                        onChange={(e) => setEditUser((prev) => prev ? { ...prev, userName: e.target.value } : null)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        value={editUser?.firstName || ""}
                        onChange={(e) => setEditUser((prev) => prev ? { ...prev, firstName: e.target.value } : null)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={editUser?.lastName || ""}
                        onChange={(e) => setEditUser((prev) => prev ? { ...prev, lastName: e.target.value } : null)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={editUser?.email || ""}
                        onChange={(e) => setEditUser((prev) => prev ? { ...prev, email: e.target.value } : null)}
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={editUser?.roleID || ""}
                            onChange={(e) => setEditUser((prev) => prev ? { ...prev, roleID: e.target.value } : null)}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleEditSubmit} fullWidth>
                        Save Changes
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default UserMngmt;
