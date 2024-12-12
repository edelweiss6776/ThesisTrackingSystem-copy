import React, { useState, useEffect } from "react";
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
    TextField,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import LibNavBar from "./components/LibNavBar";
import LibSearchBar from "./components/LibSearchBar";

interface Thesis {
    THESIS_TITLE: string;
    AUTHOR: string;
    YEAR: string;
    [key: string]: string | File | null;
}

interface UploadData {
    ABSTRACT: string;
    AUTHOR: string;
    COLLEGE_DEPT: string;
    PDF_FILE: File | null;
    THESIS_NO: string;
    THESIS_TITLE: string;
    TYPE: string;
    YEAR: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const ThesisMngmt: React.FC = () => {
    const [thesisData, setThesisData] = useState<Thesis[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [uploadData, setUploadData] = useState<UploadData>({
        ABSTRACT: "",
        AUTHOR: "",
        COLLEGE_DEPT: "",
        PDF_FILE: null,
        THESIS_NO: "",
        THESIS_TITLE: "",
        TYPE: "",
        YEAR: "",
    });

    const fetchTheses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/search`, {
                params: { q: searchQuery },
            });
            setThesisData(response.data);
        } catch (error) {
            console.error("Error fetching thesis data:", error);
            showSnackbar("Failed to load theses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheses();
    }, [searchQuery]);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUploadData({ ...uploadData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setUploadData({ ...uploadData, PDF_FILE: e.target.files[0] });
        }
    };

    const handleUploadSubmit = async () => {
        const formData = new FormData();
        Object.entries(uploadData).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value instanceof File ? value : String(value));
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            showSnackbar("Thesis uploaded successfully!");
            setUploadModalOpen(false);
            resetUploadForm();
            fetchTheses(); // Refresh data after upload
        } catch (error) {
            console.error("Upload failed:", error);
            showSnackbar("Failed to upload thesis. Please try again.");
        }
    };

    const resetUploadForm = () => {
        setUploadData({
            ABSTRACT: "",
            AUTHOR: "",
            COLLEGE_DEPT: "",
            PDF_FILE: null,
            THESIS_NO: "",
            THESIS_TITLE: "",
            TYPE: "",
            YEAR: "",
        });
    };

    const showSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "#D3C5FF" }}>
                <Toolbar>
                    <LibNavBar />
                </Toolbar>
            </AppBar>

            <Box sx={{ minHeight: "100vh", paddingTop: "100px", backgroundColor: "#9689C2" }}>
                <Box sx={{ margin: "40px auto", textAlign: "center" }}>
                    <LibSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        onSearch={() => fetchTheses()}
                    />
                </Box>

                <Box sx={{ textAlign: "right", marginBottom: "20px", marginRight: "120px" }}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setUploadModalOpen(true)}
                        sx={{ backgroundColor: "#6A5ACD" }}
                    >
                        Upload Thesis
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Paper sx={{ width: "85%", margin: "0 auto" }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thesis Title</TableCell>
                                        <TableCell>Author</TableCell>
                                        <TableCell>Year</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {thesisData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((thesis, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{thesis.THESIS_TITLE}</TableCell>
                                                <TableCell>{thesis.AUTHOR}</TableCell>
                                                <TableCell>{thesis.YEAR}</TableCell>
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
                )}
            </Box>

            <Modal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: 4,
                        maxWidth: "500px",
                        margin: "auto",
                        borderRadius: "8px",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Upload Thesis
                    </Typography>
                    <TextField
                        label="Thesis Title"
                        name="THESIS_TITLE"
                        value={uploadData.THESIS_TITLE}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Abstract"
                        name="ABSTRACT"
                        value={uploadData.ABSTRACT}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Author"
                        name="AUTHOR"
                        value={uploadData.AUTHOR}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="College Department"
                        name="COLLEGE_DEPT"
                        value={uploadData.COLLEGE_DEPT}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Year"
                        name="YEAR"
                        value={uploadData.YEAR}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Thesis No."
                        name="THESIS_NO"
                        value={uploadData.THESIS_NO}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Type"
                        name="TYPE"
                        value={uploadData.TYPE}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <Button variant="contained" component="label" sx={{ marginRight: "10px" }}>
                        Upload PDF
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUploadSubmit}
                        sx={{ backgroundColor: "#6A5ACD" }}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>

            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={3000}
            />
        </>
    );
};

export default ThesisMngmt;
