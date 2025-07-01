import { useState, useEffect } from "react";
import Figure from "../components/Figure";
import WrongLetters from "../components/WrongLetters";
import Word from "../components/Word";
import { showNotification as show, checkWin } from "../helpers/helpers";
import Popup from "../components/Popup";
import Notification from "../components/Notification";
import "../css/Game.css";

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

function Game() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

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
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>

      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default Game;
