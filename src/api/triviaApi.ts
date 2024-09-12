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
  export const fetchTriviaQuestions = async (categoryId: number, numberOfQuestions: number = 20) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results; // Return questions
      }
      return [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to fetch trivia questions');
    }
  };
  