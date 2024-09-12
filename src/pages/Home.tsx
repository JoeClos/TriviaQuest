import React, { useState, useEffect } from 'react';
import TriviaCard from '../components/TriviaCard';
import CategoryDropdown from '../components/CategoryDropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { Category } from '../types/category';
import { fetchCategories, fetchTriviaQuestions } from '../api/triviaApi';
import useSound from '../hooks/useSound';
import { IoVolumeMute } from "react-icons/io5";
import { VscUnmute } from 'react-icons/vsc'


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
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Load sounds
  const playCorrectSound = useSound('/sounds/correct.mp3', isMuted);
  const playIncorrectSound = useSound('/sounds/incorrect.mp3', isMuted);

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
    if (selectedCategory === null) return;

    const getTriviaQuestions = async () => {
      setLoading(true);
      try {
        const questions = await fetchTriviaQuestions(selectedCategory); // Using the API call
        if (questions.length <= 0) {
          setTrivia([]);
          setTotalQuestions(0);
          setAnsweredQuestions(0);
          setScore(0);
        } else {
          setTrivia(questions);
          setTotalQuestions(questions.length);
          setAnsweredQuestions(0); // Reset answered questions count
          setCurrentQuestionIndex(0); // Reset question index
          setScore(0);
        }
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
        playCorrectSound();
        setScore(prevScore => prevScore + 1);
      } else {
        setFeedback(`Wrong! The correct answer is: ${correctAnswer}`);
        playIncorrectSound();
      }
      setIsAnswered(true);
      setAnsweredQuestions(prevCount => prevCount + 1);
    }
  };

  const goToNextQuestion = () => {
    // Only move to the next question if there are more questions left
    if (currentQuestionIndex < totalQuestions - 1) {
      setIsAnswered(false);
      setFeedback(null);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const toggleMute = () => {
    setIsMuted(prevState => !prevState);  // Toggle the mute state
  };

  const currentQuestion = trivia[currentQuestionIndex] || null;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center gap-3">
      {/* Category Dropdown */}
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(categoryId) => {
          setSelectedCategory(categoryId);
          setTrivia([]); // Clear trivia data when category changes
          setTotalQuestions(0); // Reset total questions
          setAnsweredQuestions(0); // Reset answered questions
          setCurrentQuestionIndex(0); // Reset question index
          setIsAnswered(false); // Reset answer state
          setFeedback(null); // Clear feedback
          setScore(0);
        }}
      />

      {/* Score Display */}
      {selectedCategory && (
        <div className="bg-white p-4 rounded shadow-md flex flex-row items-center justify-center">
          <div className="mb-4">
            <p>Score: {score}/{totalQuestions}</p>
          </div>

          {/* Mute/Unmute Button */}
          <button
            className="mb-4 px-4 py-2 text-2xl"
            onClick={toggleMute}
          >
            {isMuted ? <IoVolumeMute /> : <VscUnmute />}
          </button>
        </div>
      )}

      {/* Trivia Questions */}
      {loading ? (
        <LoadingSpinner />
      ) : totalQuestions > 0 ? (
        <div>
          {/* Display the current trivia question card */}
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

          {/* Show feedback */}
          {/* {feedback && <p className="mt-4 text-lg font-bold">{feedback}</p>} */}

          {/* Show the "Next Question" button if more questions are left */}
          {isAnswered && currentQuestionIndex < totalQuestions - 1 && (
            <button
              className="mt-4 bg-midnight-100 text-silver px-4 py-2 rounded text-xs font-medium uppercase shadow-lg transition duration-150 ease-in-out hover:bg-bermuda hover:text-midnight-100 focus:outline-none active:bg-midnight-200"
              onClick={goToNextQuestion}
            >
              Next Question
            </button>
          )}

          {/* If it's the last question, show the feedback and message */}
          {answeredQuestions === totalQuestions && (
            <p className="uppercase font-bold mt-4">No more questions left in this category.</p>
          )}
        </div>
      ) : (
        <p className="uppercase font-bold">No questions available. Choose a category first.</p>
      )}
    </div>
  );
};

export default Home;
