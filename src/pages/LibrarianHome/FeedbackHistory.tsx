import React, { useState, useEffect } from "react";
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
    const [feedbackList, setFeedbackList] = useState([
        { title: "Machine Learning", student: "Juan Dela Cruz", feedback: "Wow!" },
        { title: "Library Management System", student: "Leo Gabriel", feedback: "Send copy." },
        { title: "Mini Compiler", student: "Jairus Ramos", feedback: "Borrow." },
        { title: "Cybersecurity", student: "Alyssa San Pedro", feedback: "Nice." },
    ]);
    const [filteredFeedbackList, setFilteredFeedbackList] = useState(feedbackList);

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Simulate fetching feedback history (mocked for now)
    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from an API (mock example)
            const data = [
                { title: "Machine Learning", student: "Juan Dela Cruz", feedback: "Wow!" },
                { title: "Library Management System", student: "Leo Gabriel", feedback: "Send copy." },
                { title: "Mini Compiler", student: "Jairus Ramos", feedback: "Borrow." },
                { title: "Cybersecurity", student: "Alyssa San Pedro", feedback: "Nice." },
            ];
            setFeedbackList(data);
            setFilteredFeedbackList(data);
        };

        fetchData();
    }, []);

    // Filter data based on search query
    useEffect(() => {
        const filteredData = feedbackList.filter(
            (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.feedback.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFeedbackList(filteredData);
    }, [searchQuery, feedbackList]);

    // Pagination handlers
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCancel = () => {
        console.log("Cancel action triggered!");
        // Reset any unsaved changes here (mock example)
    };

    const handleSubmit = () => {
        console.log("Submit action triggered!");
        // Process the feedback here (mock example)
    };

    function handleSearch(): void {
        throw new Error("Function not implemented.");
    }

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
                    <LibSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
                </Box>

                {/* Table for Feedback History */}
                <Paper sx={{ width: "85%", margin: "0 auto" }}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: "bold", borderRight: "1px solid #ccc" }}>
                                        Thesis Title
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", borderRight: "1px solid #ccc" }}>
                                        Student Name
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        Feedback
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredFeedbackList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }}>
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }}>
                                                {row.student}
                                            </TableCell>
                                            <TableCell align="left">{row.feedback}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredFeedbackList.length}
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
                        width: "85%",
                        marginTop: "20px",
                        marginBottom: "20px",
                        gap: "10px",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#6A5ACD" }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#605585" }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default FeedbackHistory;
