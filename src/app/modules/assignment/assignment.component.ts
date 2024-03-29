import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';

import { AssignmentFetch } from '../../store/actions/assignment.actions';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit, OnDestroy {
  public assignment$: Observable<any>;
  public routerSubscription: Subscription;
  params;
  constructor(
    private store: Store<{ assignment }>,
    private route: ActivatedRoute,
  ) {
    this.assignment$ = this.store.select(state => state.assignment);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.params = params;
    });
    this.store.dispatch(new AssignmentFetch({ id: this.params.assignmentId }));
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
