import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  public assignment$;

  constructor(
    private store: Store<{ assignment }>
  ) {
    this.assignment$ = this.store.select((state) => state.assignment)
  }

  ngOnInit() {
  }

}
