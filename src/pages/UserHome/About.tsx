import * as React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Box } from '@mui/material';
import NavBar from "./components/NavBar";
import logo from "../../images/ThesisphereLogo.png";
import thesisphere from "../../images/Thesisphere.png";
import school from "../../images/School.png";

function About() {
    const [scrolling, setScrolling] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />

            {/* Header */}
            <AppBar 
                sx={{ 
                    background: 'linear-gradient(to left, #9396E9 20%, #916FC6 80%)', 
                    position: 'fixed', 
                    width: '100%', 
                    padding: '0 16px',
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Aligns logo/text on the left and NavBar on the right
                    alignItems: 'flex-start', // Keeps items aligned to the top
                    width: '100%',
                }}>

                    {/* Left: Logo and Text */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginTop: scrolling ? "10px" : '20px',
                        marginBottom: scrolling ? "10px" :'20px'
                    }}>
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
                                transition: 'width 1s ease, height 1s ease'  
                            }}
                        />
                    </Box>

                    {/* Right: NavBar */}
                    <Box sx={{
                        marginTop: '8px'
                    }}>
                        <NavBar />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
                <Container
                    sx={{
                        backgroundImage: `linear-gradient(#FFFFFFB3, #FFFFFFB3), url(${school})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        minWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '180px',
                        paddingBottom: '40px',
                        textAlign: 'center',
                    }}
                >
                    {/* Header */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: '#49454F',
                            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            marginBottom: '20px',
                        }}
                    >
                        Thesisphere
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.25rem',
                            color: '#49454F',
                            lineHeight: '1.8',
                            marginBottom: '40px',
                            maxWidth: '800px',
                        }}
                    >
                        A project developed by a dedicated team of third-year Computer Science students at New Era University. 
                        Our mission is to create a comprehensive, user-friendly web library for thesis that supports research and 
                        enhances the learning experience for our peers and faculty.
                        <br /><br />
                        Our project is guided by our esteemed professor, 
                        <strong> Sir Jeremias C. Esperanza</strong>, whose expertise and mentorship have been invaluable in shaping our vision.
                    </Typography>

                    {/* Creators Section */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#49454F',
                            marginBottom: '20px', 
                        }}
                    >
                        Here are the creators:
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.25rem',
                            color: '#49454F',
                            lineHeight: '1.8',
                            maxWidth: '800px',
                        }}
                    >
                        <strong>Scrum Master:</strong> Juliana Mancera<br />
                        <strong>Developer 1:</strong> Jairus Joshua Ramos<br />
                        <strong>Developer 2:</strong> Alyssa Mae San Pedro<br />
                        <strong>Tester 1:</strong> Vince Arnold Sevilla<br />
                        <strong>Tester 2:</strong> Leo Gabriel Rentazida
                    </Typography>
                </Container>

        </React.Fragment>
    );
}

export default About;