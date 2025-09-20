import React from 'react';
import type { Question } from '../types';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: (string | null)[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({
  score,
  totalQuestions,
  questions,
  selectedAnswers,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Well done! 👍";
    if (percentage >= 60) return "Good effort! 👌";
    return "Keep practicing! 💪";
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Quiz Complete!</h1>
        <div className="score-summary">
          <div className="score-circle">
            <span className="score">{score}/{totalQuestions}</span>
            <span className="percentage">{percentage}%</span>
          </div>
          <p className="score-message">{getScoreMessage()}</p>
        </div>
      </div>

      <div className="detailed-results">
        <h2>Review Your Answers</h2>
        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.correct_answer;
          
          return (
            <div key={index} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-header">
                <span className="question-number">Question {index + 1}</span>
                <span className={`result-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
              
              <h3 className="result-question">{question.question}</h3>
              
              <div className="result-answers">
                <div className="answer-row">
                  <span className="answer-label">Your answer:</span>
                  <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {userAnswer || 'No answer selected'}
                  </span>
                </div>
                
                {!isCorrect && (
                  <div className="answer-row">
                    <span className="answer-label">Correct answer:</span>
                    <span className="answer-value correct">{question.correct_answer}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="results-actions">
        <button onClick={onRestart} className="restart-btn">
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default Results;