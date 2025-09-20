# OpenTrivialDB Quiz App

A React-based quiz application that uses the Open Trivia Database API to present multiple choice questions about mythology.

## Features

- 🎯 **10 Multiple Choice Questions** - Fetches mythology questions at medium difficulty
- 🎨 **Modern UI** - Clean, responsive design with gradient backgrounds
- 📱 **Mobile Friendly** - Responsive layout that works on all devices
- 🔄 **Question Navigation** - Previous/Next buttons with proper state management
- 📊 **Detailed Results** - Shows score with review of all answers
- 🔄 **Restart Capability** - Take the quiz multiple times
- 🧪 **Demo Mode** - Falls back to sample questions when API is unavailable

## API Integration

Uses the OpenTDB API endpoint:
```
https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple
```

- **Amount**: 10 questions
- **Category**: 20 (Mythology)
- **Difficulty**: Medium
- **Type**: Multiple choice

## Tech Stack

- ⚛️ **React 19** with TypeScript
- ⚡ **Vite** for fast development and building
- 🎨 **CSS** with modern styling and animations
- 🔧 **ESLint** for code quality

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## How It Works

1. **Loading**: App fetches 10 mythology questions from OpenTDB API
2. **Quiz Flow**: Navigate through questions using Previous/Next buttons
3. **Answer Selection**: Click on multiple choice options (A, B, C, D)
4. **Validation**: Next button enabled only when answer is selected
5. **Submission**: Submit button appears on the last question
6. **Results**: Detailed review showing score and correct/incorrect answers
7. **Restart**: Take the quiz again with new question order

## Fallback Mode

When the OpenTDB API is unavailable, the app automatically falls back to a curated set of sample mythology questions to ensure the quiz remains functional.

## Screenshots

![Quiz Interface](https://github.com/user-attachments/assets/956c9cf5-209d-4af2-935f-5222f0c6d4cf)
*Error state when API is unavailable*

![Quiz Results](https://github.com/user-attachments/assets/7cf90bd7-b207-47f0-9b37-fdbe4bb260b3)
*Results screen showing detailed answer review*
