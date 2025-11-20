import { useState, useEffect } from "react";
import "./App.css";

import Footer from "./components/Footer";
import Pyramid from "./components/Pyramid";
import Scoreboard from "./components/Scoreboard";
import RiddleModal from "./components/RiddleModal";

import RIDDLE_LAYERS from "./riddleLayers";  // NEW
import { ROW_BLOCKS, ROW_POINTS } from "./pyramidConfig";


// ------------------ CREATE BLOCKS (with layer-wise riddles) ------------------
function createBlocks() {
  let blocks = [];
  let id = 1;

  ROW_BLOCKS.forEach((count, rowIndex) => {
    const row = [];

    // Copy riddles for this layer so we can remove after assignment
    let available = [...RIDDLE_LAYERS[`layer${rowIndex}`]];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const r = available[randomIndex];
      available.splice(randomIndex, 1); // remove to avoid repetition

      row.push({
        id: id++,
        rowIndex,
        question: r.q,
        answer: r.a.toLowerCase(),
        points: ROW_POINTS[rowIndex],

        used: false,
        status: null,    // teamA, teamB, wrong

        // random number 01–99
        randomNumber: String(Math.floor(Math.random() * 99) + 1).padStart(2, "0"),
      });
    }

    blocks.push(row);
  });

  return blocks;
}



// ------------------ MAIN APP COMPONENT ------------------
export default function App() {

  // Detect first launch → so initial scores are 0:0
  const isFirstLaunch = localStorage.getItem("firstTime") === null;



  // ------------------ TEAM SCORES (persistent) ------------------
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem("teamsScores");

    if (saved && !isFirstLaunch) {
      return JSON.parse(saved);
    }

    // first ever visit
    if (isFirstLaunch) {
      localStorage.setItem("firstTime", "no");
    }

    return [
      { name: "Team A", score: 0 },
      { name: "Team B", score: 0 },
    ];
  });

  useEffect(() => {
    localStorage.setItem("teamsScores", JSON.stringify(teams));
  }, [teams]);



  // ------------------ PYRAMID BLOCKS (persistent) ------------------
  const [pyramid, setPyramid] = useState(() => {
    const saved = localStorage.getItem("pyramidState");
    return saved ? JSON.parse(saved) : createBlocks();
  });

  useEffect(() => {
    localStorage.setItem("pyramidState", JSON.stringify(pyramid));
  }, [pyramid]);



  // ------------------ STATES ------------------
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const selectedBlock =
    selectedBlockId === null
      ? null
      : pyramid.flat().find((b) => b.id === selectedBlockId);



  // ------------------ TEAM SWITCH ------------------
  const switchTeam = () =>
    setActiveTeamIndex((prev) => (prev === 0 ? 1 : 0));



  // ------------------ BLOCK CLICK ------------------
  const handleBlockClick = (block) => {
    if (block.used) return;

    setSelectedBlockId(block.id);
    setAnswerInput("");
    setFeedback("");
    setHasAnswered(false);
  };



  // ------------------ SUBMIT ANSWER ------------------
  const onSubmitAnswer = () => {
    if (!selectedBlock) return;
    if (hasAnswered) return;

    const userAnswer = answerInput.trim().toLowerCase();
    if (!userAnswer) {
      setFeedback("Please type an answer.");
      return;
    }

    const latestBlock = pyramid.flat().find((b) => b.id === selectedBlock.id);
    if (!latestBlock || latestBlock.used) {
      setFeedback("This block is already used.");
      setHasAnswered(true);
      return;
    }

    const isCorrect = userAnswer === latestBlock.answer;
    setHasAnswered(true);

    // update pyramid with block color + used flag
    setPyramid((prev) =>
      prev.map((row) =>
        row.map((b) =>
          b.id === latestBlock.id
            ? {
                ...b,
                used: true,
                status: isCorrect
                  ? (activeTeamIndex === 0 ? "teamA" : "teamB")
                  : "wrong",
              }
            : b
        )
      )
    );

    // award score
    if (isCorrect) {
      setTeams((prev) =>
        prev.map((t, idx) =>
          idx === activeTeamIndex
            ? { ...t, score: t.score + latestBlock.points }
            : t
        )
      );
      setFeedback(`Correct! +${latestBlock.points}`);
    } else {
      setFeedback("Wrong answer.");
    }
  };



  // ------------------ CLOSE MODAL ------------------
  const closeModal = () => {
    setSelectedBlockId(null);
    setAnswerInput("");
    setFeedback("");
    setHasAnswered(false);
  };



  // ------------------ RESET BUTTONS ------------------
  const resetScores = () => {
    const fresh = [
      { name: "Team A", score: 0 },
      { name: "Team B", score: 0 },
    ];
    setTeams(fresh);
    localStorage.setItem("teamsScores", JSON.stringify(fresh));
  };

  const resetPyramid = () => {
    const fresh = createBlocks();
    setPyramid(fresh);
    localStorage.setItem("pyramidState", JSON.stringify(fresh));
  };

  const resetGame = () => {
    resetScores();
    resetPyramid();
  };



  // ------------------ RENDER ------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        color: "white",
      }}
    >
      <div style={{ flex: 1, padding: "20px" }}>
        
        <h1 style={{ textAlign: "center" }}>Pyramid Riddle Game</h1>

        <Scoreboard
          teams={teams}
          activeTeamIndex={activeTeamIndex}
          switchTeam={switchTeam}
        />

        {/* RESET BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "15px 0",
          }}
        >
          <button
            onClick={resetScores}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              background: "#fbbf24",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reset Scores
          </button>

          <button
            onClick={resetPyramid}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              background: "#3b82f6",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reset Blocks
          </button>

          <button
            onClick={resetGame}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              background: "#ef4444",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reset Game
          </button>
        </div>

        {/* Pyramid */}
        <Pyramid rows={pyramid} onBlockClick={handleBlockClick} />

        {/* Modal */}
        {selectedBlock !== null && (
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
      </div>

      <Footer />
    </div>
  );
}
