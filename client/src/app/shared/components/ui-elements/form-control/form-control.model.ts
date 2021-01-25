import { FormGroup } from '@angular/forms';

export interface Control {
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  errors?: { errName: string; errMsg: string }[];
  required?: boolean;
  disabled?: boolean;
}

export class FormControlModel {
  options: Control;

  constructor(options: Control) {
    this.options = options;
    this.options.type = options.type || 'text';
    this.options.required = options.required || true;
    this.options.disabled = options.disabled || false;
  }
}


