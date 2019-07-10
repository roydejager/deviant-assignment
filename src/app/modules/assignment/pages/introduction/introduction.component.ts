import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, BehaviorSubject, of} from 'rxjs';


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
    public route: ActivatedRoute
  ) {
    this.assignment$ = this.store.select((state) => state.assignment);
  }

  ngOnInit() {

    const progression = localStorage.getItem('progression');

    if (progression) {
      this.progression$.next(parseInt(progression, 10));
    }
  }

  setLocalStorageItem() {
    localStorage.setItem('progression', '0');
  }

}
