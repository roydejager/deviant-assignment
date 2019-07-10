import { Component, OnInit, Input } from '@angular/core';

interface Options {
  label: string;
  value: any;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.css']
})
export class RadioButtonsComponent implements OnInit {
  @Input() options: Options;

  constructor() { }

  ngOnInit() {
  }

}
