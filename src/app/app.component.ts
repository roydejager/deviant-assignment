import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deviant-assignment';

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getAssignment().subscribe((assignment) => console.log(assignment));
  }
}
