import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, BehaviorSubject, of} from 'rxjs';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { switchMap, take } from 'rxjs/operators';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  public assignment$;
  public progression$: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(
    private store: Store<{ assignment }>,
    public route: ActivatedRoute,
    private localstorage: LocalStorageService
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {
    this.route.parent.params.pipe(
      take(1)
    ).subscribe((params) => {
      const currentSubject = this.localstorage.getItem(params.subject);
      if (currentSubject) {
        const currentAssignment = currentSubject.find((assignment) => assignment.assignment === parseInt(params.assignmentId, 10));

        if (currentAssignment) {
          this.progression$.next(currentAssignment.answers.length);
        }
      }

    });

  }

}
