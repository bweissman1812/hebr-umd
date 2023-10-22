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
                <VocabCard item={item} chapterNumber={chapterNumber} vocabType={vocabType} />
            ))}
        </Box>
    )

}

function VocabCard({ item, chapterNumber, vocabType }) {
    const [displayEnglish, setDisplayEnglish] = useState(true);

    // to do: mute audio so only one is playing
    const voiceButtonClicked = (item) => {
        const key = Object.keys(item)[0].replace("/", ":")
        console.log(key)
        console.log(`/audios/${chapterNumber}/${vocabType}/'${key}\'.m4a`)
        var audio = new Audio(`/audios/${chapterNumber}/${vocabType}/${key}.m4a`);
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