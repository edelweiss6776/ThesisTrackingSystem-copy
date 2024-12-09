import * as React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Box, Button, TextField, Snackbar } from '@mui/material';
import NavBar from './components/NavBar';
import logo from '../../images/ThesisphereLogo.png';
import thesisphere from '../../images/Thesisphere.png';
import school from '../../images/School.png';
import axios from 'axios';

function About() {
    const [scrolling, setScrolling] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [feedbackSent, setFeedbackSent] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleFeedbackSubmit = async () => {
        if (!feedback.trim()) {
            setError(true);
            return;
        }

        try {
            await axios.post('http://localhost:5000/feedback', {
                feedback,
                user: {
                    // Replace with real user data
                    userId: 'userId-placeholder',
                    userName: 'userName-placeholder',
                },
            });
            setFeedback('');
            setFeedbackSent(true);
        } catch (err) {
            console.error('Error sending feedback:', err);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                sx={{
                    background: 'linear-gradient(to left, #9396E9 20%, #916FC6 80%)',
                    position: 'fixed',
                    width: '100%',
                    padding: '0 16px',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginTop: scrolling ? '10px' : '20px',
                            marginBottom: scrolling ? '10px' : '20px',
                        }}
                    >
                        <img
                            alt="Library Logo"
                            src={logo}
                            style={{
                                width: scrolling ? 50 : 90,
                                height: scrolling ? 50 : 90,
                                objectFit: 'contain',
                                transition: 'all 1s ease',
                            }}
                        />
                        <img
                            src={thesisphere}
                            alt="Library Text"
                            style={{
                                width: scrolling ? '170px' : '400px',
                                height: scrolling ? '36px' : '84px',
                                transition: 'width 1s ease, height 1s ease',
                            }}
                        />
                    </Box>
                    <Box sx={{ marginTop: '8px' }}>
                        <NavBar />
                    </Box>
                </Toolbar>
            </AppBar>
            <Container
                sx={{
                    backgroundImage: `linear-gradient(#FFFFFFB3, #FFFFFFB3), url(${school})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '180px',
                    paddingBottom: '40px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#49454F', marginBottom: '20px' }}>
                    Thesisphere
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.25rem', color: '#49454F', lineHeight: '1.8', marginBottom: '40px' }}>
                    A project developed by a dedicated team of third-year Computer Science students at New Era University.
                    Our mission is to create a comprehensive, user-friendly web library for thesis that supports research and
                    enhances the learning experience for our peers and faculty.
                </Typography>
                <Typography variant="h4" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#49454F', marginBottom: '20px' }}>
                    We value your feedback
                </Typography>
                <Box sx={{ maxWidth: '600px', width: '100%', marginBottom: '20px' }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Enter your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        error={error}
                        helperText={error ? 'Feedback cannot be empty.' : ''}
                    />
                </Box>
                <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
                    Submit Feedback
                </Button>
            </Container>
            <Snackbar
                open={feedbackSent}
                autoHideDuration={6000}
                onClose={() => setFeedbackSent(false)}
                message="Feedback submitted successfully!"
            />
        </React.Fragment>
    );
}

export default About;
