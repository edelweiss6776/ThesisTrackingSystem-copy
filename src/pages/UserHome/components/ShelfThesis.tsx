import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Avatar, Divider, CircularProgress } from '@mui/material';
import DefaultCover from "../../../images/DefaultCover.jpg"; // Replace with your default image path
import axios from 'axios';

interface Thesis {
    id: string;
    THESIS_TITLE: string;
    AUTHOR: string;
    YEAR: number;
    COLLEGE_DEPT: string;
    ABSTRACT: string;
}

const ShelfThesis: React.FC = () => {
    const [theses, setTheses] = useState<Thesis[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('');
    const [sortKey, setSortKey] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchTheses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/search'); // Update URL if needed
                setTheses(response.data);
            } catch (error) {
                console.error('Error fetching theses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTheses();
    }, []);

    const filterAndSortTheses = () => {
        let filtered = theses;

        // Apply filter
        if (filter) {
            filtered = filtered.filter(thesis =>
                thesis.THESIS_TITLE.toLowerCase().includes(filter.toLowerCase()) ||
                thesis.AUTHOR.toLowerCase().includes(filter.toLowerCase()) ||
                thesis.COLLEGE_DEPT.toLowerCase().includes(filter.toLowerCase())
            );
        }

        // Apply sort
        if (sortKey) {
            filtered.sort((a, b) => {
                const valueA = a[sortKey as keyof Thesis];
                const valueB = b[sortKey as keyof Thesis];

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortOrder === 'asc'
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                }

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
                }

                return 0;
            });
        }

        return filtered;
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
            }}
        >
            {/* Filter and Sort Inputs */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                {/* Filter Input */}
                <input
                    type="text"
                    placeholder="Search by title, author, or department"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '300px',
                    }}
                />

                {/* Sort Dropdown */}
                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                >
                    <option value="">Sort By</option>
                    <option value="THESIS_TITLE">Title</option>
                    <option value="AUTHOR">Author</option>
                    <option value="YEAR">Year</option>
                    <option value="COLLEGE_DEPT">Department</option>
                </select>

                {/* Sort Order Toggle */}
                <button
                    onClick={() =>
                        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                    }
                    style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor: '#ddd',
                        cursor: 'pointer',
                    }}
                >
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
            </Box>

            {/* Theses List */}
            <Grid container spacing={2}>
                {filterAndSortTheses().map((thesis) => (
                    <Grid item xs={12} sm={6} md={3} key={thesis.id}>
                        <Box
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '16px',
                                textAlign: 'center',
                            }}
                        >
                            <Avatar
                                alt="Research Title Cover"
                                src={DefaultCover} // Replace with a dynamic cover if available
                                sx={{
                                    width: 144,
                                    height: 215,
                                    borderRadius: '6px',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                }}
                            />
                            <Typography variant="h6">
                                {thesis.THESIS_TITLE}
                            </Typography>
                            <Typography variant="body2">
                                Author: {thesis.AUTHOR}
                            </Typography>
                            <Typography variant="body2">
                                Year: {thesis.YEAR}
                            </Typography>
                            <Typography variant="body2">
                                Department: {thesis.COLLEGE_DEPT}
                            </Typography>
                            <Typography variant="body2">
                                Abstract: {thesis.ABSTRACT.slice(0, 50)}...
                            </Typography>
                            <Divider
                                sx={{
                                    marginTop: '8px',
                                    marginBottom: '18px',
                                    backgroundColor: '#000',
                                    height: '1px',
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ShelfThesis;
