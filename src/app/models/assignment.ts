import { Question } from './question';

export interface Assignment {
  name: string;
  id: number;
  introText: string;
  questions: Question[];
}
