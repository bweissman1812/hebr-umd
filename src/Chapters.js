import './App.css';
import { Card, Box, ListItemButton, Button, Typography } from '@mui/material';
import data from './data.json';
import { useNavigate, useParams } from 'react-router-dom';

export function Chapters () {
    const navigate = useNavigate();

    const chapterButtonClicked = (listItem) => {
        const test = listItem.replace(/\s/g, "");
        console.log(test)
        navigate(`/${test}`)
    }

    return (
        <Box id="container"> 
            {Object.keys(data.chapters).map((listItem) => (
                <ListItemButton onClick={() => chapterButtonClicked(listItem)} id="card">
                    <Typography variant='h5'>{listItem[0].toUpperCase() + listItem.slice(1)}</Typography>
                </ListItemButton>
            )   
        )}
        </Box>
    )
}

export function Chapter () {
    const navigate = useNavigate();
    const { chapterNumber } = useParams();

    const chapterButtonClicked = (listItem) => {
        const test = listItem.replace(/\s/g, "");
        console.log(test)
        navigate(`${test}`)
    }

    return (
        <Box id="container"> 
            {Object.keys(data.chapters[chapterNumber]).map((listItem) => (
                <ListItemButton onClick={() => chapterButtonClicked(listItem)} id="card">
                    <Typography variant='h5'>{listItem[0].toUpperCase() + listItem.slice(1)}</Typography>
                </ListItemButton>
            )   
        )}
        </Box>
    )
}