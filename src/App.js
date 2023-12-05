import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chapter, Chapters } from './Chapters';
import Vocab from './Vocab';
import Game from './Game';
import Conjugation from './Conjugate';
import About from './About';
import Help from './Help';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Chapters />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/help' element={<Help />} />
        <Route exact path='/:chapterNumber' element={<Chapter />} />
        <Route exact path='/:chapterNumber/game' element={<Game />} />
        <Route exact path='/:chapterNumber/conjugation' element={<Conjugation />} />
        <Route exact path='/:chapterNumber/:vocabType' element={<Vocab />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
