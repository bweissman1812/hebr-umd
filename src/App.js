import { Card, Box, ListItemButton, Button, Typography } from '@mui/material';
import './App.css';
import data from './data.json';
import { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [list, setList] = useState(data.chapters)
  const [history, setHistory] = useState([]);
  const [titleHistory, setTitleHistory] = useState([]); // Maintain a title history stack


  const chapterButtonClicked = (listItem) => {
    setTitle(`${listItem}`)
    setHistory([...history, list]);
    setTitleHistory([...titleHistory, title]); // Push the current title to the title history stack

    setList(list[listItem]);

  }

  const backClicked = () => {
    const previousList = history.pop(); // Pop the previous list from the history stack
    setList(previousList); // Set the previous list as the current list
    const previousTitle = titleHistory.pop(); // Pop the previous title from the title history stack
    setTitle(previousTitle); // Clear the title to show the parent chapter's title
  }

  const renderContent = () => {

    if (Array.isArray(list)) {
      console.log(list)
      return list.map((item) => (

        <VocabCard item={item}/>
      ));
    } 
    
    else if (typeof list === 'object') {
      return Object.keys(list).map((listItem) => (
        <ListItemButton onClick={() => chapterButtonClicked(listItem)} id="card">{listItem}</ListItemButton>

      ))
    } 
  };



  return (
    <div className="App">
      {list !== data.chapters && <Button onClick={() => backClicked()} variant='contained'>Back</Button>}
      <Typography id='title'>{title}</Typography>
      <Box id='container'>
        {renderContent()}
      </Box>
    </div>
  );
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

export default App;
