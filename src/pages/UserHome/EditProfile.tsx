import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { AppBar, Toolbar, CssBaseline, Container, Box, Avatar, IconButton, TextField, Button, Typography, Card, CardContent, Divider, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AccountCircle, Email, School, Info } from '@mui/icons-material';
import NavBar from "./components/NavBar";
import logo from "../../images/ThesisphereLogo.png";
import school from "../../images/School.png";
import thesisphere from "../../images/Thesisphere.png";


const EditProfile: React.FC = () => {
    const { user } = UserAuth();
    const [isEditing, setIsEditing] = useState(false);


    // Form state
    const [formValues, setFormValues] = useState({
        displayName: user?.displayName || '',
        description: '',
        studentId: '',
        course: '',
        email: user?.email || '',  // Institutional email (non-editable)
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };


    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };


    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Updated profile values:', formValues);
        setIsEditing(false); // After submitting, toggle the edit mode off
    };


    return (
        <React.Fragment>
            <CssBaseline />


            {/* Background Image */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(#FFFFFFB3, #FFFFFFB3), url(${school})`,
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }}
            />


            {/* Header */}
            <AppBar
                position="relative"
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
                        padding: '8px 16px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px', marginBottom: '20px' }}>
                        <img
                            alt="Library Logo"
                            src={logo}
                            style={{
                                width: 90,
                                height: 90,
                                objectFit: 'contain',
                                transition: 'all 1s ease',
                            }}
                        />
                        <img
                            src={thesisphere}
                            alt="Library Text"
                            style={{
                                width: '300px',
                                height: '64px',
                                transition: 'width 1s ease, height 1s ease',
                            }}
                        />
                    </Box>


                    {/* Navbar Tabs */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <NavBar />
                    </Box>
                </Toolbar>
            </AppBar>


            {/* Centered Content with Profile Picture */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', top: '90px', zIndex: 1 }}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        alt="Profile Picture"
                        src={user?.photoURL || ''}
                        sx={{
                            width: 150,
                            height: 150,
                            border: '5px solid #4CAF50',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            objectFit: 'cover',
                        }}
                    />
                    <IconButton
                        onClick={handleEditToggle}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'white',
                            border: '2px solid #4CAF50',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    >
                        <EditIcon color="action" />
                    </IconButton>
                </Box>
            </Box>


            {/* Main Content - Form */}
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', padding: '16px', marginTop: '60px' }}>
                <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '500px', marginTop: '40px' }}
                >
                    {isEditing ? (
                        <>
                            <TextField
                                label="Student Name"
                                name="displayName"
                                value={formValues.displayName}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={formValues.description}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                            />
                            <TextField
                                label="Student ID"
                                name="studentId"
                                value={formValues.studentId}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Course"
                                name="course"
                                value={formValues.course}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Institutional Email"
                                name="email"
                                value={formValues.email}
                                fullWidth
                                disabled
                            />
                            <Button type="submit" variant="contained" sx={{ backgroundColor: "#6A5ACD" }} fullWidth>
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                            <Card sx={{ width: '100%', maxWidth: 500, backgroundColor: '#e9dcf7', borderRadius: '8px', boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Profile Information
                                    </Typography>


                                    <Divider sx={{ margin: '16px 0' }} />


                                    {/* Display Name */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AccountCircle sx={{ color: '#916FC6' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Student Name:
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                                            {formValues.displayName || 'N/A'}
                                        </Typography>
                                    </Box>


                                    <Divider sx={{ margin: '12px 0' }} />


                                    {/* Description */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Info sx={{ color: '#916FC6' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Description:
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                                            {formValues.description || 'N/A'}
                                        </Typography>
                                    </Box>


                                    <Divider sx={{ margin: '12px 0' }} />


                                    {/* Student ID */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="h6" sx={{ color: '#916FC6' }}>
                                            #
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Student ID:
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                                            {formValues.studentId || 'N/A'}
                                        </Typography>
                                    </Box>


                                    <Divider sx={{ margin: '12px 0' }} />


                                    {/* Course */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <School sx={{ color: '#916FC6' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Course:
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                                            {formValues.course || 'N/A'}
                                        </Typography>
                                    </Box>


                                    <Divider sx={{ margin: '12px 0' }} />


                                    {/* Institutional Email */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Email sx={{ color: '#916FC6' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Institutional Email:
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
                                            {formValues.email}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
};


export default EditProfile;





