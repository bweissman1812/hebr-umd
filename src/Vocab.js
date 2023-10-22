import { Card, Box, ListItemButton, Button, Typography } from '@mui/material';
import './App.css';
import data from './data.json';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Vocab() {
    const { chapterNumber, vocabType } = useParams();

    return (
        <Box id="container">
            {data.chapters[chapterNumber][vocabType].map((item) => (
                <VocabCard item={item} />
            ))}
        </Box>
    )

}

function VocabCard({ item }) {
    const [displayEnglish, setDisplayEnglish] = useState(true);

    const voiceButtonClicked = (item) => {
        const key = Object.keys(item)[0]
        console.log(key)
        var audio = new Audio(`/audios/${key}.m4a`);
        audio.play();
    }

    return (
        <Card id="vocab-card">
            {Object.keys(item).map((key, subIndex) => (
                <div key={subIndex}>
                    {displayEnglish ? key : item[key]}
                </div>
            ))}
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