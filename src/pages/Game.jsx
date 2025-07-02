// imports
import { useState, useEffect } from "react";
import Figure from "../components/Figure";
import WrongLetters from "../components/WrongLetters";
import Word from "../components/Word";
import { showNotification as show, checkWin } from "../helpers/helpers";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import "../css/Game.css";

// array of disc name words for hangman game
const words = [
  "eagle",
  "destroyer",
  "warden",
  "firebird",
  "malta",
  "starship",
  "judge",
  "albatross",
  "mermaid",
  "underworld",
  "luna",
  "athena",
  "buzzz",
  "soda",
  "zone",
  "leopard",
  "stingray",
  "cigarra",
  "wraith",
  "tomahawk",
  "pixel",
  "banshee",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

// game page component that manages the state and logic of the hangman game
function Game() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // useEffect to handle keyboard input for guessing letters
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        // checks if the guessed letter is in the selected word
        if (selectedWord.includes(letter)) {
          // if the letter is correct and not already guessed, add it to correctLetters
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            // if the correct letter was already guessed, show a notification
            show(setShowNotification);
          }
        } else {
          // if the letter is wrong and not already guessed, add it to wrongLetters
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            // if the wrong letter was already guessed, show a notification
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  // resets the game to its initial state, allowing the player to play again
  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    // selects a new random word for next round
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <div className="game-header">
        <h1>Hangman Game</h1>
        <p>Find the hidden word - Enter a letter - Category: Disc Name</p>
      </div>
      <div className="game-container">
        {/* renders the hangman figure, updating based on wrong guesses */}
        <Figure wrongLetters={wrongLetters} />
        {/* renders the list of incorrect letters guessed */}
        <WrongLetters wrongLetters={wrongLetters} />
        {/* renders the hidden word, showing correctly guessed letters */}
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      {/*
        popup component to display win/loss messages and the "Play Again" button. It receives game state and the playAgain function. 
        The 'checkWin' helper function determines the game outcome which affects the Popup's display.
      */}
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      {/* notification component to show temporary messages */}
      <Notification showNotification={showNotification} />
    </>
  );
}

export default Game;
