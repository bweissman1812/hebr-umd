import { Typography, Box } from "@mui/material";
import NavBar from "./NavBar";

function About (){
    return (
        <>
            <NavBar />
            <Box id='columns'>
                <Typography variant="h4">About</Typography>
                <Typography>This app is intended to help learn Hebrew. It follows the UMD Hebrew Course</Typography>
            </Box>
        </>
    )
}

export default About;