import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMememoryDataService implements InMemoryDbService {
  createDb() {
    const assignment = {
      name: 'Opdracht 1',
      introText: 'Vragen over ons koningshuis',
      questions: [
        {
          questionId: 1,
          question: 'Wat is de politieke vorm van Nederland',
          questionType: 'multiple_choice',
          answers: [
            {
              answer: 'Parlementaire democratie met constitutionele monarchie',
              answerId: 102,
              isCorrect: true
            },
            {
              answer: 'Monarchie',
              answerId: 574,
              isCorrect: false
            },
            {
              answer: 'Hierarchie',
              answerId: 246,
              isCorrect: false
            }
          ],
          userAnswer: null
        },
        {
          questionId: 2,
          question: 'Wat kan jij vertellen over ons koningshuis?',
          questionType: 'open_question',
          userAnswer: null
        },
        {
          questionId: 3,
          question: 'Hoe nuttig vind jij de aanwezigheid van onze monarchie?',
          questionType: 'open_question',
          userAnswer: null
        },
        {
          questionId: 4,
          question: 'Wie is de huidige koning van Nederland?',
          questionType: 'multiple_choice',
          answers: [
            {
              answer: 'Koning Bernard II',
              answerId: 201,
              isCorrect: false
            },
            {
              answer: 'Vader Abraham',
              answerId: 202,
              isCorrect: true
            },
            {
              answer: 'Willem Alexander',
              answerId: 203,
              isCorrect: false
            }
          ],
          userAnswer: null
        },
        {
          questionId: 5,
          question: 'Wat zou jij veranderen als je Nederland zou besturen voor een dag?',
          questionType: 'open_question',
          userAnswer: null
        }
      ]
    };
    return {assignment};
  }
}
