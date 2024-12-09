import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import AcctHover from './AcctHover';

interface NavBarProps {
    id?: string;
}

const NavBar: React.FC<NavBarProps> = ({ id }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getTabValue = (path: string) => {
        if (path.includes("Shelf")) return "Shelf";
        if (path.includes("About")) return "About";
        return "Home";
    };

    const [value, setValue] = React.useState(getTabValue(location.pathname));

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        setValue(getTabValue(location.pathname));
    }, [location]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="secondary"
                aria-label="navbar tabs"
            >
                <Tab value="Home" label="Home" onClick={() => navigate("/UserHome")} />
                <Tab value="Shelf" label="Shelf" onClick={() => navigate("/Shelf")} />
                <Tab value="About" label="About" onClick={() => navigate("/About")} />
            </Tabs>
            <AcctHover/>
        </Box>
    );
};

export default NavBar;