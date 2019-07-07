import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AssignmentFetch } from 'src/app/store/actions/assignment.actions';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {
  public assignment$: Observable<any>;
  public routerSubscription: Subscription;

  constructor(
    private store: Store<{ assignment }>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.assignment$ = this.store.select(state => state.assignment);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
    });
    this.routerSubscription = this.router.events.subscribe(event => {
      console.log(event)
    });
    this.store.dispatch(new AssignmentFetch());
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
