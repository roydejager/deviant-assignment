import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AssignmentFetch } from 'src/app/store/actions/assignment.actions';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
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
