import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import GuestAcct from './GuestAcct';


interface NavBarProps {
    id?: string;
}


const GuestNavBar: React.FC<NavBarProps> = ({ id }) => {
    const navigate = useNavigate();
    const location = useLocation();


    const getTabValue = (path: string) => {
        if (path.includes("GuestShelf")) return "GuestShelf";
        if (path.includes("About")) return "About";
        return "Shelf";
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
                <Tab value="Shelf" label="Shelf" onClick={() => navigate("/GuestShelf")} />
                <Tab value="About" label="About" onClick={() => navigate("/About")} />
            </Tabs>
            <GuestAcct />
        </Box>
    );
};


export default GuestNavBar;



