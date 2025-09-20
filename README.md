# OpenTrivialDB
Open Trivial Database API to ask questions in true or false order or multiple choice.

## Features
- Web interface to display trivia questions
- API endpoints to access questions programmatically
- Support for both boolean (True/False) and multiple choice questions
- Random question functionality

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and visit `http://localhost:3000` to see questions

## API Endpoints

- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get a specific question by ID
- `GET /api/questions/random` - Get a random question

## Question Format

Questions include:
- `id`: Unique identifier
- `question`: The question text
- `type`: "boolean" or "multiple"
- `correct_answer`: The correct answer
- `incorrect_answers`: Array of wrong answers (for multiple choice)
- `category`: Question category (Geography, Science, Technology, etc.)
