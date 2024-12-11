import React, { useState, useEffect, useCallback } from "react";
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    CircularProgress,
    Typography,
} from "@mui/material";
import axios from "axios";
import LibNavBar from "./components/LibNavBar";
import LibSearchBar from "./components/LibSearchBar";
import { format } from "date-fns";

interface Feedback {
    id: string;
    title: string;
    student: string;
    feedback: string;
    timestamp: any; // Firestore Timestamp or ISO string
    formattedTimestamp?: string;
}

const FeedbackHistory: React.FC = () => {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Format timestamp using date-fns
    const formatTimestamp = (timestamp: any): string => {
        try {
            const date =
                typeof timestamp === "string"
                    ? new Date(timestamp) // Handle ISO string
                    : timestamp?.toDate(); // Handle Firestore Timestamp

            if (date instanceof Date && !isNaN(date.getTime())) {
                return format(date, "MMM dd, yyyy hh:mm:ss a");
            }
            throw new Error("Invalid Date");
        } catch (error) {
            console.error("Error formatting timestamp:", error);
            return "Invalid Date";
        }
    };

    const fetchFeedback = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`/feedback`, {
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                },
            });

            const { feedback = [], total = 0 } = response.data;

            // Format timestamps
            const feedbackWithFormattedTimestamps = feedback.map((item: Feedback) => ({
                ...item,
                formattedTimestamp: formatTimestamp(item.timestamp),
            }));

            setFeedbackList(feedbackWithFormattedTimestamps);
            setTotalFeedback(total);
        } catch (err) {
            console.error("Error fetching feedback:", err);
            setError("Failed to fetch feedback. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage]);

    useEffect(() => {
        fetchFeedback();
    }, [fetchFeedback]);

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(0);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "#D3C5FF" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px" }}>
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
                <LibSearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                />

                <Paper sx={{ width: "85%", margin: "0 auto", marginTop: 3 }}>
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                            <Typography color="error">{error}</Typography>
                        </Box>
                    ) : feedbackList.length === 0 ? (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                            <Typography>No feedback found.</Typography>
                        </Box>
                    ) : (
                        <>
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
                                            <TableCell align="center" sx={{ fontWeight: "bold", borderRight: "1px solid #ccc" }}>
                                                Feedback
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                                Timestamp
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {feedbackList.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }}>
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }}>
                                                    {row.student}
                                                </TableCell>
                                                <TableCell align="left" sx={{ borderRight: "1px solid #ccc" }}>
                                                    {row.feedback}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.formattedTimestamp}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={totalFeedback}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default FeedbackHistory;
