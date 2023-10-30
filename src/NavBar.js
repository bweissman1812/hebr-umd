import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './App.css'

function NavBar () {
    const navigate = useNavigate()

    return (
        <Box id='navbar'>
            <Button onClick={() => navigate('/')}>Home</Button>
            <Button onClick={() => navigate('/about')}>About</Button>
            <Button onClick={() => navigate('/help')}>Help</Button>
        </Box>
    )
}

export default NavBar;