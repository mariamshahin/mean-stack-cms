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
  @Input() round = false;
  @Input() outline = false;
  @Input() light = false;
  @Input() disabled = false;
  @Output() submit = new EventEmitter<any>();

  colorClass: string;

  ngOnInit(): void {
    this.colorClass = this.outline
      ? `btn-outline-${this.color}`
      : `btn-${this.color}`;

    this.colorClass += this.round ? ' round' : '';

    this.colorClass += this.light ? ` bg-light-${this.color}` : '';
  }

  onClickButton(event): void {
    this.submit.emit(event);
  }
}
