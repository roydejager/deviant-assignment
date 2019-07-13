import { LocalStorageService } from '../../../modules/shared/services/local-storage.service';
import { Injectable } from '@angular/core';

interface AssignmentStorage {
  assignmentId: number;
  answers: {
    questionId: number;
    userAnswer: string;
    submitted: boolean;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentStorageService {
  private currentAssignment;

  constructor(
    private localstore: LocalStorageService
  ) { }

  setCurrentSubject(subject: string, assignments: AssignmentStorage[]) {
    return this.localstore.setItem(subject, assignments);
  }

  getCurrentSubject(subject: string) {
    const currentAssignment = JSON.parse(localStorage.getItem(subject));
    this.currentAssignment = currentAssignment;

    return currentAssignment;
  }

  getCurrentAssignment(id: number) {
    return this.currentAssignment.find((assignment: AssignmentStorage) => assignment.assignmentId === id);
  }

  public getCurrentAssignmentAnswers(assignmentId: number) {
    console.log(this.getCurrentAssignment(assignmentId), assignmentId);
    return this.getCurrentAssignment(assignmentId).answers;
  }

  public getCurrentAssignmentIndex(assignmentId: number) {
    return this.currentAssignment.findIndex(assignment => assignment.assignmentId === assignmentId);
  }

  public getCurrentAnswerIndex(assignmentId: number, questionId: number) {
    return this.getCurrentAssignmentAnswers(assignmentId).findIndex((answer) => answer.questionId === questionId);
  }


}
