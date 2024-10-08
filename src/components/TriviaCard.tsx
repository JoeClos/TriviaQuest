import React, { useState } from 'react';

interface TriviaCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  feedback: string | null;
  correctAnswer: string;
  disabled: boolean;
}

const TriviaCard: React.FC<TriviaCardProps> = ({
  question,
  options,
  onAnswer,
  feedback,
  correctAnswer,
  disabled,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    if (!disabled) {
      setSelectedOption(option);
      onAnswer(option);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 break-words text-balance">{question}</h2>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selectedOption;
          return (
            <button
              key={index}
              className={`px-4 py-2 rounded w-full ${disabled
                  ? isCorrect
                    ? 'bg-green-500 text-white' // Highlight correct answer
                    : isSelected
                      ? 'bg-red-500 text-white' // Highlight selected wrong answer
                      : 'bg-gray-400 text-gray-700' // Inactive options
                  : 'bg-midnight-300 text-white' // Default option style for active state
                }`}
              onClick={() => handleOptionClick(option)}
              disabled={disabled}
            >
              {option}
            </button>
          );
        })}
      </div>
      {feedback && (
        <p className={`mt-4 ${feedback.startsWith('Correct') ? 'text-green-500 font-bold' : 'text-purple font-bold'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default TriviaCard;
