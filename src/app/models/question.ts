import { Answer } from './answer';

export interface Question {
  questionId: number;
  question: string;
  questionType: 'multiple_choice' | 'open_question';
  answers?: Answer[];
  userAnswer: null | string;
}
