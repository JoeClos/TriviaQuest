import React, { useState, useEffect } from 'react';
import TriviaCard from '../components/TriviaCard';

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Home: React.FC<{ handleCatchError: (error: Error) => void }> = ({ handleCatchError }) => {
  const [trivia, setTrivia] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrivia = async () => {
      // setLoading(true);
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=100&difficulty=easy&type=multiple');
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
          setTrivia(data.results as TriviaQuestion[]);
        } else {
          throw new Error('No trivia questions available');
        }

        setTimeout(() => {
          setLoading(false); // Stop loading after 10 seconds
        }, 5000);

      } catch (error) {
        if (error instanceof Error) {
          handleCatchError(error);
        } else {
          handleCatchError(new Error('An unknown error occurred'));
        }
        setLoading(false); // Stop loading if an error occurs
      }
    };

    fetchTrivia();
  }, [handleCatchError]);

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = trivia[currentQuestionIndex];
    if (currentQuestion) {
      const correctAnswer = decodeHtml(currentQuestion.correct_answer);
      if (answer === correctAnswer) {
        setFeedback('Correct! 🎉');
      } else {
        setFeedback(`The correct answer is: ${correctAnswer}`);
      }
      setIsAnswered(true);
    }
  };

  const goToNextQuestion = () => {
    setIsAnswered(false);
    setFeedback(null);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const currentQuestion = trivia[currentQuestionIndex] || null;

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-center">
        {loading ? (
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>) : currentQuestion ? (
            <div>
              <TriviaCard
                question={decodeHtml(currentQuestion.question)} 
                options={[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].map(decodeHtml).sort()}
                onAnswer={handleAnswer}
                feedback={feedback}
                correctAnswer={decodeHtml(currentQuestion.correct_answer)}
                disabled={isAnswered}
              />
              {isAnswered && (
                <>
                  <button
                    className="mt-4 bg-midnight-100 text-silver px-4 py-2 rounded text-xs font-medium uppercase shadow-lg transition duration-150 ease-in-out hover:bg-bermuda hover:text-midnight-100 focus:outline-none active:bg-midnight-200"
                    onClick={goToNextQuestion}
                  >
                    Next Question
                  </button>
                </>
              )}
            </div>
          ) : (
          <p>No trivia available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
