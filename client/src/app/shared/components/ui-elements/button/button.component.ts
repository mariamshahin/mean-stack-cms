import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Color } from 'app/shared/models/style.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: Color | 'primary' = 'primary';
  @Input() round: boolean = false;
  @Input() outline: boolean = false;
  @Input() light: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  colorClass: string;

  ngOnInit() {
    this.colorClass = this.outline
      ? `btn-outline-${this.color}`
      : `btn-${this.color}`;

    this.colorClass += this.round ? ' round' : '';

    this.colorClass += this.light ? ` bg-light-${this.color}` : '';
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }
}
