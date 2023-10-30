import { Card, Box, Button, Typography } from '@mui/material';
import './App.css';
import data from './data.json';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

function Vocab() {
    const { chapterNumber, vocabType } = useParams();

    return (
        <Box id="columns">
            <NavBar />
            <Typography id='vocab-type' variant='h4'>{vocabType[0].toUpperCase() + vocabType.slice(1)}</Typography>
            <Box id="container">
                {data.chapters[chapterNumber][vocabType].map((item, index) => (
                    <VocabCard key={index} item={item} chapterNumber={chapterNumber} vocabType={vocabType} />
                ))}
            </Box>
        </Box>
    )

}

function VocabCard({ item, chapterNumber, vocabType }) {
    const [displayEnglish, setDisplayEnglish] = useState(true);

    // to do: mute audio so only one is playing
    const voiceButtonClicked = (item) => {
        var audio = new Audio(item.audioPath);
        audio.play();
    }

    return (
        <Card id="vocab-card">
            <Typography>{displayEnglish ? item.english : item.hebrew}</Typography>
            <Button
                variant='contained'
                onClick={() => {
                    setDisplayEnglish(!displayEnglish);
                }}
            >
                {displayEnglish ? "Hebrew" : "English"}
            </Button>
            <Button variant='contained' onClick={() => voiceButtonClicked(item)}>Play</Button>
        </Card>
    );
}

export default Vocab;