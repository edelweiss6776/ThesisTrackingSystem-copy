import React, { useState } from 'react';
import { Box, Avatar, Typography, Popover, MenuItem, Divider } from '@mui/material';
import { Edit, Settings, History, Logout } from '@mui/icons-material';
import { UserAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const GuestAcct: React.FC = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isHoveringPopover, setIsHoveringPopover] = useState(false);


    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMouseLeave = () => {
        if (!isHoveringPopover) {
            setAnchorEl(null);
        }
    };


    const handlePopoverMouseEnter = () => {
        setIsHoveringPopover(true);
    };


    const handlePopoverMouseLeave = () => {
        setIsHoveringPopover(false);
        setAnchorEl(null);
    };


    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/'); // Navigate to the login page after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    return (
        <Box
            onMouseLeave={handleMouseLeave}
            sx={{ display: 'inline-block', cursor: 'pointer', position: 'relative' }}
        >
            {/* Avatar */}
            <Avatar
                onMouseEnter={(e) => handleMouseEnter(e)}
                sx={{ width: 40, height: 40 }}
                src={user?.photoURL || ''}
                alt={user?.displayName || 'User'}
            />


            {/* Popover */}
            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMouseLeave}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableRestoreFocus
                PaperProps={{
                    sx: {
                        overflow: 'visible', // Prevent cropping
                        minWidth: '200px', // Set minimum width
                        maxWidth: '400px', // Set maximum width to avoid excessive expansion
                        padding: 1, // Optional padding for aesthetics
                    },
                }}
            >
                {/* Popover Content */}
                <Box
                    onMouseEnter={handlePopoverMouseEnter}
                    onMouseLeave={handlePopoverMouseLeave}
                >
                    {/* User Info */}
                    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            src={user?.photoURL || ''}
                            alt={user?.displayName || 'User'}
                        />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body1">{user?.displayName || 'User'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user?.email}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />


                    {/* Menu Items */}
                    <MenuItem onClick={() => navigate('/EditProfile')}>
                        <Edit fontSize="small" sx={{ mr: 2 }} />
                        Edit Profile
                    </MenuItem>
                    <MenuItem onClick={() => console.log('Recent Activity')}>
                        <History fontSize="small" sx={{ mr: 2 }} />
                        Recent Activity
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>
                        <Logout fontSize="small" sx={{ mr: 2 }} />
                        Log Out
                    </MenuItem>
                </Box>
            </Popover>
        </Box>
    );
};


export default GuestAcct;





