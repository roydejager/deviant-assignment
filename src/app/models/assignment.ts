import { Question } from './question';

export interface Assignment {
  name: string;
  introText: string;
  questions: Question[];
}
