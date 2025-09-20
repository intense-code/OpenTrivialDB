import React from 'react';
import type { Question } from '../types';
import { shuffleArray } from '../utils';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
}) => {
  // Shuffle answers (combine correct and incorrect answers)
  const allAnswers = React.useMemo(() => {
    return shuffleArray([...question.incorrect_answers, question.correct_answer]);
  }, [question]);

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="category">{question.category}</span>
        <span className="difficulty">{question.difficulty}</span>
      </div>
      
      <h2 className="question-text">{question.question}</h2>
      
      <div className="answers">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            className={`answer-option ${selectedAnswer === answer ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(answer)}
          >
            <span className="answer-label">{String.fromCharCode(65 + index)}.</span>
            <span className="answer-text">{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;