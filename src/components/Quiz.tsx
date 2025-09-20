import React, { useState, useEffect } from 'react';
import type { QuizResponse, QuizState } from '../types';
import { decodeHtml } from '../utils';
import { mockQuestions } from '../mockData';
import QuestionCard from './QuestionCard';
import Results from './Results';

const QUIZ_API_URL = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple';

const Quiz: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: [],
    isCompleted: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setQuizState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(QUIZ_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data: QuizResponse = await response.json();
      
      if (data.response_code !== 0) {
        throw new Error('API returned an error');
      }

      // Process questions and shuffle answers
      const processedQuestions = data.results.map(question => ({
        ...question,
        question: decodeHtml(question.question),
        correct_answer: decodeHtml(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(decodeHtml),
        category: decodeHtml(question.category),
      }));

      setQuizState(prev => ({
        ...prev,
        questions: processedQuestions,
        selectedAnswers: new Array(processedQuestions.length).fill(null),
        isLoading: false,
      }));
    } catch {
      console.log('API failed, using mock data for demonstration');
      
      // Use mock data as fallback
      setQuizState(prev => ({
        ...prev,
        questions: mockQuestions,
        selectedAnswers: new Array(mockQuestions.length).fill(null),
        isLoading: false,
        error: null, // Don't show error when using mock data
      }));
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newSelectedAnswers = [...quizState.selectedAnswers];
    newSelectedAnswers[quizState.currentQuestionIndex] = answer;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: newSelectedAnswers,
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleSubmit = () => {
    const score = quizState.questions.reduce((acc, question, index) => {
      return quizState.selectedAnswers[index] === question.correct_answer ? acc + 1 : acc;
    }, 0);

    setQuizState(prev => ({
      ...prev,
      score,
      isCompleted: true,
    }));
  };

  const handleRestart = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      isCompleted: false,
      isLoading: true,
      error: null,
    });
    fetchQuestions();
  };

  if (quizState.isLoading) {
    return (
      <div className="quiz-container">
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if (quizState.error) {
    return (
      <div className="quiz-container">
        <div className="error">
          <h2>Error</h2>
          <p>{quizState.error}</p>
          <button onClick={fetchQuestions} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    return (
      <Results
        score={quizState.score}
        totalQuestions={quizState.questions.length}
        questions={quizState.questions}
        selectedAnswers={quizState.selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>OpenTDB Quiz</h1>
        {import.meta.env.DEV && (
          <div className="dev-notice">
            🧪 Demo Mode: Using sample questions
          </div>
        )}
        <div className="progress">
          Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
        </div>
      </div>
      
      <QuestionCard
        question={quizState.questions[quizState.currentQuestionIndex]}
        selectedAnswer={quizState.selectedAnswers[quizState.currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <div className="quiz-navigation">
        <button
          onClick={handlePrevious}
          disabled={quizState.currentQuestionIndex === 0}
          className="nav-btn"
        >
          Previous
        </button>
        
        {quizState.currentQuestionIndex === quizState.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={quizState.selectedAnswers.some(answer => answer === null)}
            className="submit-btn"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={quizState.selectedAnswers[quizState.currentQuestionIndex] === null}
            className="nav-btn"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;