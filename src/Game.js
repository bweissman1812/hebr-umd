import { useParams } from 'react-router-dom';
import './App.css';
import data from './data.json';
import { ListItemButton, Box, Button, TextField, Typography, Alert,FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';

function Game() {
    const { chapterNumber } = useParams();
    const [selectedButton, setSelectedButton] = useState(null);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [vocabWords, setVocabWords] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [correct, setCorrect] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [answeredWords, setAnsweredWords] = useState([]);
    const [isFirstAttempt, setIsFirstAttempt] = useState(true);
    const [refreshChoices, setRefreshChoices] = useState(true)
    const [displayAudioError, setDisplayAudioError] = useState(false)
    const [isNewWord, setIsNewWord] = useState(0);
    const [answerType, setAnswerType] = useState('mc');
    const [textAnswer, setTextAnswer] = useState();
    const [showOverrideText, setShowOverrideText] = useState(false)


    const usePrevious = (value, initialValue) => {
        const ref = useRef(initialValue);
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
        const previousDeps = usePrevious(dependencies, []);

        const changedDeps = dependencies.reduce((accum, dependency, index) => {
            if (dependency !== previousDeps[index]) {
                const keyName = dependencyNames[index] || index;
                return {
                    ...accum,
                    [keyName]: {
                        before: previousDeps[index],
                        after: dependency
                    }
                };
            }

            return accum;
        }, {});

        if (Object.keys(changedDeps).length) {
            console.log('[use-effect-debugger] ', changedDeps);
        }

        useEffect(effectHook, dependencies);
    };

    useEffect(() => {
        const allData = [];

        for (const vocabType in data.chapters[chapterNumber]) {
            allData.push(...data.chapters[chapterNumber][vocabType]);
        }

        setVocabWords([...allData]);

    }, []);

    useEffect(() => {
        getQandA()

    }, [vocabWords])

    useEffect(() => {
        if (vocabWords.length > 0 && shuffledAnswers.length > 0 && correct) {
            setIsLoading(false);
        }
    }, [vocabWords, shuffledAnswers, correct]);

    useEffect(() => {
        if (isNewWord)
            playButtonClicked();

    }, [isNewWord])




    const shuffleArray = (array) => {
        // Fisher-Yates Shuffle
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const answerButtonClicked = async (choice, key) => {
        if (selectedButton) {
            return;
        }

        setSelectedButton(key)
        setIsNewWord(0);

        if (choice === correct) {
            const audio = new Audio('/audios/correct.wav')
            await audio.play()
            setScore(score + 1)

            if (isFirstAttempt) {
                setAnsweredWords([...answeredWords, correct])
            }
        } else {
            const audio = new Audio('/audios/wrong.wav')
            await audio.play()
            setScore(0);
            setIsFirstAttempt(false);
        }

        setRefreshChoices(!refreshChoices)
    };

    const playButtonClicked = async () => {
        if (correct) {
            try {
                const audio = new Audio(correct.audioPath);
                await audio.play()
                setDisplayAudioError(false);
            }
            catch (error) {
                setDisplayAudioError(true)
            }
        }
    };

    async function playAudioAndWait(audioPath) {
        return new Promise((resolve) => {
            const audio = new Audio(audioPath);

            audio.addEventListener('ended', () => {
                // This event will be fired when the audio playback is complete.
                resolve();
            });

            audio.play();
        });
    }

    const getQandA = async () => {
        setIsLoading(true)
        setSelectedButton(null)
        setIsFirstAttempt(true)
        setTextAnswer('');
        setShowOverrideText(false)

        if (vocabWords.length === 0) {
            return;
        }

        var remainingWords = vocabWords.filter((word) => !answeredWords.includes(word));

        if (remainingWords.length === 0) {
            alert('You learned all the words')
            await playAudioAndWait('/audios/finishedAllWords.wav')
            setAnsweredWords([]);
            remainingWords = [...vocabWords]
            setScore(0)
        }


        shuffleArray(remainingWords);

        // Select the first word as the correct answer
        const newCorrect = remainingWords[0];
        var newWrongAnswers = [];

        // Randomly select 3 other words as wrong answers
        if (remainingWords.length < 4) {
            shuffleArray(vocabWords);
            const someVocab = vocabWords.slice(0, 3);
            const hasCorrect = someVocab.findIndex((word) => newCorrect.english === word.english);
            if (hasCorrect !== -1) {
                someVocab[hasCorrect] = vocabWords[4];

            }

            newWrongAnswers = [...someVocab];
        }
        else {
            newWrongAnswers = remainingWords.slice(1, 4);
        }

        // Combine the correct and wrong answers into a single array
        const newShuffledAnswers = [newCorrect, ...newWrongAnswers];
        shuffleArray(newShuffledAnswers)
        setCorrectIndex(newShuffledAnswers.findIndex((answer) => answer.english === newCorrect.english))
        setShuffledAnswers(newShuffledAnswers);
        setCorrect(newCorrect);
        setIsNewWord(isNewWord + 1);
    
    }

    const textSubmit = async () => {
        setIsFirstAttempt(false);

        console.log(textAnswer)
        console.log(correct.english)

        if (textAnswer === correct.english) {
            const audio = new Audio('/audios/correct.wav')
            await audio.play()
            setScore(score + 1)

            if (isFirstAttempt) {
                setAnsweredWords([...answeredWords, correct])
            }
        } else {
            setShowOverrideText(true);
            const audio = new Audio('/audios/wrong.wav')
            await audio.play()
            setScore(score - 1);
        }
    }

    const overrideText = async () => {
        const audio = new Audio('/audios/correct.wav')
        await audio.play()
        setScore(score + 2)
        setAnsweredWords([...answeredWords, correct])
        setShowOverrideText(false);
    }
    

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') { // Change 'Enter' to the desired key
            textSubmit();
        }
      };

    if (isLoading) {

        return (
            <>loading...</>
        )
    }
    else {
        return (

            <Box id="columns">
                <NavBar />
                {displayAudioError && <Alert severity='info'>Hit 'Play' to play the audio (The browser doesn't let you play audio without interaction)</Alert>}
                <div id='rows'>
                    <div className='rowItem'></div>
                    <div id='columns' className='rowItem'>
                        <Typography id='vocab-game-title' variant='h4'>Vocab Game</Typography>
                        <Typography id='remaining-score' variant='h5'>Remaining: {answeredWords.length}/{vocabWords.length}</Typography>
                        <Typography id='correct-hebrew' variant='h5'>{correct.hebrew}</Typography>
                        {!isFirstAttempt && <Typography id='correct-english' variant='h5'>{correct.english}</Typography>}
                    </div>
                    <FormControl className='rowItem'>
                        <FormLabel>Answer Type</FormLabel>
                        <RadioGroup
                            defaultValue="mc"
                            name="radio-buttons-group"
                            id='radio'
                            value={answerType} onChange={e => setAnswerType(e.target.value)}
                        >
                            <FormControlLabel value="mc" control={<Radio />} label="Multiple Choice" />
                            <FormControlLabel value="text" control={<Radio />} label="Text Input" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <Box id='container'>
                    {answerType === 'mc' && shuffledAnswers.map((choice, index) => (
                        <ListItemButton
                            id='vocab-card'
                            key={index}
                            onClick={() => answerButtonClicked(choice, index)}
                            style={{
                                backgroundColor: selectedButton != null ? correctIndex === index ? 'lightgreen' : (selectedButton === index && selectedButton !== correctIndex) ? 'red' : 'whitesmoke' : 'whitesmoke',
                                cursor: selectedButton ? 'not-allowed' : 'pointer'
                            }}
                            disabled={selectedButton != null}
                        >
                            <Typography>{choice.english}</Typography>
                        </ListItemButton>
                    ))}
                    {answerType === 'text' &&
                    (<div id='text-answer-container'>
                        <TextField disabled={!isFirstAttempt} label="Answer" required value={textAnswer} onChange={e => setTextAnswer(e.target.value)} />
                        <Button disabled={!isFirstAttempt} variant='contained' onClick={textSubmit}>Submit</Button>
                        <Button disabled={!showOverrideText} variant='contained' onClick={overrideText}>override text</Button>
                    </div>)
                    }
                </Box>
                <Box id='button-container'>
                    <Button
                        id='audioGameButton'
                        variant='contained'
                        onClick={playButtonClicked}
                    >
                        Play
                    </Button>
                    <Button
                        id='nextWordGameButton'
                        variant='contained'
                        onClick={getQandA}
                    >
                        Next word
                    </Button>
                </Box>
                <Typography id='score' variant='h5'>Score: {score}</Typography>
            </Box>
        );
    }
}

export default Game;