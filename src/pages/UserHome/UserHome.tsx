import * as React from 'react';
import { AppBar, Toolbar, CssBaseline, Container, Box } from '@mui/material';
import NavBar from "./components/NavBar";
import FeaturedBooks from './components/FeaturedBooks';
import schoolLogo from "../../images/Logo.png";
import logo from "../../images/ThesisphereLogo.png";
import thesisphere from "../../images/Thesisphere.png";
import school from "../../images/School.png";

function UserHome() {
    return (
        <React.Fragment>
            <CssBaseline />

            {/* Background Image */}
            <Box
                sx={{
                    position: 'fixed', // Make it fixed to span entire page
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(#FFFFFFB3, #FFFFFFB3), url(${school})`,
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed', // Ensures it stays on scroll
                    backgroundPosition: 'center',
                    zIndex: -1, // Push behind all content
                }}
            />

            {/* Header */}
            <AppBar 
                position="relative" 
                sx={{
                    background: 'linear-gradient(to left, #9396E9 20%, #916FC6 80%)',
                    minHeight: '180px',
                    boxShadow: 'none',
                }}
            >
                <Toolbar 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '8px 16px',
                    }}
                >
                    {/* School Logo on the left */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img 
                            alt="School Logo" 
                            src={schoolLogo} 
                            style={{
                                width: '180px',
                                height: '180px',
                                marginRight: '16px',
                                objectFit: 'contain',
                            }} 
                        />
                    </Box>

                    {/* Navbar Tabs on the top-right */}
                    <Box 
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start'
                        }}
                    >
                        <NavBar />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Centered Logo and Text */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    top: '-115px',
                    zIndex: 1,
                }}
            >
                <img 
                    alt="Library Logo" 
                    src={logo} 
                    style={{
                        width: '180px',
                        height: '180px',
                        objectFit: 'contain',
                    }} 
                />
                <img 
                    src={thesisphere}
                    alt="Library Text"
                    style={{
                        width: '475px',
                        height: '84px',
                        marginTop: '5px',
                    }}
                />
            </Box>

            {/* Main Content */}
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    minWidth: '100%',
                    marginTop: '-150px',
                    padding: '16px 0',
                }}
            >    
                <FeaturedBooks />
            </Container>
        </React.Fragment>
    );
}

export default UserHome;
