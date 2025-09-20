const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample trivia questions database
const questions = [
  {
    id: 1,
    question: "The Earth is flat.",
    type: "boolean",
    correct_answer: "False",
    category: "Geography"
  },
  {
    id: 2,
    question: "JavaScript was invented in 1995.",
    type: "boolean", 
    correct_answer: "True",
    category: "Technology"
  },
  {
    id: 3,
    question: "What is the capital of France?",
    type: "multiple",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
    category: "Geography"
  },
  {
    id: 4,
    question: "The speed of light is faster than the speed of sound.",
    type: "boolean",
    correct_answer: "True", 
    category: "Science"
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    type: "multiple",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"],
    category: "Science"
  }
];

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to get all questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// API endpoint to get random question (must come before :id route)
app.get('/api/questions/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  res.json(questions[randomIndex]);
});

// API endpoint to get a specific question by ID
app.get('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const question = questions.find(q => q.id === id);
  
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`OpenTrivialDB server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see questions`);
});