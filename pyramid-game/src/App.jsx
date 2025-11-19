import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";

import RIDDLES from "./riddle";
import { ROW_BLOCKS, ROW_POINTS } from "./pyramidConfig";

import Pyramid from "./components/Pyramid";
import Scoreboard from "./components/Scoreboard";
import RiddleModal from "./components/RiddleModal";

function createBlocks() {
  let blocks = [];
  let id = 1;
  let rid = 0;

  ROW_BLOCKS.forEach((count, rowIndex) => {
    const row = [];
    for (let i = 0; i < count; i++) {
      const r = RIDDLES[rid % RIDDLES.length];
      row.push({
        id: id++,
        rowIndex,
        question: r.question,
        answer: r.answer.toLowerCase(),
        points: ROW_POINTS[rowIndex],
        used: false,
        status: null,
      });
      rid++;
    }
    blocks.push(row);
  });

  return blocks;
}

export default function App() {
  const [teams, setTeams] = useState(() => {
  const saved = localStorage.getItem("teamsScores");
  return saved
    ? JSON.parse(saved)
    : [
        { name: "Team A", score: 0 },
        { name: "Team B", score: 0 },
      ];
    });

  useEffect(() => {
  localStorage.setItem("teamsScores", JSON.stringify(teams));
    }, [teams]);


  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [pyramid, setPyramid] = useState(createBlocks());

  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const selectedBlock =
    selectedBlockId === null
      ? null
      : pyramid.flat().find((b) => b.id === selectedBlockId);

  const switchTeam = () =>
    setActiveTeamIndex((prev) => (prev === 0 ? 1 : 0));

  const handleBlockClick = (block) => {
    if (block.used) return;
    setSelectedBlockId(block.id);
    setAnswerInput("");
    setFeedback("");
    setHasAnswered(false);
  };

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

    setPyramid((prev) =>
      prev.map((row) =>
        row.map((b) =>
          b.id === latestBlock.id
            ? { ...b, used: true, status: isCorrect ? "correct" : "wrong" }
            : b
        )
      )
    );

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

    // optional auto-close
    // closeModal();
  };

  const closeModal = () => {
    setSelectedBlockId(null);
    setAnswerInput("");
    setFeedback("");
    setHasAnswered(false);
  };

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

        <Pyramid rows={pyramid} onBlockClick={handleBlockClick} />

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
