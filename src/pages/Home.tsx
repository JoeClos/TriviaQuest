import React, { useState, useEffect } from 'react';
import TriviaCard from '../components/TriviaCard';
import CategoryDropdown from '../components/CategoryDropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { Category } from '../types/category';
import { fetchCategories, fetchTriviaQuestions } from '../api/triviaApi';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        handleCatchError(error as Error);
      }
    };

    getCategories();
  }, [handleCatchError]);

  // Fetch trivia based on selected category
  useEffect(() => {
    if (!selectedCategory) return;

    const getTriviaQuestions = async () => {
      setLoading(true);
      try {
        const questions = await fetchTriviaQuestions(selectedCategory);  // Using the API call
        setTrivia(questions);
        setLoading(false);
      } catch (error) {
        handleCatchError(error as Error);
        setLoading(false);
      }
    };

    getTriviaQuestions();
  }, [selectedCategory, handleCatchError]);

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
        setFeedback(`Wrong! The correct answer is: ${correctAnswer}`);
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
      <div className="container mx-auto p-4 flex flex-col items-center justify-center">
        {/* Category Dropdown */}
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Trivia Questions */}
        {loading ? (
          <LoadingSpinner />
        ) : trivia.length > 0 ? (
          <div>
            <TriviaCard
              question={decodeHtml(currentQuestion!.question)}
              options={[...currentQuestion!.incorrect_answers, currentQuestion!.correct_answer]
                .map(decodeHtml)
                .sort()}
              onAnswer={handleAnswer}
              feedback={feedback}
              correctAnswer={decodeHtml(currentQuestion!.correct_answer)}
              disabled={isAnswered}
            />
            {isAnswered && (
              <button
                className="mt-4 bg-midnight-100 text-silver px-4 py-2 rounded text-xs font-medium uppercase shadow-lg transition duration-150 ease-in-out hover:bg-bermuda hover:text-midnight-100 focus:outline-none active:bg-midnight-200"
                onClick={goToNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
