import { useEffect, useState, useRef, useMemo } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import html2canvas from "html2canvas";
import questions from "./CompleteKipsCalculus.json";
import "./E.css";

const Icons = {
  Next: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  Previous: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  Check: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  Trophy: () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15C15.866 15 19 11.866 19 8V3H5V8C5 11.866 8.134 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M5 10V12C5 16.418 8.582 20 13 20H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9 20L9 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15 20L15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Clock: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Zap: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

const QuizQuestion = ({ data, selected, locked, onSelect }) => {
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="question-container">
      <div className="question-meta">
        <span className="question-number">Question {data.id}</span>
      </div>
      <div className="question-text-container">
        <div className="question-text"><Latex>{data.question}</Latex></div>
      </div>
      <div className="options-grid">
        {data.options.map((opt, i) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          let className = "option-card";
          if (locked) {
            if (isCorrect) className += " correct";
            else if (isSelected) className += " wrong";
          } else if (isSelected) className += " selected";
          return (
            <button key={i} className={className} onClick={() => !locked && onSelect(opt)} disabled={locked}>
              <div className="option-header">
                <span className="option-letter">{letters[i]}</span>
              </div>
              <div className="option-content"><Latex>{opt}</Latex></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const STORAGE_KEY = "mathx_trig_quiz_v1";
  const timerRef = useRef(null);

  // Initial State Load
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setIndex(parsed.index || 0);
      setAnswered(parsed.answered || {});
      setQuizCompleted(parsed.quizCompleted || false);
      setTimeSpent(parsed.timeSpent || 0);
    }
  }, []);

  // DERIVED STATS (The "Fix")
  const totalQuestions = questions.length;
  const currentQuestion = questions[index];
  
  // Calculate score by checking answered object against correct answers in trig.json
  const score = useMemo(() => {
    return Object.entries(answered).reduce((acc, [idx, choice]) => {
      return questions[idx]?.answer === choice ? acc + 1 : acc;
    }, 0);
  }, [answered]);

  const progress = Math.round(((index + 1) / totalQuestions) * 100);
  const answeredCount = Object.keys(answered).length;
  const accuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;

  // Persistence
  useEffect(() => {
    const data = { index, answered, quizCompleted, timeSpent };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [index, answered, quizCompleted, timeSpent]);

  // Timer
  useEffect(() => {
    if (!quizCompleted) {
      timerRef.current = setInterval(() => setTimeSpent(p => p + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizCompleted]);

  // Handlers
  const handleSelect = (option) => {
    if (answered[index]) return; // Already answered
    setAnswered(prev => ({ ...prev, [index]: option }));
  };

  const nextQuestion = () => {
    if (index + 1 < totalQuestions) setIndex(i => i + 1);
    else setQuizCompleted(true);
  };

  const prevQuestion = () => { if (index > 0) setIndex(i => i - 1); };

  const resetQuiz = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload(); // Cleanest way to reset all states
  };

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (quizCompleted) return e.key === 'r' && resetQuiz();
      if (["1", "2", "3", "4"].includes(e.key)) {
        const opt = currentQuestion?.options[parseInt(e.key) - 1];
        if (opt) handleSelect(opt);
      }
      if (e.key === "Enter" || e.key === " ") answered[index] && nextQuestion();
      if (e.key === "ArrowRight" && answered[index]) nextQuestion();
      if (e.key === "ArrowLeft") prevQuestion();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, answered, quizCompleted]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="app">
      <div className="app-card">
        {!quizCompleted ? (
          <>
            <header className="app-header">
              <h1 className="quiz-title">Trigonometry Quiz</h1>
              <div className="stats-grid">
                <div className="stat-box">
                  <span className="label">Score</span>
                  <span className="value">{score}</span>
                </div>
                <div className="stat-box">
                  <span className="label">Accuracy</span>
                  <span className="value">{accuracy}%</span>
                </div>
                <div className="stat-box">
                  <span className="label">Time</span>
                  <span className="value">{formatTime(timeSpent)}</span>
                </div>
              </div>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </header>

            {currentQuestion && (
              <QuizQuestion 
                data={currentQuestion} 
                selected={answered[index]} 
                locked={!!answered[index]} 
                onSelect={handleSelect} 
              />
            )}

            <footer className="app-footer">
              <button className="nav-btn" onClick={prevQuestion} disabled={index === 0}>Back</button>
              <button className="nav-btn primary-btn" onClick={nextQuestion} disabled={!answered[index]}>
                {index + 1 === totalQuestions ? "Finish" : "Next"}
              </button>
            </footer>
          </>
        ) : (
          <div className="results-screen">
            <Icons.Trophy />
            <h2>Final Score: {score} / {totalQuestions}</h2>
            <p>Accuracy: {accuracy}% | Time: {formatTime(timeSpent)}</p>
            <button className="nav-btn primary-btn" onClick={resetQuiz}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
}