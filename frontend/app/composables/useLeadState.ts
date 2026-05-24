export const useLeadState = () => {
  // Global state to track the service selected in the Quiz
  const quizSelectedService = useState<string | null>('quizSelectedService', () => null);

  return {
    quizSelectedService
  };
};
