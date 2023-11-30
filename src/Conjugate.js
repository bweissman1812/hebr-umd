import { Box, ListItemButton, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import './App.css'
import NavBar from "./NavBar";

function Conjugation() {
    const [infinitive, setInfinitive] = useState( "\u200Fלָ_וּ_");
    const pronouns = [
        { "pronoun": "אני", "conjugate": "\u200F__תי" },
        { "pronoun": "אתה", "conjugate": "\u200F__תָ" },
        { "pronoun": "את", "conjugate": "\u200F__ת" },
        { "pronoun": "הוא", "conjugate": "\u200F__" },
        { "pronoun": "היא", "conjugate": "\u200F__ה" },
        { "pronoun": "אנחנו", "conjugate": "\u200F__נוּ" },
        { "pronoun": "אתם", "conjugate": "\u200F__תֶם" },
        { "pronoun": "אתן", "conjugate": "\u200F__תֶן" },
        { "pronoun": "חם/הן", "conjugate": "\u200F__וּ" }
    ];
    const verbs = [
        { "english": "move", "hebrew": "זז", "audioPath": "/audios/chapter-13/nouns/move.m4a" },
        { "english": "fly", "hebrew": "טס", "audioPath": "/audios/chapter-13/nouns/fly.m4a" },
        { "english": "rest", "hebrew": "נח", "audioPath": "/audios/chapter-13/nouns/rest.m4a" },
        { "english": "fast", "hebrew": "צם", "audioPath": "/audios/chapter-13/nouns/fast.m4a" },
    ]
    const [randomPronoun, setRandomPronoun] = useState();
    const [randomVerb, setRandomVerb] = useState();
    const [correctConjugatedVerb, setCorrectConjugatedVerb] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [correctIndex, setCorrectIndex] = useState(null);
    const [score, setScore] = useState(0)


    const shuffleArray = (array) => {
        // Fisher-Yates Shuffle
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const conjugateVerbs = (answers, verb) => {
        const conjugatedVerbs = [];
        for (const pronoun of answers) {
            var conjugatedVerb = pronoun.conjugate.replace(/_/, verb.hebrew[0]);
            conjugatedVerb = conjugatedVerb.replace(/_/, verb.hebrew[1]);
            
            //check if final mem is in the middle of the word
            conjugatedVerb = conjugatedVerb.indexOf('ם') !== conjugatedVerb.length - 1 ? conjugatedVerb.replace('ם', 'מ') : conjugatedVerb;

            conjugatedVerbs.push(conjugatedVerb);
        }
       
        setCorrectConjugatedVerb(conjugatedVerbs[0]);

        return conjugatedVerbs;
    }

    const buildSentence = () => {
        setSelectedButton(null)
        shuffleArray(pronouns)

        const newPronoun = pronouns[0];
        const wrongAnswers = pronouns.slice(1,4);
        const newVerb = verbs[Math.floor(Math.random() * verbs.length)]

        const newShuffledAnswers = conjugateVerbs([newPronoun, ...wrongAnswers], newVerb);
        const correct = newShuffledAnswers[0];
        shuffleArray(newShuffledAnswers);

        var tempInfinitive = "\u200Fלָ_וּ_".replace(/_/, newVerb.hebrew[0])
        tempInfinitive = tempInfinitive.replace(/_/, newVerb.hebrew[1]);
        
        setCorrectIndex(newShuffledAnswers.indexOf(correct))
        setRandomPronoun(newPronoun);
        setRandomVerb(newVerb);
        setShuffledAnswers(newShuffledAnswers);
        setInfinitive(tempInfinitive);
        setIsLoading(false);
    }

    useEffect(() => {
        buildSentence()

    }, [])

    const answerClicked = async (answer, key) => {
        setSelectedButton(key);
        if (answer === correctConjugatedVerb) {
            setScore(score + 1);
            const audio = new Audio('/audios/correct.wav')
            await audio.play()
            
        }
        else {
            setScore(0);
            const audio = new Audio('/audios/wrong.wav')
            await audio.play()
        }

    }

    if (isLoading) {
        return (
            <>loading...</>
        )
    }
    else {
        return (
            <Box id='columns'>
                <NavBar />
               <Typography id='vocab-game-title' variant="h5">Conjugate the verb correctly</Typography>
               <Typography id='correct-hebrew' variant="h5">Pronoun: {randomPronoun.pronoun} Verb: {randomVerb.hebrew}</Typography>
               <Typography id='correct-hebrew' variant="h5">{infinitive}</Typography>
               <Box id='container'>

                    {shuffledAnswers.map((answer, index) => (
                        <ListItemButton id='vocab-card' 
                        style={{
                            backgroundColor: selectedButton != null ? correctIndex === index ? 'lightgreen' : (selectedButton === index && selectedButton !== correctIndex) ? 'red' : 'whitesmoke' : 'whitesmoke',
                            cursor: selectedButton ? 'not-allowed' : 'pointer'
                        }}
                        disabled={selectedButton != null} 
                        onClick={() => answerClicked(answer, index)} key={index}>
                            {answer}
                        </ListItemButton>
                    ))}
               </Box>
               <Button variant='contained' id='nextWordGameButton' onClick={buildSentence}>Next</Button>
               <Typography id='score' variant='h5'>Score: {score}</Typography>
            </Box>
        )
    }

}

export default Conjugation