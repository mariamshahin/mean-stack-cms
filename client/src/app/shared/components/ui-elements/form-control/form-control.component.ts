import { Component, Input, Self, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SharedState, selectSharedState } from 'app/shared/store';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() isFormSubmitted: boolean;
  @Input() errors: { errName: string; errMsg: string }[] = [];
  @Input() isRequired = true;
  @Input() disabled = false;

  serverValidation$ = this.store.pipe(
    select(selectSharedState),
    map((state) => state.alert.errors.map((error) => error.field))
  );

  formControl: AbstractControl;
  value: any = '';
  hasErrors: {} | null;
  isInvalid: boolean;
  errorMessage: string;
  showError = false;

  constructor(
    @Self()
    @Optional()
    public ngControl: NgControl,
    private store: Store<SharedState>
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event): void {}

  onTouched(): void {}
}
