// src/api/triviaApi.ts

// Fetch trivia categories
export const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      return data.trivia_categories;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  };
  
  // Fetch trivia questions based on the selected category
  export const fetchTriviaQuestions = async (category: number) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&category=${category}`);
      const data = await response.json();
      return data.results;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to fetch trivia questions');
    }
  };
  