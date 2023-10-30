import { Box, Typography } from "@mui/material";
import NavBar from "./NavBar";


function Help() {
    return (
        <>
            <NavBar />
            <Box id='columns'>
                <Typography variant="h4">How to use</Typography>
                <Typography>
                - I recommend going through the vocab cards of a unit first. <br />
                - Then try doing the game and grammar. <br />
                - Once you feel comfortable, go back to the vocab and see how you can do without multiple choice
                </Typography>
            </Box>
        </>
    )
}

export default Help;