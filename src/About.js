import { Typography, Box } from "@mui/material";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

function About (){
    const [coderName, setCoderName] = useState()
    const [coderEmail, setCoderEmail] = useState()

   

    const getCoderInfo = async () => {
        var response = await fetch('https://us-central1-hebrew-umd.cloudfunctions.net/api/coder/name');
        response = await response.json()
        setCoderName(response['name']);
        
        response = await fetch('https://us-central1-hebrew-umd.cloudfunctions.net/api/coder/email');
        response = await response.json()
        setCoderEmail(response['email']);
    }

    useEffect(() => {
        getCoderInfo()
    }, [])
    return (
        <>
            <NavBar />
            <Box id='columns'>
                <Typography variant="h4">About</Typography>
                <Typography>This app is intended to help learn Hebrew. It follows the UMD Hebrew Course</Typography>
                <Typography>To help contribute: https://github.com/bweissman1812/hebr-umd</Typography>
                <Typography>Founder Name: {coderName}</Typography>
                <Typography>Founder Email: {coderEmail}</Typography>

            </Box>
        </>
    )
}

export default About;