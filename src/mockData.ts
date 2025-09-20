import type { Question } from './types';

// Mock data for development/testing when API is not available
export const mockQuestions: Question[] = [
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "Who was the Roman god of war?",
    correct_answer: "Mars",
    incorrect_answers: ["Jupiter", "Apollo", "Neptune"]
  },
  {
    category: "Mythology",
    type: "multiple", 
    difficulty: "medium",
    question: "In Greek mythology, who is the queen of the gods?",
    correct_answer: "Hera",
    incorrect_answers: ["Athena", "Aphrodite", "Artemis"]
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium", 
    question: "What is the name of Thor's hammer in Norse mythology?",
    correct_answer: "Mjolnir",
    incorrect_answers: ["Gungnir", "Laevateinn", "Gram"]
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "In Egyptian mythology, who is the god of the dead?",
    correct_answer: "Osiris", 
    incorrect_answers: ["Ra", "Anubis", "Horus"]
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "Who opened the box that released all the evils into the world?",
    correct_answer: "Pandora",
    incorrect_answers: ["Persephone", "Medusa", "Cassandra"]
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "What creature in Greek mythology has the head of a lion, body of a goat, and tail of a serpent?",
    correct_answer: "Chimera",
    incorrect_answers: ["Sphinx", "Minotaur", "Hydra"]
  },
  {
    category: "Mythology", 
    type: "multiple",
    difficulty: "medium",
    question: "In Roman mythology, who is the messenger of the gods?",
    correct_answer: "Mercury",
    incorrect_answers: ["Mars", "Vulcan", "Bacchus"]
  },
  {
    category: "Mythology",
    type: "multiple", 
    difficulty: "medium",
    question: "What is the name of Odin's eight-legged horse in Norse mythology?",
    correct_answer: "Sleipnir",
    incorrect_answers: ["Fenrir", "Jormungandr", "Ratatoskr"]
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "Who is the Greek goddess of wisdom and warfare?",
    correct_answer: "Athena", 
    incorrect_answers: ["Hera", "Demeter", "Hestia"]
  },
  {
    category: "Mythology",
    type: "multiple",
    difficulty: "medium",
    question: "In Hindu mythology, who is known as the destroyer among the principal deities?",
    correct_answer: "Shiva",
    incorrect_answers: ["Brahma", "Vishnu", "Indra"]
  }
];