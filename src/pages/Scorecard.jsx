// imports
import { useState, useEffect, useCallback } from "react";
import "../css/Scorecard.css";

// main component for disc golf scorecard
function Scorecard() {
  const [players, setPlayers] = useState(["Player 1", "Player 2"]);
  const [holesData, setHolesData] = useState([]);
  // state to manage the number of holes
  const [numHoles, setNumHoles] = useState(18); // Default to 18 holes

  // function to handle changes in player names
  const handlePlayerNameChange = useCallback((index, newName) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      const oldName = updatedPlayers[index];
      updatedPlayers[index] = newName;

      // update scores in holesData to reflect the new player name
      setHolesData((prevHolesData) =>
        prevHolesData.map((hole) => {
          const newScores = {};
          for (const playerKey in hole.scores) {
            if (playerKey === oldName) {
              newScores[newName] = hole.scores[playerKey];
            } else {
              newScores[playerKey] = hole.scores[playerKey];
            }
          }
          return { ...hole, scores: newScores };
        })
      );
      return updatedPlayers;
    });
  }, []);

  // function to add a new player
  const addPlayer = useCallback(() => {
    setPlayers((prevPlayers) => {
      const newPlayerName = `Player ${prevPlayers.length + 1}`;
      // update holesData to include the new player with empty scores
      setHolesData((prevHolesData) =>
        prevHolesData.map((hole) => ({
          ...hole,
          scores: { ...hole.scores, [newPlayerName]: "" },
        }))
      );
      return [...prevPlayers, newPlayerName];
    });
  }, []);

  // function to remove a player
  const removePlayer = useCallback((playerToRemove) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player !== playerToRemove)
    );
    // remove player's scores from holesData
    setHolesData((prevHolesData) =>
      prevHolesData.map((hole) => {
        const newScores = { ...hole.scores };
        delete newScores[playerToRemove];
        return { ...hole, scores: newScores };
      })
    );
  }, []);

  // function to add a new hole
  const addHole = useCallback(() => {
    setNumHoles((prevNum) => prevNum + 1);
  }, []);

  // function to remove the last hole
  const removeHole = useCallback(() => {
    setNumHoles((prevNum) => Math.max(1, prevNum - 1)); // Ensure at least 1 hole remains
  }, []);

  return (
    <div className="container">
      <h1 className="scorecard-header">Disc Golf Scorecard</h1>

      {/* player management section */}
      <div className="player-management">
        <h2 className="h2-header">Players</h2>
        <div className="player-list">
          {players.map((player, index) => (
            <div key={index} className="player-input-group">
              <input
                type="text"
                value={player}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Player ${index + 1} Name`}
                className="player-name-input"
              />
              {players.length > 1 && (
                <button
                  onClick={() => removePlayer(player)}
                  className="remove-player-btn"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addPlayer} className="add-player-btn">
          Add Player
        </button>
      </div>

      {/* hole management section */}
      <div className="hole-management">
        <h2 className="h2-header">Holes</h2>
        <div className="hole-controls">
          <button
            onClick={removeHole}
            className="remove-hole-btn"
            disabled={numHoles <= 1}
          >
            Remove Last Hole
          </button>
          <button onClick={addHole} className="add-hole-btn">
            Add Hole
          </button>
        </div>
      </div>

      {/* scorecard table */}
      <div className="scorecard-section">
        <h2 className="h2-header">Scorecard</h2>
        <div className="table-container"></div>
      </div>
    </div>
  );
}

export default Scorecard;
