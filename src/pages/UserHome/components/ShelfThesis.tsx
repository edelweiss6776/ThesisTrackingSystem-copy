import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    Box,
    Typography,
    Grid,
    Avatar,
    Divider,
    CircularProgress,
    Button,
    TextField,
    MenuItem,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import DefaultCover from '../../../images/DefaultCover.jpg';
import axios from 'axios';
import { debounce } from 'lodash';
import { Sort } from '@mui/icons-material';

interface Thesis {
    id: string;
    THESIS_TITLE: string;
    AUTHOR: string;
    YEAR: number;
    COLLEGE_DEPT: string;
    ABSTRACT: string;
}

const ThesisCard: React.FC<{
    thesis: Thesis;
    isBookmarked: boolean;
    onBookmarkToggle: (id: string) => void;
    onViewAbstract: (ABSTRACT: string) => void; // This is passed down to view the abstract.
}> = ({ thesis, isBookmarked, onBookmarkToggle, onViewAbstract }) => (
    <Box
        sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: 2,
            textAlign: 'center',
            backgroundColor: '#fff',
            boxShadow: 1,
        }}
    >
        <Avatar
            alt="Research Title Cover"
            src={DefaultCover}
            sx={{
                width: 144,
                height: 215,
                borderRadius: '8px',
                margin: '0 auto 16px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2, marginBottom: 1 }}>
            {thesis.THESIS_TITLE}
        </Typography>
        <Typography variant="body2">Author: {thesis.AUTHOR}</Typography>
        <Typography variant="body2">Year: {thesis.YEAR}</Typography>
        <Typography variant="body2">Department: {thesis.COLLEGE_DEPT}</Typography>
        <Typography variant="body2">Abstract: {thesis.ABSTRACT.slice(0, 50)}...</Typography>
        <Divider sx={{ marginY: 2 }} />
        <Button
            variant={isBookmarked ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => onBookmarkToggle(thesis.id)}
            sx={{ marginBottom: 1 }}
        >
            {isBookmarked ? 'Unbookmark' : 'Bookmark'}
        </Button>
        <Button variant="text" onClick={() => onViewAbstract(thesis.ABSTRACT)}>
            View Abstract
        </Button>
    </Box>
);

const ShelfThesis: React.FC<{ onViewAbstract: (abstract: string) => void }> = ({ onViewAbstract }) => {
    const [theses, setTheses] = useState<Thesis[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

    const [openDialog, setOpenDialog] = useState(false);
    const [currentAbstract, setCurrentAbstract] = useState('');

    useEffect(() => {
        const fetchTheses = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get('http://localhost:5000/search');
                setTheses(response.data);
            } catch (error) {
                console.error('Error fetching theses:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTheses();
    }, []);

    const handleFilterChange = useCallback(
        debounce((value: string) => {
            setFilter(value);
        }, 300),
        []
    );

    const toggleBookmark = (id: string) => {
        setBookmarked((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    };

    const filteredAndSortedTheses = useMemo(() => {
        let filtered = theses;

        // Apply filter
        if (filter) {
            filtered = filtered.filter((thesis) =>
                [thesis.THESIS_TITLE, thesis.AUTHOR, thesis.COLLEGE_DEPT].some((field) =>
                    field.toLowerCase().includes(filter.toLowerCase())
                )
            );
        }

        // Separate bookmarked and non-bookmarked theses
        const bookmarkedTheses = filtered.filter((thesis) => bookmarked.has(thesis.id));
        const nonBookmarkedTheses = filtered.filter((thesis) => !bookmarked.has(thesis.id));

        // Sort each group only if sortKey is set
        const sortFn = (a: Thesis, b: Thesis) => {
            if (!sortKey) return 0;

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
        };

        return [...bookmarkedTheses.sort(sortFn), ...nonBookmarkedTheses.sort(sortFn)];
    }, [theses, filter, sortKey, sortOrder, bookmarked]);

    const handleViewAbstract = (abstract: string) => {
        setCurrentAbstract(abstract);
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setCurrentAbstract('');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h6" color="error">
                    Failed to load theses. Please try again later.
                </Typography>
            </Box>
        );
    }

    if (filteredAndSortedTheses.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h6" color="textSecondary">
                    No theses found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            {/* Filter and Sort Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => handleFilterChange(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <TextField
                    label="Sort By"
                    select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    sx={{ width: '150px' }}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="THESIS_TITLE">Title</MenuItem>
                    <MenuItem value="AUTHOR">Author</MenuItem>
                    <MenuItem value="YEAR">Year</MenuItem>
                    <MenuItem value="COLLEGE_DEPT">Department</MenuItem>
                </TextField>
                <IconButton onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
                    <Sort />
                </IconButton>
            </Box>

            {/* Theses Grid */}
            <Grid container spacing={3}>
                {filteredAndSortedTheses.map((thesis) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={thesis.id}>
                        <ThesisCard
                            thesis={thesis}
                            isBookmarked={bookmarked.has(thesis.id)}
                            onBookmarkToggle={toggleBookmark}
                            onViewAbstract={handleViewAbstract} // Updated to handle abstract
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Dialog to view abstract */}
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>Abstract</DialogTitle>
                <DialogContent>
                    <Typography>{currentAbstract}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ShelfThesis;
