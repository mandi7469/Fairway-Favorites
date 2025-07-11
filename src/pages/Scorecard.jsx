// imports
import { useState, useEffect, useCallback } from "react";
import "../css/Scorecard.css";

// constants for local storage keys
const LOCAL_STORAGE_PLAYERS_KEY = "discGolfScorecardPlayers";
const LOCAL_STORAGE_HOLES_DATA_KEY = "discGolfScorecardHolesData";
const LOCAL_STORAGE_NUM_HOLES_KEY = "discGolfScorecardNumHoles";

// main component for disc golf scorecard
function Scorecard() {
  const [players, setPlayers] = useState(() => {
    const storedPlayers = localStorage.getItem(LOCAL_STORAGE_PLAYERS_KEY);
    return storedPlayers ? JSON.parse(storedPlayers) : ["Player 1", "Player 2"];
  });

  // state to manage the number of holes
  const [numHoles, setNumHoles] = useState(() => {
    const storedNumHoles = localStorage.getItem(LOCAL_STORAGE_NUM_HOLES_KEY);
    return storedNumHoles ? parseInt(storedNumHoles, 10) : 18;
  }); // default to 18 holes

  const [holesData, setHolesData] = useState(() => {
    const storedHolesData = localStorage.getItem(LOCAL_STORAGE_HOLES_DATA_KEY);
    if (storedHolesData) {
      return JSON.parse(storedHolesData);
    } else {
      // if no data in localstorage, initialize based on default numHoles and players
      return Array.from({ length: numHoles }, (_, i) => ({
        hole: i + 1,
        par: 3, // default par for each hole
        scores: players.reduce((acc, player) => ({ ...acc, [player]: "" }), {}), // initialize scores for each player
      }));
    }
  });

  // effect to synchronize holesData when numHoles or players change, primarily for initial setup or when adding/removing players/holes
  useEffect(() => {
    setHolesData((prevHolesData) => {
      let newHolesData = Array.from({ length: numHoles }, (_, i) => {
        const existingHole = prevHolesData[i];
        return {
          hole: i + 1,
          par: existingHole ? existingHole.par : 3,
          scores: players.reduce((acc, player) => {
            // Preserve existing scores for current players
            acc[player] = existingHole?.scores[player] ?? "";
            return acc;
          }, {}),
        };
      });

      // if players were removed, ensure their scores are gone from all holes
      newHolesData = newHolesData.map((hole) => {
        const updatedScores = {};
        players.forEach((player) => {
          updatedScores[player] = hole.scores[player] ?? "";
        });
        return { ...hole, scores: updatedScores };
      });

      return newHolesData;
    });
  }, [numHoles, players]);

  // effect to save players, numHoles, and holesData to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PLAYERS_KEY, JSON.stringify(players));
    localStorage.setItem(
      LOCAL_STORAGE_HOLES_DATA_KEY,
      JSON.stringify(holesData)
    );
    localStorage.setItem(LOCAL_STORAGE_NUM_HOLES_KEY, numHoles.toString());
  }, [players, holesData, numHoles]);

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

  // function to handle par input changes for a specific hole
  const handleParChange = useCallback((holeIndex, newPar) => {
    setHolesData((prevHolesData) => {
      const updatedHoles = [...prevHolesData];
      updatedHoles[holeIndex] = {
        ...updatedHoles[holeIndex],
        par: parseInt(newPar) || "",
      };
      return updatedHoles;
    });
  }, []);

  // function to handle score input changes for a specific player and hole
  const handleScoreChange = useCallback((holeIndex, playerName, newScore) => {
    setHolesData((prevHolesData) => {
      const updatedHoles = [...prevHolesData];
      updatedHoles[holeIndex] = {
        ...updatedHoles[holeIndex],
        scores: {
          ...updatedHoles[holeIndex].scores,
          [playerName]: parseInt(newScore) || "", // store empty string if input is not a valid number
        },
      };
      return updatedHoles;
    });
  }, []);

  // function to calculate total score for each player
  const calculatePlayerTotals = useCallback(() => {
    const totals = {};
    players.forEach((player) => {
      let totalScore = 0;
      let totalPar = 0;
      holesData.forEach((hole) => {
        const playerScore = hole.scores[player];
        if (typeof playerScore === "number") {
          totalScore += playerScore;
          totalPar += hole.par;
        }
      });
      totals[player] = totalScore - totalPar; // score relative to par
    });
    return totals;
  }, [players, holesData]);

  // calculate leaderboard standings
  const leaderboard = useCallback(() => {
    const totals = calculatePlayerTotals();
    const sortedPlayers = Object.entries(totals)
      .sort(([, scoreA], [, scoreB]) => scoreA - scoreB)
      .map(([player, score]) => ({ player, score }));
    return sortedPlayers;
  }, [calculatePlayerTotals]);

  // function to clear the scorecard for a new game
  const clearScorecard = useCallback(() => {
    // clear local storage
    localStorage.removeItem(LOCAL_STORAGE_PLAYERS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_HOLES_DATA_KEY);
    localStorage.removeItem(LOCAL_STORAGE_NUM_HOLES_KEY);

    // reset states to their initial default values
    setPlayers(["Player 1", "Player 2"]);
    setNumHoles(18);
    setHolesData(
      Array.from({ length: 18 }, (_, i) => ({
        hole: i + 1,
        par: 3,
        scores: { "Player 1": "", "Player 2": "" },
      }))
    );
  }, []);

  // function to add a new hole
  const addHole = useCallback(() => {
    setNumHoles((prevNum) => prevNum + 1);
  }, []);

  // function to remove the last hole
  const removeHole = useCallback(() => {
    setNumHoles((prevNum) => Math.max(1, prevNum - 1)); // ensure at least 1 hole remains
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
        <div className="table-container">
          <table className="scorecard-table">
            <thead>
              <tr>
                <th>Hole</th>
                <th>Par</th>
                {players.map((player, index) => (
                  <th key={index}>{player}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holesData.map((holeData, holeIndex) => (
                <tr key={holeData.hole}>
                  <td>{holeData.hole}</td>
                  <td>
                    <input
                      type="number"
                      value={holeData.par}
                      onChange={(e) =>
                        handleParChange(holeIndex, e.target.value)
                      }
                      min="1"
                      className="par-input"
                    />
                  </td>
                  {players.map((player, playerIndex) => (
                    <td key={playerIndex}>
                      <input
                        type="number"
                        value={holeData.scores[player]}
                        onChange={(e) =>
                          handleScoreChange(holeIndex, player, e.target.value)
                        }
                        min="1"
                        className="score-input"
                      />
                    </td>
                  ))}
                </tr>
              ))}
              {/* total row */}
              <tr className="total-row">
                <td colSpan="2">Total (vs Par)</td>
                {players.map((player, index) => (
                  <td key={index} className="total-score">
                    {calculatePlayerTotals()[player] >= 0
                      ? `+${calculatePlayerTotals()[player]}`
                      : calculatePlayerTotals()[player]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* leaderboard section */}
      <div className="leaderboard-section">
        <h2 className="h2-header">Leaderboard</h2>
        <ul className="leaderboard-list">
          {leaderboard().map((entry, index) => {
            let scoreType = "";
            if (entry.score > 0) {
              scoreType = "over-par";
            } else if (entry.score === 0) {
              scoreType = "even-par";
            } else {
              scoreType = "under-par";
            }

            return (
              <li key={index} className="leaderboard-item">
                <span className="leaderboard-rank">{index + 1}.</span>
                <span className="leaderboard-player">{entry.player}</span>
                <span className="leaderboard-score" data-score-type={scoreType}>
                  {entry.score >= 0 ? `+${entry.score}` : entry.score}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* clear scorecard button */}
      <button onClick={clearScorecard} className="clear-card-btn">
        Clear Scorecard
      </button>
    </div>
  );
}

export default Scorecard;
