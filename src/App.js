import { Card, Box, ListItemButton, Button, Typography } from '@mui/material';
import './App.css';
import data from './data.json';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chapter, Chapters } from './Chapters';
import Vocab from './Vocab';
import Game from './Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Chapters />} />
        <Route exact path='/:chapterNumber' element={<Chapter />} />
        <Route exact path='/:chapterNumber/game' element={<Game />} />
        <Route exact path='/:chapterNumber/:vocabType' element={<Vocab />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
