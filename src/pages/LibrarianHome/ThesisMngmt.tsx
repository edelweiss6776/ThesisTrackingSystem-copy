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
    TextField as MuiTextField,
} from "@mui/material";
import axios from "axios";
import LibNavBar from "./components/LibNavBar";
import LibSearchBar from "./components/LibSearchBar";

const ThesisMngmt: React.FC = () => {
    const [thesisData, setThesisData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [uploadData, setUploadData] = useState({
        ABSTRACT: "",
        AUTHOR: "",
        COLLEGE_DEPT: "",
        PDF_FILE: null as File | null,
        THESIS_NO: "",
        THESIS_TITLE: "",
        TYPE: "",
        YEAR: "",
    });

    // Fetch data from the API
    const fetchTheses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/search", {
                params: { q: searchQuery },
            });
            setThesisData(response.data);
        } catch (error) {
            console.error("Error fetching thesis data:", error);
        }
    };

    useEffect(() => {
        fetchTheses();
    }, [searchQuery]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUploadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUploadData({ ...uploadData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadData({ ...uploadData, PDF_FILE: e.target.files[0] });
        }
    };

    const handleUploadSubmit = async () => {
        const formData = new FormData();
        Object.entries(uploadData).forEach(([key, value]) => {
            if (key === "PDF_FILE" && value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value as string);
            }
        });

        try {
            await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Thesis uploaded successfully!");
            setUploadModalOpen(false);
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
            fetchTheses(); // Refresh data after upload
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload thesis.");
        }
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
                <Box sx={{ marginTop: "40px", marginBottom: "10px" }}>
                <LibSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Box>
                
                {/* Upload Thesis Button */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginRight: "225px", marginBottom: "20px" }}>
                    <Button
                    variant="contained"
                    sx={{ backgroundColor: "#6A5ACD" }}
                    onClick={() => setUploadModalOpen(true)}
                    >
                    Upload Thesis
                    </Button>
                </Box>

                {/* Table for Thesis Data */}
                <Paper sx={{ width: "85%", margin: "0 auto" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Thesis Title</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Author</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Date Published</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {thesisData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((thesis, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{thesis.THESIS_TITLE}</TableCell>
                                            <TableCell align="center">{thesis.AUTHOR}</TableCell>
                                            <TableCell align="center">{thesis.YEAR}</TableCell>
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
            </Box>

            {/* Upload Modal */}
            <Modal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Upload Thesis
                    </Typography>
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <MuiTextField
                            label="Thesis Title"
                            name="THESIS_TITLE"
                            value={uploadData.THESIS_TITLE}
                            onChange={handleUploadInputChange}
                        />
                        <MuiTextField
                            label="Author"
                            name="AUTHOR"
                            value={uploadData.AUTHOR}
                            onChange={handleUploadInputChange}
                        />
                        <MuiTextField
                            label="College/Department"
                            name="COLLEGE_DEPT"
                            value={uploadData.COLLEGE_DEPT}
                            onChange={handleUploadInputChange}
                        />
                        <MuiTextField
                            label="Year"
                            name="YEAR"
                            value={uploadData.YEAR}
                            onChange={handleUploadInputChange}
                        />
                        <MuiTextField
                            label="Abstract"
                            name="ABSTRACT"
                            value={uploadData.ABSTRACT}
                            multiline
                            rows={3}
                            onChange={handleUploadInputChange}
                        />
                        <Button variant="contained" component="label">
                            Upload PDF
                            <input
                                type="file"
                                hidden
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Button variant="contained" onClick={handleUploadSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ThesisMngmt;
