// css import
import "../css/Game.css";

// word component displays the word to be guessed in the hangman game
// it shows correctly guessed letters in their positions and underscores/blanks for unguessed letters
const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className="word">
      {selectedWord.split("").map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
