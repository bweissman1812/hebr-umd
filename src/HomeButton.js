import { Typography, Box } from "@mui/material"
import './App.css';
import { useNavigate } from "react-router-dom";

function HomeButton () {
    const navigate = useNavigate();

    const homeClicked = () => {
        navigate('/');
    }

    return (
        <Box onClick={homeClicked}  id='home'>
            <Typography  variant='h5'>UMD Hebrew Vocab App</Typography>
        </Box>
    )
}

export default HomeButton