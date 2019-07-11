import { Component, OnInit } from '@angular/core';
import { ApiService } from './modules/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deviant-assignment';

  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((f) => {

    });
  }
}
