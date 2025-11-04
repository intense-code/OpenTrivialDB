import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function HomePage() {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      if (typeof window === 'undefined') return; // ✅ Avoid Netlify build crash
      setLoading(true);
      setError(null);
      try {
        const cached = localStorage.getItem('triviaQuestions');
        if (cached) {
          setTriviaQuestions(JSON.parse(cached));
        } else {
          const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
          const data = await res.json();
          setTriviaQuestions(data.results);
          localStorage.setItem('triviaQuestions', JSON.stringify(data.results));
        }
      } catch (err) {
        setError('Failed to fetch questions',err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  if (!nameSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome to Trivia Quiz!</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (name.trim()) setNameSubmitted(true);
            }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}
          >
            <label htmlFor="username" style={{ fontSize: '1.15rem', fontWeight: 500 }}>What is your name?</label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: '10px 18px',
                fontSize: '1.08rem',
                borderRadius: '8px',
                border: '1px solid #ffc107',
                outline: 'none',
                width: '80%',
                marginBottom: '8px'
              }}
              autoFocus
              required
            />
            <button
              type="submit"
              className={styles.nextBtn}
              style={{ width: '60%' }}
            >Start Quiz</button>
          </form>
        </div>
      </div>
    );
  }
  if (loading) {
    return <div className={styles.title} style={{ textAlign: 'center', marginTop: '80px', fontSize: '1.5rem' }}>Loading questions...</div>;
  }
  if (error) {
    return <div className={styles.result} style={{ color: '#ff0844', textAlign: 'center', marginTop: '80px', fontSize: '1.2rem' }}>{error}</div>;
  }
  if (!triviaQuestions.length) {
    return <div className={styles.title} style={{ textAlign: 'center', marginTop: '80px', fontSize: '1.2rem' }}>No questions found.</div>;
  }

  const question = triviaQuestions[current];
  const answers = question ? shuffle([question.correct_answer, ...question.incorrect_answers]) : [];

  function handleSelect(ans) {
    setSelected(ans);
    setShowResult(true);
    if (ans === question.correct_answer) {
      setScore(prev => prev + 1);
    }
  }

  function handleNext() {
    setCurrent(prev => prev + 1);
    setSelected(null);
    setShowResult(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Trivia Quiz</h1>
        <div style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '12px' }}>Hello, <span style={{ color: '#ffc107', fontWeight: 700 }}>{name}</span>!</div>
        <div className={styles.score}>Score: {score}</div>
        <div className={styles.question}>{decodeHtml(question.question)}</div>
        <div className={styles.answers}>
          {answers.map((ans, idx) => {
            let btnClass = styles.answerBtn;
            if (showResult) {
              if (ans === question.correct_answer) btnClass += ' ' + styles.correct;
              else if (ans === selected) btnClass += ' ' + styles.incorrect;
              else btnClass += ' ' + styles.disabled;
            }
            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(ans)}
                className={btnClass}
              >
                {decodeHtml(ans)}
              </button>
            );
          })}
        </div>
        {showResult && (
          <div className={styles.result}>
            {selected === question.correct_answer
              ? <span className={styles.correct}>Correct!</span>
              : <span className={styles.incorrect}>Incorrect. Correct answer: <span className={styles.correctAnswer}>{decodeHtml(question.correct_answer)}</span></span>}
            <br />
            {current < triviaQuestions.length - 1 ? (
              <button
                onClick={handleNext}
                className={styles.nextBtn}
              >Next Question</button>
            ) : (
              <span className={styles.complete}>Quiz Complete! {name}, you got {score*100/10}% correct</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;