import { useParams } from 'react-router-dom';
import './App.css';
import data from './data.json';
import { ListItemButton, Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import HomeButton from './HomeButton';

function Game() {
    const { chapterNumber } = useParams();
    const [vocabWords, setVocabWords] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [correct, setCorrect] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [answeredWords, setAnsweredWords] = useState([]);
    const [isFirstAttempt, setIsFirstAttempt] = useState(true);
    const [refreshChoices, setRefreshChoices] = useState(true)

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

    }, [vocabWords, refreshChoices])

    useEffect(() => {
        if (vocabWords.length > 0 && shuffledAnswers.length > 0 && correct) {
            setIsLoading(false);
        }
    }, [vocabWords, shuffledAnswers, correct]);

    useEffect(() => {
        playButtonClicked();
    }, [correct])




    const shuffleArray = (array) => {
        // Fisher-Yates Shuffle
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const answerButtonClicked = async (choice) => {
        if (choice === correct) {
            const audio = new Audio('/audios/correct.wav')
            await audio.play()
            alert('Correct!!!');
            setScore(score + 1)

            if (isFirstAttempt) {
                setAnsweredWords([...answeredWords, correct])
            }
        } else {
            const audio = new Audio('/audios/wrong.wav')
            await audio.play()
            setScore(0);
            alert('Wrong!');
            setIsFirstAttempt(false);
        }

        setRefreshChoices(!refreshChoices)
    };

    const playButtonClicked = () => {
        if (correct) {
            const audio = new Audio(correct.audioPath);
            audio.play();
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

        setIsFirstAttempt(true)

        if (vocabWords.length === 0) {
            setIsLoading(true)
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
            const someVocab = vocabWords.slice(0,3);
            const hasCorrect = someVocab.findIndex((word) => newCorrect.english == word.english);
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
        setShuffledAnswers(newShuffledAnswers);
        setCorrect(newCorrect);
        setIsLoading(false)
    }

    if (isLoading) {
        
        return (
            <>loading...</>
        )
    }
    else {
        return (

            <Box id="columns">
                <HomeButton />
                <Typography id='vocab-game-title' variant='h4'>Vocab Game</Typography>
                <Typography id='remaining-score' variant='h5'>Remaining: {answeredWords.length}/{vocabWords.length}</Typography>
                <Typography id='correct-hebrew' variant='h5'>{correct.hebrew}</Typography>
                <Box id='container'>
                    {shuffledAnswers.map((choice, index) => (
                        <ListItemButton
                            id='vocab-card'
                            onClick={() => answerButtonClicked(choice)}
                            key={index}
                        >
                            <Typography>{choice.english}</Typography>
                        </ListItemButton>
                    ))}
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