import { LocalStorageService } from '../../../modules/shared/services/local-storage.service';
import { Injectable } from '@angular/core';

export interface StoredAnswer {
  questionId: number;
  userAnswer: string;
  submitted: boolean;
}

export interface StoredAssignment {
  assignmentId: number;
  answers: StoredAnswer[];
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentStorageService {

  constructor(
    private localstorage: LocalStorageService
  ) { }

  public setCurrentSubject(subject: string, assignments: StoredAssignment[]): void {
    this.localstorage.setItem(subject, assignments);
  }

  public getCurrentSubject(subject: string): StoredAssignment[] {
    return JSON.parse(localStorage.getItem(subject));
  }

  public removeCurrentSubject(subject: string) {
    this.localstorage.removeItem(subject);
  }

  public getCurrentAssignment(subject: string, id: number): StoredAssignment {
    const currentSubject = this.getCurrentSubject(subject);

    if (currentSubject) {
      return currentSubject.find((assignment: StoredAssignment) => assignment.assignmentId === id);
    }
  }

  public getCurrentAssignmentIndex(subject: string, assignmentId: number): number {
    const currentSubject = this.getCurrentSubject(subject);

    return currentSubject.findIndex((assignment: StoredAssignment) => assignment.assignmentId === assignmentId);
  }

  public getCurrentAnswerIndex(subject: string, assignmentId: number, questionId: number): number {
    return this.getCurrentAssignment(subject, assignmentId).answers.findIndex((answer: StoredAnswer) => answer.questionId === questionId);
  }

  public removeAssignment(subject: string, assignmentId: number): void {
    const currentSubject = this.getCurrentSubject(subject);

    const filteredAssignments = currentSubject.filter((assignment: StoredAssignment) => {
      return assignment.assignmentId !== assignmentId;
    });

    this.setCurrentSubject(subject, filteredAssignments);
  }
}
