import { useState, useEffect } from 'react';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function HomePage() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem('triviaQuestions');
    if (cached) {
      setTriviaQuestions(JSON.parse(cached));
      setLoading(false);
      return;
    }
    const fetchTriviaQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTriviaQuestions(data.results || []);
        localStorage.setItem('triviaQuestions', JSON.stringify(data.results || []));
      } catch (error) {
        setError('Failed to fetch trivia questions: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTriviaQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trivia Questions</h1>
      <ol>
        {triviaQuestions.map((question, index) => (
         <div> 
          <li key={index}>{decodeHtml(question.question)+ ' ' + decodeHtml(question.correct_answer)+ ' '+ decodeHtml(question.incorrect_answers)}</li>  
          
            </div>
        ))}
        
      </ol>
    </div>
  );
}

export default HomePage;