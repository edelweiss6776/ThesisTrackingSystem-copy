import React from 'react';
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography, Button, Avatar } from "@mui/material";
import bg from "../images/background.jpeg";
import logo from "../images/ThesisphereLogo.png";


const Login: React.FC = () => {
    const { googleSignIn } = UserAuth();
    const navigate = useNavigate();


    const handleGoogleSignIn = async (role: string) => {
        try {
            await googleSignIn();


            switch (role) {
                case 'User':
                    navigate('/UserHome');
                    break;
                case 'Librarian':
                    navigate('/LibrarianHome');
                    break;
                case 'Admin':
                    navigate('/AdminHome');
                    break;
                default:
                    navigate('/GuestShelf');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <CssBaseline />


            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <img
                    alt="Library Logo"
                    src={logo}
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                    }}
                />
                <Typography variant="h5" color="#221D33" sx={{ fontWeight: 'bold' }}>
                    THESISPHERE
                </Typography>
            </Box>


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `linear-gradient(#9689C2B3, #9689C2B3), url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100%',
                }}
            >
                <Container maxWidth="xs">
                    <Box
                        sx={{
                            mt: 1,
                            p: 2,
                            border: "1px solid #221D33",
                            bgcolor: "transparent",
                            borderRadius: 2,
                            boxShadow: 10,
                            width: '100%',
                        }}
                    >
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            Login as
                        </Typography>


                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 1,
                                mb: 1,
                                bgcolor: '#221D33',
                                color: 'white',
                                '&:hover': { bgcolor: '#000000e6' },
                                width: '100%',
                            }}
                            onClick={() => handleGoogleSignIn('User')}
                        >
                            Student Login
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 0.5,
                                mb: 1,
                                bgcolor: '#221D33',
                                color: 'white',
                                '&:hover': { bgcolor: '#000000e6' },
                                width: '100%',
                            }}
                            onClick={() => handleGoogleSignIn('Librarian')}
                        >
                            Librarian Login
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 0.5,
                                mb: 1,
                                bgcolor: '#221D33',
                                color: 'white',
                                '&:hover': { bgcolor: '#000000e6' },
                                width: '100%',
                            }}
                            onClick={() => handleGoogleSignIn('Admin')}
                        >
                            Admin Login
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 0.5,
                                mb: 1,
                                bgcolor: '#221D33',
                                color: 'white',
                                '&:hover': { bgcolor: '#000000e6' },
                                width: '100%',
                            }}
                            onClick={() => navigate('/GuestShelf')}
                        >
                            Guest Mode
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};


export default Login;



