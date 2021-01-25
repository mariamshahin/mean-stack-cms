import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnInit, ControlValueAccessor {
  @Input() formGroup: FormGroup;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() isFormSubmitted: boolean;
  @Input() errors: { errName: string; errMsg: string }[] = [];
  @Input() isRequired: boolean = true;
  @Input() disabled: boolean = false;

  formControl: AbstractControl;
  value: any = '';
  hasErrors: {} | null;
  isInvalid: boolean;

  constructor(
    @Self()
    @Optional()
    public ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.formControl = this.formGroup.get(this.formControlName);
    this.hasErrors = this.formControl.errors;
    this.isInvalid = this.formControl.invalid;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(event) {}

  onTouched() {}
}
