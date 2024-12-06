import * as React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Box, Avatar } from '@mui/material';
import NavBar from "./components/NavBar";
import FeaturedBooks from './components/FeaturedBooks';
import logo from "../../images/ThesisphereLogo.png";
import thesisphere from "../../images/Thesisphere.png";
import school from "../../images/School.png";

function UserHome() {
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
            <AppBar sx={{ background: 'linear-gradient(to left, #9396E9 20%, #916FC6 80%)' }}>
            <Toolbar sx={{ display: 'flex', 
                           flexDirection: 'column',
                           alignItems: 'center',
                           padding: '8px 16px'
                        }}>
                
                {/* Top row with logo and navbar */}
                <Box sx={{ display: 'flex',
                           justifyContent: 'space-between', 
                           alignItems: 'flex-start', 
                           width: '100%' 
                        }}>
                    
                    {/* Logo */}
                        <Box sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'flex-start', 
                            marginTop: scrolling ? '8px' : '56px', 
                            marginLeft: scrolling ? '10px' : '680px',
                            transition: 'all 1s ease'  
                        }}>
                            <img 
                                alt="Library Logo" 
                                src={logo} 
                                style={{
                                    width: scrolling ? '40px' : '125px',
                                    height: scrolling ? '40px' : '125px',
                                    objectFit: 'contain',
                                    transition: 'width 1s ease, height 1s ease'
                                }} 
                            />
                        </Box>

                    {/* Library text */}
                    <Box sx={{ display: 'flex', 
                               flexDirection: scrolling ? 'row' : 'column', 
                               alignItems: 'center', 
                               justifyContent: scrolling ? 'flex-start' : 'center', 
                               marginTop: scrolling ? '8px' : '170px', 
                               marginLeft: scrolling ? '30px' : '500px', 
                               transition: 'all 1s ease'
                            }}>
                        <img 
                            src={thesisphere}
                            alt="Library Logo"
                            style={{
                            width: scrolling ? '170px' : '400px',
                            height: scrolling ? '36px' : '84px',
                            transition: 'width 1s ease, height 1s ease'  
                            }}
                        />
                    </Box>

                    {/* Navbar Tabs */}
                    <NavBar />
                  </Box>
              </Toolbar>
          </AppBar>
            {/* Background and Main Content */}
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `linear-gradient(#FFFFFFB3, #FFFFFFB3), url(${school})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    minWidth: '100%',
                    paddingTop: '250px'
                }}
            >    
                <FeaturedBooks />
            </Container>
        </React.Fragment>
    );
}

export default UserHome;
