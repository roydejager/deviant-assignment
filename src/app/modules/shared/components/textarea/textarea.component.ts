import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() placeholder: string;
  @Input() value: string;

  @Output() valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onChange($event: string) {
    this.valueChanged.emit($event);
  }
}
