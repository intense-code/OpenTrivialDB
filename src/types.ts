// Types for OpenTDB API response
export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: Question[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswers: (string | null)[];
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
}