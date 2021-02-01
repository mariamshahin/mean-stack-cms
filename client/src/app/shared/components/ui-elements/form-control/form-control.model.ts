import { Control } from 'app/shared/models/form.model';

export class FormControlModel implements Control {
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  errors?: { errName: string; errMsg: string }[];
  required?: boolean;
  disabled?: boolean;

  constructor(options: Control) {
    this.type = options.type || 'text';
    this.name = options.name;
    this.placeholder = options.placeholder;
    this.errors = options.errors;
    this.required = options.required || true;
    this.disabled = options.disabled || false;
  }
}
