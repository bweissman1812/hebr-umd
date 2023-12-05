import './App.css';
import { Box, ListItemButton, Typography } from '@mui/material';
import data from './data.json';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';


export function Chapters () {
    const navigate = useNavigate();

    const chapterButtonClicked = (listItem) => {
        const test = listItem.replace(/\s/g, "");
        navigate(`/${test}`)
    }

    return (
        <Box id='columns'>
            <NavBar />
            <Typography id='title' variant='h3'>UMD Hebrew Vocab App</Typography>
            <Box id="container"> 
                {Object.keys(data.chapters).map((listItem, index) => (
                    <ListItemButton key={index} onClick={() => chapterButtonClicked(listItem)} id="card">
                        <Typography variant='h5'>{listItem[0].toUpperCase() + listItem.slice(1)}</Typography>
                    </ListItemButton>
                )   
            )}
            </Box>
        </Box>
    )
}

export function Chapter () {
    const navigate = useNavigate();
    const { chapterNumber } = useParams();

    const chapterButtonClicked = (listItem) => {
        const test = listItem.replace(/\s/g, "");
        navigate(`${test}`)
    }

    const gameButtonClicked = () => {
        navigate('game');
    }

    return (
        <Box id='columns'>
            <NavBar />
            <Typography id='title' variant='h3'>{chapterNumber[0].toUpperCase() + chapterNumber.slice(1)}</Typography>
            <Box id="container"> 
                {Object.keys(data.chapters[chapterNumber]).map((listItem, index) => (
                    <ListItemButton key={index} onClick={() => chapterButtonClicked(listItem)} id="card">
                        <Typography variant='h5'>{listItem[0].toUpperCase() + listItem.slice(1)}</Typography>
                    </ListItemButton>
                )   
            )}
            <ListItemButton id="card" onClick={gameButtonClicked}>
                <Typography variant='h5'>Game</Typography>
            </ListItemButton>
            {chapterNumber === 'chapter-13' && 
            <ListItemButton id="card" onClick={() => (navigate('conjugation'))}>
                <Typography variant='h5'>Conjugate</Typography>
            </ListItemButton>
            }
            </Box>
        </Box>
    )
}