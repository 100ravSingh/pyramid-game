import { useState, useEffect, useRef } from "react";
import "./App.css";

import Footer from "./components/Footer";
import Pyramid from "./components/Pyramid";
import Scoreboard from "./components/Scoreboard";
import RiddleModal from "./components/RiddleModal";
import WinnerModal from "./components/WinnerModal";

import RIDDLE_LAYERS from "./riddleLayers";
import { ROW_BLOCKS, ROW_POINTS } from "./pyramidConfig";

/* ------------------ CONSTANTS ------------------ */
const INITIAL_TIME = 300; // 5 minutes per team

/* ------------------ CREATE BLOCKS ------------------ */
function createBlocks() {
  let blocks = [];
  let id = 1;

  ROW_BLOCKS.forEach((count, rowIndex) => {
    const row = [];
    let available = [...(RIDDLE_LAYERS[`layer${rowIndex}`] || [])];

    for (let i = 0; i < count; i++) {
      const r =
        available.length > 0
          ? available.splice(
              Math.floor(Math.random() * available.length),
              1
            )[0]
          : { q: "No riddle available", a: "none" };

      row.push({
        id: id++,
        rowIndex,
        question: r.q,
        answer: r.a.toLowerCase(),
        points: ROW_POINTS[rowIndex],
        used: false,
        status: null, // teamA | teamB | wrong
        randomNumber: String(Math.floor(Math.random() * 99) + 1).padStart(2, "0"),
      });
    }

    blocks.push(row);
  });

  return blocks;
}

/* ------------------ MAIN APP ------------------ */
export default function App() {
  /* ---------- GAME STATE ---------- */
  const [teams, setTeams] = useState([
    { name: "Team A", score: 0 },
    { name: "Team B", score: 0 },
  ]);

  const [pyramid, setPyramid] = useState(() => {
    const saved = localStorage.getItem("pyramidState");
    return saved ? JSON.parse(saved) : createBlocks();
  });

  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  /* ---------- CLOCK ---------- */
  const [timers, setTimers] = useState([INITIAL_TIME, INITIAL_TIME]);
  const [gameStarted, setGameStarted] = useState(false);
  const [clockPaused, setClockPaused] = useState(true);

  /* ---------- GAME END ---------- */
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [suddenDeath, setSuddenDeath] = useState(false);
  const [targetScore, setTargetScore] = useState(null);

  /* ---------- HARD SUBMIT LOCK ---------- */
  const submitLock = useRef(false);

  /* ---------- PERSIST PYRAMID ---------- */
  useEffect(() => {
    localStorage.setItem("pyramidState", JSON.stringify(pyramid));
  }, [pyramid]);

  /* ---------- CLOCK ENGINE ---------- */
  useEffect(() => {
    if (!gameStarted || gameOver || clockPaused) return;

    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = [...prev];
        updated[activeTeamIndex] -= 1;

        if (updated[activeTeamIndex] <= 0) {
          updated[activeTeamIndex] = 0;
          handleTimeExpired(activeTeamIndex, updated);
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTeamIndex, gameStarted, gameOver, clockPaused]);

  /* ---------- TIME EXPIRED ---------- */
  const handleTimeExpired = (teamIndex, latestTimers) => {
    const other = teamIndex === 0 ? 1 : 0;

    if (latestTimers[other] === 0) {
      declareWinner();
      return;
    }

    if (teams[teamIndex].score < teams[other].score) {
      setWinner(teams[other].name);
      setGameOver(true);
      return;
    }

    setSuddenDeath(true);
    setTargetScore(teams[teamIndex].score);
    setActiveTeamIndex(other);
  };

  /* ---------- DECLARE WINNER ---------- */
  const declareWinner = () => {
    if (teams[0].score > teams[1].score) setWinner(teams[0].name);
    else if (teams[1].score > teams[0].score) setWinner(teams[1].name);
    else setWinner("Draw");
    setGameOver(true);
  };

  /* ---------- HELPERS ---------- */
  const selectedBlock =
    selectedBlockId === null
      ? null
      : pyramid.flat().find((b) => b.id === selectedBlockId);

  const formatTime = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(
      sec % 60
    ).padStart(2, "0")}`;

  /* ---------- BLOCK CLICK ---------- */
  const handleBlockClick = (block) => {
    if (!gameStarted || block.used || gameOver) return;

    setSelectedBlockId(block.id);
    setAnswerInput("");
    setFeedback("");
    setHasAnswered(false);
  };

  /* ---------- SUBMIT ANSWER ---------- */
  const onSubmitAnswer = () => {
    if (!selectedBlock || hasAnswered || submitLock.current) return;

    submitLock.current = true;
    setClockPaused(true);
    setHasAnswered(true);

    const correct =
      answerInput.trim().toLowerCase() === selectedBlock.answer;

    setPyramid((prev) =>
      prev.map((row) =>
        row.map((b) =>
          b.id === selectedBlock.id
            ? {
                ...b,
                used: true,
                status: correct
                  ? activeTeamIndex === 0
                    ? "teamA"
                    : "teamB"
                  : "wrong",
              }
            : b
        )
      )
    );

    if (correct) {
      setTeams((prev) =>
        prev.map((t, i) =>
          i === activeTeamIndex
            ? { ...t, score: t.score + selectedBlock.points }
            : t
        )
      );
      setFeedback(`Correct! +${selectedBlock.points}`);
    } else {
      const penalty = Math.floor(selectedBlock.points / 2);

      // ❗ Negative scores ALLOWED
      setTeams((prev) =>
        prev.map((t, i) =>
          i === activeTeamIndex
            ? { ...t, score: t.score - penalty }
            : t
        )
      );

      setFeedback(`Wrong answer! -${penalty} points`);
    }

    setActiveTeamIndex((prev) => (prev === 0 ? 1 : 0));
  };

  /* ---------- CLOSE MODAL ---------- */
  const closeModal = () => {
    setSelectedBlockId(null);
    setAnswerInput("");
    setFeedback("");
    setHasAnswered(false);

    submitLock.current = false;
    setClockPaused(false);
  };

  /* ---------- RESET FUNCTIONS ---------- */
  const resetScores = () => {
    setTeams([
      { name: "Team A", score: 0 },
      { name: "Team B", score: 0 },
    ]);
  };

  const resetPyramid = () => {
    const fresh = createBlocks();
    setPyramid(fresh);
    localStorage.setItem("pyramidState", JSON.stringify(fresh));
  };

  const resetGame = () => {
    resetScores();
    resetPyramid();
    setTimers([INITIAL_TIME, INITIAL_TIME]);
    setActiveTeamIndex(0);
    setSuddenDeath(false);
    setTargetScore(null);
    setWinner(null);
    setGameOver(false);
    setGameStarted(false);
    setClockPaused(true);
    submitLock.current = false;
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="app-root">
      <h1 style={{ textAlign: "center" }}>Pyramid Riddle Game</h1>

      <Scoreboard
        teams={teams}
        timers={timers}
        formatTime={formatTime}
        activeTeamIndex={activeTeamIndex}
        suddenDeath={suddenDeath}
        gameOver={gameOver}
      />

      {/* CONTROLS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          margin: "15px 0",
        }}
      >
        <button
          onClick={() => {
            setGameStarted(true);
            setClockPaused(false);
          }}
          disabled={gameStarted}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            fontWeight: "800",
            background: gameStarted ? "#6b7280" : "#22c55e",
            border: "none",
            cursor: gameStarted ? "not-allowed" : "pointer",
          }}
        >
          ▶ Start Game
        </button>

        <button
          onClick={resetScores}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            background: "#fbbf24",
            border: "none",
            fontWeight: "700",
          }}
        >
          Reset Scores
        </button>

        <button
          onClick={resetPyramid}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            background: "#3b82f6",
            border: "none",
            fontWeight: "700",
            color: "white",
          }}
        >
          Reset Blocks
        </button>

        <button
          onClick={resetGame}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            background: "#ef4444",
            border: "none",
            fontWeight: "700",
            color: "white",
          }}
        >
          Reset Game
        </button>
      </div>

      <Pyramid rows={pyramid} onBlockClick={handleBlockClick} />

      {selectedBlock && (
        <RiddleModal
          block={selectedBlock}
          activeTeam={teams[activeTeamIndex]}
          answerInput={answerInput}
          setAnswerInput={setAnswerInput}
          feedback={feedback}
          onSubmit={onSubmitAnswer}
          onClose={closeModal}
          hasAnswered={hasAnswered}
        />
      )}

      {gameOver && (
        <WinnerModal
          winner={winner}
          teams={teams}
          onRestart={resetGame}
        />
      )}

      <Footer />
    </div>
  );
}
